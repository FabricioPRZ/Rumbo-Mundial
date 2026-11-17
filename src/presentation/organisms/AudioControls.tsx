"use client";
import Button from "../atoms/Button";

import type { useGameAudio } from "@/presentation/hooks/useGameAudio";
import { useRef } from "react";
import VolumeControl from "../molecules/VolumeControl";

export default function AudioControls({ audio }: { audio: ReturnType<typeof useGameAudio> }) {
  const details = useRef<HTMLDetailsElement>(null);
  const { preferences, change, error } = audio;
  return (
    <details className="audio-settings" ref={details} onKeyDown={(event) => {
      if (event.key === "Escape" && details.current) {
        details.current.open = false;
        details.current.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label="Configurar música, efectos y silencio">{preferences.muted ? "♪ Audio apagado" : "♫ Audio"}</summary>
      <div className="audio-popover">
        <div className="row"><strong>Música y sonidos</strong><Button aria-label="Cerrar ajustes de audio" onClick={() => { if (details.current) details.current.open = false; }}>×</Button></div>
        <Button className="primary" aria-pressed={preferences.muted} onClick={() => change({ muted: !preferences.muted })}>
          {preferences.muted ? "Activar audio" : "Silenciar todo"}
        </Button>
        <VolumeControl label="Música de fondo" value={preferences.music} onChange={(value) => change({ music: value })} />
        <VolumeControl label="Efectos del juego" value={preferences.effects} onChange={(value) => change({ effects: value })} />
        <small>{preferences.muted ? "Música, efectos y chat de voz silenciados, incluido tu micrófono. Conservamos tus volúmenes." : "Se pausa al cambiar de pestaña. Tus ajustes se guardan en este navegador."}</small>
        {error && <p role="status">{error}<Button onClick={audio.unlock}>Activar audio</Button></p>}
      </div>
    </details>
  );
}
