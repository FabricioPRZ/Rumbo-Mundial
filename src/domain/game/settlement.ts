import { addLog } from "./events";
import type { Game, Player } from "./types";

export function winner(s: Game) {
  const alive = s.players.filter((p) => !p.bankrupt);
  if (alive.length <= 1 && !s.debt) {
    s.status = "finished";
    s.winner = alive.map((p) => p.id);
    s.trades = [];
    addLog(s, alive[0] ? `${alive[0].name} ganó la partida.` : "Todos los viajeros quedaron en quiebra.");
  }
}

export function charge(s: Game, p: Player, amount: number, creditor: string | null) {
  if (amount <= 0) return;
  const debt = { amount, creditor, payer: p.id };
  if (s.debt) s.debts = [...(s.debts ?? []), debt];
  else s.debt = debt;
  addLog(
    s,
    `${p.name} debe pagar $${amount} a ${s.players.find((x) => x.id === creditor)?.name ?? "el Banco"}.`,
    { type: "payment", player: p.id },
  );
}
