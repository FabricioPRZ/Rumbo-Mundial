export default function Log({ events }: { events: string[] }) {
  return (
    <section className="panel">
      <h2>Bitácora de viaje</h2>
      <ol className="log" aria-live="polite">
        {events
          .slice()
          .reverse()
          .map((event, i) => (
            <li key={`${events.length - i}-${event}`}>{event}</li>
          ))}
      </ol>
    </section>
  );
}
