"use client";

import { useRef } from "react";
import type { useGameAudio } from "@/lib/useGameAudio";

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
        <div className="row"><strong>Música y sonidos</strong><button aria-label="Cerrar ajustes de audio" onClick={() => { if (details.current) details.current.open = false; }}>×</button></div>
        <button className="primary" aria-pressed={preferences.muted} onClick={() => change({ muted: !preferences.muted })}>
          {preferences.muted ? "Activar audio" : "Silenciar todo"}
        </button>
        <label htmlFor="music-volume">Música de fondo <output>{preferences.music}%</output></label>
        <input id="music-volume" type="range" min="0" max="100" step="1" value={preferences.music} onChange={(event) => change({ music: Number(event.target.value) })} />
        <label htmlFor="effects-volume">Efectos del juego <output>{preferences.effects}%</output></label>
        <input id="effects-volume" type="range" min="0" max="100" step="1" value={preferences.effects} onChange={(event) => change({ effects: Number(event.target.value) })} />
        <small>{preferences.muted ? "Música, efectos y chat de voz silenciados, incluido tu micrófono. Conservamos tus volúmenes." : "Se pausa al cambiar de pestaña. Tus ajustes se guardan en este navegador."}</small>
        {error && <p role="status">{error}<button onClick={audio.unlock}>Activar audio</button></p>}
      </div>
    </details>
  );
}
