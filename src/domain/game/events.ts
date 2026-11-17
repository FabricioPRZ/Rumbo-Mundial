import type { Game, GameEvent } from "./types";

export function addLog(
  s: Game,
  text: string,
  event: Omit<GameEvent, "id" | "text"> = { type: "log" },
) {
  s.log = [...s.log, text].slice(-50);
  s.eventSerial = (s.eventSerial ?? 0) + 1;
  s.events = [...(s.events ?? []), { ...event, id: s.eventSerial, text }].slice(
    -100,
  );
}
