"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { cash } from "@/lib/game/board";
import { ranking } from "@/lib/game/rules";
import type { Game } from "@/lib/game/types";

const CONFETTI_COLORS = ["#f6c85b", "#eb8267", "#63cebd", "#83b8ff", "#d9a1ee"];

export default function Victory({ game, onClose, muted, onMute }: {
  game: Game;
  onClose: () => void;
  muted: boolean;
  onMute: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const results = ranking(game);
  const winners = game.players.filter((player) => game.winner.includes(player.id));
  useEffect(() => { dialog.current?.showModal(); }, []);
  return (
    <dialog ref={dialog} className="victory-celebration" onCancel={onClose} aria-labelledby="victory-title">
      <div className="victory-confetti" aria-hidden="true">
        {Array.from({ length: 42 }, (_, i) => <span key={i} style={{
          left: `${(i * 29) % 100}%`, background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animationDelay: `${(i % 9) * 0.11}s`, animationDuration: `${3.5 + (i % 5) * 0.3}s`,
          "--confetti-drift": `${((i * 37) % 150) - 75}px`,
          borderRadius: i % 3 ? "2px" : "50%",
        } as CSSProperties} />)}
      </div>
      <header className="victory-heading">
        <span className="victory-trophy" aria-hidden="true">🏆</span>
        <p className="eyebrow">{winners.length ? `EL MUNDO TIENE ${winners.length > 1 ? "CAMPEONES" : "CAMPEÓN"}` : "VIAJE COMPLETADO"}</p>
        <h1 id="victory-title">{winners.length ? winners.map((player) => player.name).join(" y ") : "Un viaje inolvidable"}</h1>
        <p>{winners.length > 1 ? "¡Victoria compartida!" : winners.length ? "¡La victoria es tuya!" : "La partida ha terminado."}</p>
      </header>
      <div className="victory-podium" aria-label="Podio de la partida">
        {[2, 1, 3].map((place) => {
          const occupants = results.filter((entry) => entry.place === place);
          return <div key={place} className={`podium-group podium-rank-${place}`}>
            {!!occupants.length && <>
              <div className="podium-travelers">
                {occupants.map(({ player }) => <div key={player.id}>
                  <span className="podium-avatar" style={{ background: player.color }} aria-hidden="true">✈</span>
                  <strong>{player.name}</strong>
                </div>)}
              </div>
              <div className="podium-step"><span aria-hidden="true">{place === 1 ? "🥇" : place === 2 ? "🥈" : "🥉"}</span><b>{place}º</b></div>
            </>}
          </div>;
        })}
      </div>
      <ol className="victory-results" aria-label="Clasificación final por patrimonio y eliminación">
        {results.map(({ player, place, score }) => <li key={player.id} className={game.winner.includes(player.id) ? "champion" : ""}>
          <b className="result-place">{place}º</b>
          <i className="player-dot" style={{ background: player.color }} aria-hidden="true" />
          <div><strong>{player.name}</strong><small>{player.bankrupt ? "Eliminado" : "Patrimonio neto"}</small></div>
          <span>{cash(score)}</span>
        </li>)}
      </ol>
      <footer className="victory-actions">
        <button onClick={onClose} autoFocus>Ver tablero</button>
        <Link href="/">Organizar revancha ↗</Link>
        <button onClick={onMute}>{muted ? "Activar audio" : "Silenciar todo"}</button>
      </footer>
    </dialog>
  );
}
