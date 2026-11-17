import type { GameEvent } from "@/domain/game/types";
export default function Log({
  events,
  history = [],
}: {
  events: string[];
  history?: GameEvent[];
}) {
  const entries = history.length
    ? history.map((e) => ({ id: String(e.id), text: e.text }))
    : events.map((text, i) => ({ id: `legacy-${i}`, text }));
  return (
    <section className="panel">
      <h2>Bitácora de viaje</h2>
      <ol className="log" aria-live="polite" aria-relevant="additions">
        {entries
          .slice(-50)
          .reverse()
          .map((event) => (
            <li className="log-entry" key={event.id}>
              {event.text}
            </li>
          ))}
      </ol>
    </section>
  );
}
