"use client";

import { useEffect, useId, useRef, useState } from "react";
import { EMPTY_VOICE, VoiceClient, type VoiceClientView } from "@/lib/voice/client";
import type { Player } from "@/lib/game/types";

export default function VoiceChat({ room, token, playerId, players, masterMuted, onEnableAudio }: {
  room: string; token: string; playerId: string; players: Player[];
  masterMuted: boolean; onEnableAudio: () => void;
}) {
  const client = useRef<VoiceClient | null>(null);
  const details = useRef<HTMLDetailsElement>(null);
  const [view, setView] = useState<VoiceClientView>(EMPTY_VOICE);
  const [micMuted, setMicMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const volumeId = useId();
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
  return (
    <details className="voice-controls" ref={details} onKeyDown={(event) => {
      if (event.key === "Escape" && details.current) {
        details.current.open = false;details.current.querySelector("summary")?.focus();
      }
    }}>
      <summary className={view.phase === "joined" && !silent ? "mic-live" : ""}>
        <span aria-hidden="true">🎙</span> {view.phase === "joining" ? "Conectando…" : view.phase === "joined" ? silent ? "Mic. silenciado" : "Mic. encendido" : "Chat de voz"}
      </summary>
      <section className="voice-popover" aria-label="Voz de la sala">
        <div className="row"><strong>Habla con tus amigos</strong><button aria-label="Cerrar controles de voz" onClick={() => { if (details.current) details.current.open = false; }}>×</button></div>
        {view.phase === "off" ? <>
          <p>Activa el micrófono para entrar a la conversación. No se graba el audio.</p>
          <button className="primary" onClick={join}>Activar micrófono y entrar</button>
        </> : view.phase === "joining" ? <>
          <p role="status">Esperando permiso del micrófono y conectando…</p>
          <button onClick={leave}>Cancelar</button>
        </> : <>
          <button className={silent ? "primary" : "voice-mute"} onClick={() => {
            const next = !silent;
            if (silent && masterMuted) onEnableAudio();
            setMicMuted(next);client.current?.setMuted(next);
          }}>{silent ? "Encender mi micrófono" : "Silenciar mi micrófono"}</button>
          <label htmlFor={volumeId}>Volumen de voces <output>{volume}%</output></label>
          <input id={volumeId} type="range" min="0" max="100" step="1" value={volume} onChange={(event) => {
            const next = Number(event.target.value);setVolume(next);
            try { localStorage.setItem("rumbo:voice-volume", String(next)); } catch { /* Preferencia de esta sesión. */ }
          }} />
          {masterMuted && <p>«Silenciar todo» está activo: no envías ni escuchas voz. <button onClick={onEnableAudio}>Activar sonido</button></p>}
          <ul className="voice-members" aria-label="Participantes en la conversación">
            {view.members.map((member) => {
              const player = players.find((p) => p.id === member.playerId);
              const own = member.playerId === playerId;
              const status = view.connections[member.playerId];
              return <li key={member.playerId}>
                <i className="player-dot" style={{ background: player?.color }} />
                <span>{player?.name ?? "Viajero"}{own ? " (tú)" : ""}</span>
                <small>{own ? silent ? "Silenciado" : "Micrófono activo" : status === "failed" ? "Sin conexión" : status === "connected" ? member.muted ? "Silenciado" : "En línea" : "Conectando…"}</small>
              </li>;
            })}
          </ul>
          {view.members.length < 2 && <p>Ya estás dentro. Esperando a que tus amigos activen el chat de voz.</p>}
          {view.playbackBlocked && <button className="primary" onClick={() => void client.current?.resumePlayback()}>Tocar para escuchar voces</button>}
          {failed && <p role="status">No se pudo conectar con algún viajero. Prueba otra red o reconecta. Algunas redes necesitan el respaldo TURN.</p>}
          <div className="voice-buttons"><button onClick={join}>Reconectar</button><button onClick={leave}>Salir de la voz</button></div>
        </>}
        {view.error && <p role="status" className="voice-error">{view.error}</p>}
        <small>Usa audífonos para evitar eco. La voz se desconecta al ocultar la pestaña y nunca activa el micrófono sola al refrescar.</small>
      </section>
    </details>
  );
}
