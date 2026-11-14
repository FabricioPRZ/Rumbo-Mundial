"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { audioPreferences, DEFAULT_AUDIO, GameAudio, type AudioPreferences, type SoundCue } from "./audio";
import type { Game, GameEvent } from "./game/types";

const STORAGE_KEY = "rumbo:audio";

export function useGameAudio(game: Game | null, playerId: string | null) {
  const [preferences, setPreferences] = useState(DEFAULT_AUDIO);
  const [error, setError] = useState("");
  const current = useRef(DEFAULT_AUDIO);
  const engine = useRef<GameAudio | null>(null);

  const unlock = useCallback(() => {
    if (current.current.muted || document.hidden) return;
    try {
      if (!engine.current) {
        engine.current = new GameAudio(new AudioContext());
        engine.current.configure(current.current);
      }
      void engine.current.unlock().then(() => setError("")).catch(() => {
        setError("Toca Activar audio para volver a intentarlo.");
      });
    } catch {
      setError("Este navegador no pudo iniciar el audio. La partida puede continuar.");
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const saved = stored ? audioPreferences(JSON.parse(stored)) : DEFAULT_AUDIO;
      current.current = saved;
      setPreferences(saved);
    } catch { /* El juego funciona aunque el navegador bloquee localStorage. */ }
    const visibility = () => {
      engine.current?.setVisible(!document.hidden);
      if (!document.hidden) unlock();
    };
    document.addEventListener("pointerdown", unlock);
    document.addEventListener("keydown", unlock);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("pointerdown", unlock);
      document.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", visibility);
      engine.current?.dispose();
      engine.current = null;
    };
  }, [unlock]);

  const change = useCallback((patch: Partial<AudioPreferences>) => {
    const next = audioPreferences({ ...current.current, ...patch });
    current.current = next;
    setPreferences(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* Preferencias de esta sesión. */ }
    engine.current?.configure(next);
    if (!next.muted) unlock();
  }, [unlock]);

  const play = useCallback((cue: SoundCue) => { engine.current?.play(cue); }, []);
  const playEvent = useCallback((event: GameEvent) => {
    if (["roll", "purchase", "payment", "card"].includes(event.type)) play(event.type as SoundCue);
    else if (event.teleport || /cárcel|deportado|construyó/i.test(event.text)) play("travel");
  }, [play]);

  const previous = useRef<{ room: string; turn: string; trades: string[]; finished: boolean } | null>(null);
  useEffect(() => {
    if (!game) return;
    const turn = `${game.turnNumber}:${game.players[game.turn]?.id}`;
    const trades = game.trades.filter((trade) => trade.to === playerId).map((trade) => trade.id);
    const finished = game.status === "finished";
    const before = previous.current;
    if (before?.room === game.id) {
      if (finished && !before.finished) play("victory");
      else if (trades.some((id) => !before.trades.includes(id))) play("trade");
      else if (turn !== before.turn && game.players[game.turn]?.id === playerId && !game.opening) play("turn");
    }
    previous.current = { room: game.id, turn, trades, finished };
  }, [game, playerId, play]);

  return { preferences, change, playEvent, error, unlock };
}
