import { closeAuction } from "./auctions";
import { addLog } from "./events";
import { credit } from "./money";
import { ROLL_LIMIT_MS, eventDuration } from "./presentation";
import { netWorth } from "./rules";
import { nextTurn, waitTurn } from "./turns";
import type { Game, Player } from "./types";

export function finishByTime(state: Game, now: number): Game {
  if (state.status !== "playing") return state;
  if (state.endsAt && now >= state.endsAt) {
    const s = structuredClone(state), active = s.players.filter((p) => !p.bankrupt);
    const score = (p: Player) => netWorth(s, p) - [s.debt, ...(s.debts ?? [])]
      .reduce((sum, d) => sum + (d && (d.payer ?? s.players[s.turn].id) === p.id ? d.amount : 0), 0);
    const best = Math.max(...active.map(score));
    s.winner = active.filter((p) => score(p) === best).map((p) => p.id);
    s.status = "finished"; s.trades = []; s.auction = null; s.choice = null;
    addLog(s, "Terminó el tiempo. Se compara el patrimonio neto.");
    return s;
  }
  if (state.auction && now >= state.auction.endsAt) {
    const s = structuredClone(state); closeAuction(s, now); scheduleAutomatic(s, state, now); return s;
  }
  if (state.opening && now >= (state.rollDeadline ?? state.turnAt + ROLL_LIMIT_MS)) {
    const s = structuredClone(state);
    for (const id of s.opening!.candidates) {
      if (s.opening!.rolls[id] === undefined) {
        s.opening!.rolls[id] = 0;
        addLog(s, `${s.players.find((p) => p.id === id)?.name} no tiró a tiempo y pierde la elección de salida.`);
      }
    }
    resolveOpening(s, now);
    scheduleAutomatic(s, state, now);
    return s;
  }
  if (!state.opening && !state.auction && !state.debt && !state.choice && !state.detentionDecision) {
    if (state.phase === "end" && state.autoEndAt === undefined) {
      const s = structuredClone(state);
      s.autoEndAt = Math.max(now, s.presentationUntil ?? 0) + 1000;
      return s;
    }
    if (state.phase === "end" && state.autoEndAt !== undefined && now >= state.autoEndAt) {
      const s = structuredClone(state), p = s.players[s.turn];
      if (p.salary) {
        credit(p, p.salary);
        addLog(s, `${p.name} cobró automáticamente $${p.salary} de sueldo.`);
        p.salary = 0;
      }
      if (s.extra) {
        s.phase = "roll";s.extra = false;s.turnAt = now;s.rollDeadline = now + ROLL_LIMIT_MS;
        delete s.autoEndAt;
      } else nextTurn(s, now);
      scheduleAutomatic(s, state, now);
      return s;
    }
    if (state.phase === "roll" && now >= (state.rollDeadline ?? state.turnAt + ROLL_LIMIT_MS)) {
      const s = structuredClone(state), p = s.players[s.turn];
      addLog(s, `${p.name} agotó sus 20 segundos: se salta su turno.`);
      if (p.jailed || p.skipTurns) waitTurn(s, p);
      nextTurn(s, now);
      // La siguiente cuenta empieza cuando acaba el aviso del turno vencido.
      scheduleAutomatic(s, state, now);
      return s;
    }
  }
  return state;
}

export function presentationTime(next: Game, previous: Game) {
  return (next.events ?? []).filter((event) => event.id > (previous.eventSerial ?? 0))
    .reduce((total, event) => total + eventDuration(event), 0);
}

export function scheduleAutomatic(next: Game, previous: Game, now: number) {
  if (next.status !== "playing") return;
  const visualTime = presentationTime(next, previous);
  const readyAt = Math.max(now, previous.presentationUntil ?? 0) + visualTime;
  next.presentationUntil = readyAt;
  if (next.opening && (!previous.opening || next.opening.round !== previous.opening.round)) {
    next.rollDeadline = readyAt + ROLL_LIMIT_MS;
  } else if (!next.opening && next.phase === "roll" &&
    (previous.opening || previous.phase !== "roll" || next.turn !== previous.turn || !next.rollDeadline)) {
    next.rollDeadline = readyAt + ROLL_LIMIT_MS;
  } else if ((next.opening || next.phase === "roll") && visualTime) {
    next.rollDeadline = Math.max(next.rollDeadline ?? 0, readyAt + ROLL_LIMIT_MS);
  }
  if (next.phase === "end" && !next.opening && !next.auction && !next.debt && !next.choice && !next.detentionDecision) {
    next.autoEndAt = Math.max(next.autoEndAt ?? 0, readyAt);
  } else delete next.autoEndAt;
}

export function resolveOpening(s: Game, now: number) {
  const opening = s.opening;
  if (!opening || !opening.candidates.every((id) => opening.rolls[id] !== undefined)) return;
  const max = Math.max(...Object.values(opening.rolls));
  const tied = opening.candidates.filter((id) => opening.rolls[id] === max);
  if (tied.length === 1 || max === 0) {
    s.turn = s.players.findIndex((p) => p.id === tied[0]);
    s.opening = null;s.turnAt = now;
    addLog(s, `${s.players[s.turn].name} inicia el viaje.`);
  } else {
    s.opening = { candidates: tied, rolls: {}, round: opening.round + 1 };
    addLog(s, "Empate: vuelven a tirar los finalistas.");
  }
}
