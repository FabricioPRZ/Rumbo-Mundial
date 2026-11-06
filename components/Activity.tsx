"use client";
import { useEffect, useRef, useState } from "react";
import type { Game, GameEvent } from "@/lib/game/types";
import Dice from "./Dice";
export default function Activity({ game }: { game: Game }) {
  const [queue, setQueue] = useState<GameEvent[]>([]);
  const seen = useRef(game.eventSerial ?? 0);
  useEffect(() => {
    const fresh = (game.events ?? []).filter(
      (e) =>
        e.id > seen.current && ["roll", "card", "purchase"].includes(e.type),
    );
    seen.current = game.eventSerial ?? 0;
    if (fresh.length) setQueue((q) => [...q, ...fresh].slice(-30));
  }, [game.events, game.eventSerial]);
  const event = queue[0];
  useEffect(() => {
    if (!event) return;
    const timer = setTimeout(
      () => setQueue((q) => q.slice(1)),
      event.type === "card" ? 6000 : 3500,
    );
    return () => clearTimeout(timer);
  }, [event]);
  const lastRoll = [...(game.events ?? [])]
    .reverse()
    .find((e) => e.type === "roll");
  return (
    <section className="activity" aria-label="Actividad de la mesa">
      <div className="shared-dice">
        <div>
          <strong>
            {lastRoll
              ? `Última tirada · ${game.players.find((p) => p.id === lastRoll.player)?.name}`
              : "Dados de la mesa"}
          </strong>
          <small>
            {lastRoll?.text ?? "La primera tirada está por llegar."}
          </small>
        </div>
        <Dice values={lastRoll?.dice ?? game.dice} rollId={lastRoll?.id ?? 0} />
      </div>
      {event && (
        <div
          key={event.id}
          className={`activity-card ${event.type}`}
          role="status"
        >
          <span className="eyebrow">
            {event.type === "card"
              ? event.deck === "email"
                ? "✉ E-MAIL"
                : "☏ SMS"
              : event.type === "purchase"
                ? "PROPIEDAD COMPRADA"
                : "TIRADA"}
          </span>
          <p>{event.text}</p>
          {event.dice && <Dice values={event.dice} rollId={event.id} />}
          <button onClick={() => setQueue((q) => q.slice(1))}>
            Entendido
            {queue.length > 1 ? ` · ${queue.length - 1} avisos pendientes` : ""}
          </button>
        </div>
      )}
    </section>
  );
}
