"use client";
import Button from "../atoms/Button";

import type { Player } from "@/domain/game/types";
import { useRef } from "react";
import PlayerMarker from "../atoms/PlayerMarker";
import { useVoiceChat } from "../hooks/useVoiceChat";
import VolumeControl from "../molecules/VolumeControl";

export default function VoiceChat({ room, token, playerId, players, masterMuted, onEnableAudio }: {
  room: string; token: string; playerId: string; players: Player[];
  masterMuted: boolean; onEnableAudio: () => void;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const { view, volume, silent, failed, join, leave, toggleMicrophone, changeVolume, resumePlayback } = useVoiceChat({ room, token, playerId, masterMuted, onEnableAudio });
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
        <div className="row"><strong>Habla con tus amigos</strong><Button aria-label="Cerrar controles de voz" onClick={() => { if (details.current) details.current.open = false; }}>×</Button></div>
        {view.phase === "off" ? <>
          <p>Activa el micrófono para entrar a la conversación. No se graba el audio.</p>
          <Button className="primary" onClick={join}>Activar micrófono y entrar</Button>
        </> : view.phase === "joining" ? <>
          <p role="status">Esperando permiso del micrófono y conectando…</p>
          <Button onClick={leave}>Cancelar</Button>
        </> : <>
          <Button className={silent ? "primary" : "voice-mute"} onClick={toggleMicrophone}>{silent ? "Encender mi micrófono" : "Silenciar mi micrófono"}</Button>
          <VolumeControl label="Volumen de voces" value={volume} onChange={changeVolume} />
          {masterMuted && <p>«Silenciar todo» está activo: no envías ni escuchas voz. <Button onClick={onEnableAudio}>Activar sonido</Button></p>}
          <ul className="voice-members" aria-label="Participantes en la conversación">
            {view.members.map((member) => {
              const player = players.find((p) => p.id === member.playerId);
              const own = member.playerId === playerId;
              const status = view.connections[member.playerId];
              return <li key={member.playerId}>
                <PlayerMarker color={player?.color} />
                <span>{player?.name ?? "Viajero"}{own ? " (tú)" : ""}</span>
                <small>{own ? silent ? "Silenciado" : "Micrófono activo" : status === "failed" ? "Sin conexión" : status === "connected" ? member.muted ? "Silenciado" : "En línea" : "Conectando…"}</small>
              </li>;
            })}
          </ul>
          {view.members.length < 2 && <p>Ya estás dentro. Esperando a que tus amigos activen el chat de voz.</p>}
          {view.playbackBlocked && <Button className="primary" onClick={resumePlayback}>Tocar para escuchar voces</Button>}
          {failed && <p role="status">No se pudo conectar con algún viajero. Prueba otra red o reconecta. Algunas redes necesitan el respaldo TURN.</p>}
          <div className="voice-buttons"><Button onClick={join}>Reconectar</Button><Button onClick={leave}>Salir de la voz</Button></div>
        </>}
        {view.error && <p role="status" className="voice-error">{view.error}</p>}
        <small>Usa audífonos para evitar eco. La voz se desconecta al ocultar la pestaña y nunca activa el micrófono sola al refrescar.</small>
      </section>
    </details>
  );
}
