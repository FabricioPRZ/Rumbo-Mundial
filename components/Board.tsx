"use client";
import { useEffect, useRef, useState } from "react";
import { Globe, Building } from "./TravelArt";
import { BOARD, cash } from "@/lib/game/board";
import type { Game, GameEvent } from "@/lib/game/types";
export function coordinates(id: number): [number, number] {
  if (id <= 10) return [0, id];
  if (id <= 20) return [id - 10, 10];
  if (id <= 30) return [10, 30 - id];
  return [40 - id, 0];
}
export default function Board({
  game,
  onSelect,
}: {
  game: Game;
  onSelect: (id: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [deckInfo, setDeckInfo] = useState<"email" | "sms" | null>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const fit = () => { if (scroll.current) setZoom(Math.min(1, (scroll.current.clientWidth - 4) / 760)); };
  useEffect(() => { if (window.innerWidth < 780 && scroll.current) setZoom(Math.min(1, (scroll.current.clientWidth - 4) / 760)); }, []);
  const [positions, setPositions] = useState<Record<string, number>>(() =>
    Object.fromEntries(game.players.map((p) => [p.id, p.position])),
  );
  const seen = useRef(game.eventSerial ?? 0);
  const queue = useRef<GameEvent[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latest = useRef(game.players);
  latest.current = game.players;
  useEffect(() => {
    const events = game.events ?? [];
    const moves = events.filter(
      (e) =>
        e.id > seen.current && e.type === "move" && e.player && e.path?.length,
    );
    const gap =
      events.length > 0 && seen.current > 0 && events[0].id > seen.current + 1;
    seen.current = game.eventSerial ?? 0;
    const snapshot = () =>
      Object.fromEntries(latest.current.map((p) => [p.id, p.position]));
    if (gap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = null;
      queue.current = [];
      setPositions(snapshot());
      return;
    }
    queue.current.push(...moves);
    if (timer.current) return;
    const play = () => {
      const move = queue.current.shift();
      if (!move?.player || !move.path) {
        timer.current = null;
        setPositions(snapshot());
        return;
      }
      const player = move.player,
        path = move.path;
      let step = 0;
      if (move.from !== undefined)
        setPositions((p) => ({ ...p, [player]: move.from! }));
      const advance = () => {
        const destination=path[step];
        setPositions((p) => ({ ...p, [player]: destination }));
        step++;
        timer.current = setTimeout(step < path.length ? advance : play, 110);
      };
      timer.current = setTimeout(advance, move.teleport ? 0 : 110);
    };
    play();
  }, [game.events, game.eventSerial, game.players]);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
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
                className={`square ${b.kind} ${game.players[game.turn]?.position === b.id ? "current-square" : ""}`}
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                  borderColor: owner?.color,
                  boxShadow: owner ? `inset 0 -4px ${owner.color}` : undefined,
                }}
                aria-label={`${b.name}${a?.owner ? `, de ${owner?.name}` : ""}${a?.mortgaged ? ", hipotecada" : ""}`}
              >
                <span
                  className="stripe"
                  style={{ background: b.color ?? "transparent" }}
                />
                <span className="square-icon">{b.flag ?? icons[b.kind]}</span>
                <strong>{b.name}</strong>
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
            <Globe className="board-globe" />
            <p className="eyebrow">TU PRÓXIMA GRAN AVENTURA</p>
            <h2>Rumbo<br />Mundial<span>✦</span></h2>
            <div className="deck-cards">
              <button onClick={() => setDeckInfo(deckInfo === "email" ? null : "email")} aria-pressed={deckInfo === "email"}>
                <span aria-hidden="true">✉</span><b>Correo</b><small>EL MUNDO TE ESCRIBE</small>
              </button>
              <button onClick={() => setDeckInfo(deckInfo === "sms" ? null : "sms")} aria-pressed={deckInfo === "sms"}>
                <span aria-hidden="true">☏</span><b>Mensaje</b><small>UN NUEVO DESTINO</small>
              </button>
            </div>
            <p className="deck-description">{deckInfo ? `El mazo de ${deckInfo === "email" ? "Correo" : "Mensaje"} se baraja en cada partida. La carta se revela al caer en su casilla y vuelve al fondo, salvo los permisos que conserves.` : "24 países. Una mesa. Mil historias."}</p>
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
