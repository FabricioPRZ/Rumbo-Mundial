"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Building, CountryArt } from "./TravelArt";
import { BOARD, cash } from "@/lib/game/board";
import type { Game } from "@/lib/game/types";
export function coordinates(id: number): [number, number] {
  if (id <= 10) return [0, id];
  if (id <= 20) return [id - 10, 10];
  if (id <= 30) return [10, 30 - id];
  return [40 - id, 0];
}
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
  const icons: Record<string, string> = {
    start: "⚑",
    oceania: "↩",
    rest: "🏝",
    "go-oceania": "▥",
    email: "✉",
    sms: "☏",
    tax: "$",
    airline: "✈",
    utility: "⚖",
  };
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
          {BOARD.map((b) => {
            const [x, y] = coordinates(b.id),
              a = game.properties[b.id],
              owner = game.players.find((p) => p.id === a?.owner);
            return (
              <button
                key={b.id}
                onClick={() => onSelect(b.id)}
                className={`square ${b.kind} ${(positions[game.players[game.turn]?.id] ?? game.players[game.turn]?.position) === b.id ? "current-square" : ""}`}
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                  borderColor: owner?.color,
                  boxShadow: owner ? `inset 0 -4px ${owner.color}` : undefined,
                }}
                aria-label={`${b.name}${b.group ? `, grupo ${b.group}` : ""}${a?.owner ? `, de ${owner?.name}` : ""}${a?.mortgaged ? ", hipotecada" : ""}`}
              >
                <span
                  className="stripe"
                  style={{ background: b.color ?? "transparent" }}
                />
                <span className="square-icon">{b.kind === "country" ? <CountryArt id={b.id} /> : icons[b.kind]}</span>
                <strong>{b.color && <span className="group-marker" style={{ background: b.color }} aria-hidden="true" />}{b.name}</strong>
                <small>
                  {b.price ? cash(b.price) : b.tax ? cash(b.tax) : ""}
                </small>
                {a?.buildings ? (
                  <span className="buildings">
                    {a.buildings === 5 ? <Building hotel /> : Array.from({ length: a.buildings }, (_, i) => <Building key={i} />)}
                  </span>
                ) : null}
                {a?.mortgaged && <span className="mortgage-badge">H</span>}
              </button>
            );
          })}
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
