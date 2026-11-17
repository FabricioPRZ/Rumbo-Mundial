import type { GameEvent } from "./types";

export const ROLL_LIMIT_MS = 20_000;
export const MOVE_STEP_MS = 160;
export const MOVE_SETTLE_MS = 220;
export function eventDuration(event: GameEvent): number {
  if (event.type === "move") return (event.teleport ? 0 : (event.path?.length ?? 0) * MOVE_STEP_MS) + MOVE_SETTLE_MS;
  return event.type === "roll" ? 2600 : event.type === "card" ? 6500 : 2400;
}
