import { BOARD } from "./board";
import { CARDS } from "./cards";
import { addLog } from "./events";
import { credit } from "./money";
import { winner } from "./settlement";
import type { Game, Player } from "./types";

export function eliminate(s: Game, p: Player, creditor: string | null) {
  const recipient = s.players.find((x) => x.id === creditor && !x.bankrupt);
  for (const [id, property] of Object.entries(s.properties))
    if (property.owner === p.id) { credit(p, property.buildings * BOARD[Number(id)].buildCost / 2); property.buildings = 0; }
  if (recipient) credit(recipient, p.money);
  p.money = 0;
  p.bankrupt = true;
  p.eliminatedAt = s.version;
  s.eliminated = [...(s.eliminated ?? []), p.id];
  s.trades = s.trades.filter((t) => t.from !== p.id && t.to !== p.id);
  if (s.choice?.player === p.id) s.choice = null;
  for (const [id, a] of Object.entries(s.properties))
    if (a.owner === p.id) {
      a.owner = recipient?.id ?? null;
      if (recipient && a.mortgaged) {
        a.inheritanceTurn = (s.turnNumber ?? 0) + (s.players[s.turn].id === p.id ? 1 : 0);
        s.debts = [...(s.debts ?? []), { payer: recipient.id, amount: BOARD[Number(id)].price * 0.1, creditor: null, reason: "inheritance" }];
      }
      if (!recipient) {
        s.auctionQueue = [...(s.auctionQueue ?? []), Number(id)];
        a.buildings = 0;
        a.mortgaged = false;
      }
    }
  for (const deck of p.passes)
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
  p.passes = [];
  s.debts = (s.debts ?? []).filter((d) => d.payer !== p.id).map((d) => ({ ...d, creditor: d.creditor === p.id ? null : d.creditor }));
  s.debt = s.debts.shift() ?? null;
  if (p.acquisitionCard) { s.decks.email.push(CARDS.email.findIndex((c) => c.kind === "acquisition")); p.acquisitionCard = false; }
  addLog(s, `${p.name} se declaró en quiebra.`);
  winner(s);
}
