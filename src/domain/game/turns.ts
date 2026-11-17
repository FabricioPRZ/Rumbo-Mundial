import { addLog } from "./events";
import { ROLL_LIMIT_MS } from "./presentation";
import type { Game, Player } from "./types";

export function nextTurn(s: Game, now: number) {
  s.detentionDecision = null;
  delete s.autoEndAt;
  s.rollDeadline = now + ROLL_LIMIT_MS;
  s.players[s.turn].salary = 0;
  s.turnNumber = (s.turnNumber ?? 0) + 1;
  s.debt = null;
  s.doubles = 0;
  s.extra = false;
  s.phase = "roll";
  s.turnAt = now;
  for (let i = 0; i < s.players.length; i++) {
    s.turn = (s.turn + 1) % s.players.length;
    if (!s.players[s.turn].bankrupt) break;
  }
}

export function release(s: Game, p: Player) {
  if (s.detentionDecision === p.id) s.detentionDecision = null;
  if (p.detention === "oceania") {
    const from = p.position; p.position = 0;
    addLog(s, `${p.name} regresa a Salida sin cobrar sueldo.`, { type: "move", player: p.id, from, path: [0], teleport: true });
  }
  p.jailed = 0; delete p.detention;
}

export function waitTurn(s: Game, p: Player) {
  if (p.jailed) {
    p.jailed--; addLog(s, `${p.name} cumple un turno de castigo; quedan ${p.jailed}.`);
    if (!p.jailed) release(s, p);
  } else { p.skipTurns = Math.max(0, (p.skipTurns ?? 0) - 1); addLog(s, `${p.name} descansa; quedan ${p.skipTurns} turnos.`); }
  s.phase = "end"; s.extra = false; s.doubles = 0;
}

export function advanceAfterElimination(s: Game, now: number) {
  const debt = s.debt; nextTurn(s, now); s.debt = debt;
}

export function waitingPlayer(s: Game): string {
  return s.debt?.payer ?? s.choice?.player ?? s.opening?.candidates.find((id) => s.opening?.rolls[id] === undefined) ?? s.players[s.turn].id;
}
