"use client";
import { BOARD } from "@/domain/game/board";
import type { Game } from "@/domain/game/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import BoardSquare from "../molecules/BoardSquare";
import { coordinates } from "../services/board-geometry";
export default function Board({
  game,
  onSelect,
  positions,
}: {
  game: Game;
  positions: Record<string, number>;
  onSelect: (id: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [deckInfo, setDeckInfo] = useState<"email" | "sms" | null>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const fit = () => {
    const container = scroll.current;
    if (!container) return;
    const available = Math.min(container.clientWidth - 8, container.clientHeight - 8);
    if (available > 0) setZoom(available / 760);
  };
  useEffect(() => {
    const container = scroll.current;
    if (!container) return;
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    fit();
    return () => observer.disconnect();
  }, []);
  return (
    <section className="board-section">
      <label className="board-zoom">
        Escala del tablero
        <input
          aria-label="Escala del tablero"
          type="range"
          min="0.35"
          max="1.25"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <span>{Math.round(zoom * 100)}%</span>
      </label>
      <button className="fit-board" onClick={fit}>Ver tablero completo</button>
      <div className="board-scroll" ref={scroll}>
        <div
          className="board"
          style={{ zoom }}
          aria-label="Tablero de 40 casillas"
        >
          {BOARD.map((square) => <BoardSquare key={square.id} square={square} property={game.properties[square.id]} owner={game.players.find((player) => player.id === game.properties[square.id]?.owner)} active={(positions[game.players[game.turn]?.id] ?? game.players[game.turn]?.position) === square.id} onSelect={onSelect} />)}
          <div className="board-center">
            <Image className="world-board-art" src="/art/world-center.webp" alt="Mapa ilustrado de los continentes con monumentos y rutas de viaje" fill sizes="(max-width: 780px) 90vw, 650px" priority />
            <div className="continent-labels" aria-label="Regiones del mundo">
              <span className="region-north">Norteamérica</span><span className="region-central">Centroamérica</span><span className="region-south">Sudamérica</span><span className="region-europe">Europa</span><span className="region-africa">África</span><span className="region-asia">Asia</span><span className="region-oceania">Oceanía</span>
            </div>
            <h2 className="world-board-title">Rumbo Mundial ✦</h2>
            <div className="deck-cards">
              <button onClick={() => setDeckInfo(deckInfo === "email" ? null : "email")} aria-pressed={deckInfo === "email"}>
                <span aria-hidden="true">✉</span><b>Correo</b><small>EL MUNDO TE ESCRIBE</small>
              </button>
              <button onClick={() => setDeckInfo(deckInfo === "sms" ? null : "sms")} aria-pressed={deckInfo === "sms"}>
                <span aria-hidden="true">☏</span><b>Mensaje</b><small>UN NUEVO DESTINO</small>
              </button>
            </div>
            <p className="deck-description">{deckInfo ? `El mazo de ${deckInfo === "email" ? "Correo" : "Mensaje"} se baraja en cada partida. La carta se revela al caer en su casilla y vuelve al fondo, salvo los permisos que conserves.` : ""}</p>
            <small>SALIDA ↓ MARRUECOS · SUELDO $20,000</small>
          </div>
          {game.players
            .filter((p) => !p.bankrupt)
            .map((p, i) => {
              const pos = positions[p.id] ?? p.position;
              const [x, y] = coordinates(pos);
              return (
                <span
                  key={p.id}
                  className="token"
                  title={p.name}
                  aria-label={`${p.name} en ${BOARD[pos].name}`}
                  style={{
                    transform: `translate(${((x + 0.18 + (i % 3) * 0.27) * 10000) / (11 * 2.35)}%, ${((y + 0.57 + Math.floor(i / 3) * 0.2) * 10000) / (11 * 2.35)}%)`,
                    background: p.color,
                  }}
                >
                  ✈
                </span>
              );
            })}
        </div>
      </div>
    </section>
  );
}
