"use client";
import type { Action, Game } from "@/domain/game/types";
import { RoomApiError, roomApi } from "@/infrastructure/browser/room-api";
import { roomStorage } from "@/infrastructure/browser/room-storage";
import { useCallback, useEffect, useRef, useState } from "react";

/** Synchronization owns transport state; game rules remain authoritative on the server. */
export function useRoomSession(id: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [connectionError, setConnectionError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [missing, setMissing] = useState(false);
  const [inactive, setInactive] = useState(0);
  const [now, setNow] = useState(Date.now());
  const state = useRef<Game | null>(null),
    heartbeat = useRef(0),
    inFlight = useRef(false),
    actionFlight = useRef(false);
  const apply = useCallback((next: Game) => {
    if (!state.current || next.version >= state.current.version) {
      state.current = next;
      setGame(next);
    }
  }, []);
  useEffect(() => {
    setToken(roomStorage.read(id));
    setLoaded(true);
  }, [id]);
  const refresh = useCallback(async () => {
    if (document.hidden || inFlight.current || !loaded) return;
    inFlight.current = true;
    try {
      const pulse = Date.now() - heartbeat.current > 20000;
      const data = await roomApi.get(id, state.current?.version ?? 0, token, pulse);
      if (pulse) heartbeat.current = Date.now();
      if (data.game) apply(data.game);
      setPlayerId(data.playerId);
      setInactive(data.inactiveFor ?? 0);
      setConnectionError("");
    } catch (e) {
      if (e instanceof RoomApiError && e.status === 404) setMissing(true);
      setConnectionError(e instanceof Error ? e.message : "Reconectando…");
    } finally {
      inFlight.current = false;
    }
  }, [id, token, loaded, apply]);
  useEffect(() => {
    if (!loaded) return;
    void refresh();
    const timer = setInterval(() => {
      setNow(Date.now());
      void refresh();
    }, 1000);
    const visible = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [loaded, refresh]);
  const commit = async (action: Action): Promise<boolean> => {
    if (!token || !state.current || actionFlight.current) return false;
    actionFlight.current = true;
    setBusy(true);
    setError("");
    try {
      const data = await roomApi.act(id, { token, action, version: state.current.version, requestId: crypto.randomUUID() });
      apply(data.game);
      return true;
    } catch (e) {
      void refresh();
      setError(
        e instanceof Error ? e.message : "No se pudo enviar. Reconectando…",
      );
      return false;
    } finally {
      setBusy(false);
      actionFlight.current = false;
    }
  };
  return { game, token, playerId, error, connectionError, busy, missing, inactive, now, commit };
}
