"use client";
import { EMPTY_VOICE, VoiceClient, type VoiceClientView } from "@/infrastructure/browser/voice-client";
import { useEffect, useRef, useState } from "react";
export function useVoiceChat({ room, token, playerId, masterMuted, onEnableAudio }: {
  room: string; token: string; playerId: string; masterMuted: boolean; onEnableAudio: () => void;
}) {
  const client = useRef<VoiceClient | null>(null);
  const [view, setView] = useState<VoiceClientView>(EMPTY_VOICE);
  const [micMuted, setMicMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rumbo:voice-volume");
      const saved = stored === null ? 80 : Number(stored);
      if (Number.isFinite(saved)) setVolume(Math.max(0, Math.min(100, saved)));
    } catch { /* El volumen sigue disponible sin almacenamiento local. */ }
  }, []);
  useEffect(() => {
    const leave = () => {
      if (!client.current) return;
      client.current.dispose();client.current = null;
      setView({ ...EMPTY_VOICE, error: "Voz desconectada al salir de esta pestaña. Puedes volver a activarla." });
    };
    const visibility = () => { if (document.hidden) leave(); };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("pagehide", leave);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pagehide", leave);
      client.current?.dispose();client.current = null;
    };
  }, [room, token, playerId]);
  useEffect(() => { client.current?.setMasterMuted(masterMuted); }, [masterMuted]);
  useEffect(() => { client.current?.setVolume(volume / 100); }, [volume]);

  const join = () => {
    client.current?.dispose();
    onEnableAudio();setMicMuted(false);
    const connection = new VoiceClient(room, token, playerId, setView, volume / 100);
    client.current = connection;
    void connection.join();
  };
  const leave = () => {
    client.current?.dispose();client.current = null;
    setView(EMPTY_VOICE);setMicMuted(false);
  };
  const silent = micMuted || masterMuted;
  const failed = Object.values(view.connections).some((status) => status === "failed");
  const toggleMicrophone = () => {
    const next = !silent;
    if (silent && masterMuted) onEnableAudio();
    setMicMuted(next); client.current?.setMuted(next);
  };
  const changeVolume = (next: number) => {
    setVolume(next);
    try { localStorage.setItem("rumbo:voice-volume", String(next)); } catch { /* Session preference when storage is unavailable. */ }
  };
  return { view, volume, silent, failed, join, leave, toggleMicrophone, changeVolume, resumePlayback: () => void client.current?.resumePlayback() };
}
