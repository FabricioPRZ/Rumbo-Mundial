import { requireRule } from "./assertions";
import { openNextAuction } from "./auctions";
import { BOARD } from "./board";
import { CARDS } from "./cards";
import { addLog } from "./events";
import { credit } from "./money";
import { jail, move } from "./movement";
import { group, rent } from "./rules";
import { charge } from "./settlement";
import type { Game, Player } from "./types";

export function land(s: Game, p: Player, now: number) {
  const b = BOARD[p.position];
  addLog(s, `${p.name} llegó a ${b.name}.`, { type: "log", player: p.id, square: b.id });
  s.phase = "end";
  if (b.kind === "oceania") {
    jail(s, p, "oceania");
    return;
  }
  if (b.kind === "go-oceania") {
    jail(s, p);
    return;
  }
  if (b.kind === "rest") {
    return;
  }
  if (b.kind === "tax") {
    charge(s, p, b.tax ?? 0, null);
    return;
  }
  if (b.price) {
    const a = s.properties[b.id];
    if (!a.owner) s.phase = "buy";
    else if (a.owner !== p.id) {
      const owner = s.players.find((x) => x.id === a.owner)!;
      let amount = rent(s, b.id, s.dice[0] + s.dice[1]);
      if (amount && b.kind === "country" && !a.buildings && owner.rentBonus) {
        amount *= 2; owner.rentBonus = false;
      }
      charge(s, p, amount, a.owner);
    }
    return;
  }
  if (b.kind === "email" || b.kind === "sms") {
    const deck = s.decks[b.kind];
    const index = deck.shift();
    requireRule(index !== undefined, "Mazo vacío.");
    const c = CARDS[b.kind][index];
    s.lastCard = c.text;
    addLog(s, `${p.name} · ${b.name}: ${c.text}`, {
      type: "card",
      player: p.id,
      deck: b.kind,
    });
    if (c.kind === "acquisition") { p.acquisitionCard = true; return; }
    if (c.kind === "pass") {
      p.passes.push(b.kind);
      return;
    }
    deck.push(index);
    if (c.kind === "money") {
      if (c.amount >= 0) credit(p, c.amount);
      else charge(s, p, -c.amount, null);
    }
    if (c.kind === "jail") {
      if (c.fine) charge(s, p, c.fine, null);
      jail(s, p, c.detention ?? "prison", c.turns ?? 3);
    }
    if (c.kind === "bonus") p.rentBonus = true;
    if (c.kind === "collect") {
      s.choice = { player: p.id, kind: "collect", amount: c.amount };
      p.skipTurns = (p.skipTurns ?? 0) + (c.skip ?? 0);
      if (c.skip) s.extra = false;
    }
    if (c.kind === "everyone") {
      for (const other of s.players.filter((x) => !x.bankrupt)) {
        if (c.toPlayer === false) charge(s, other, c.amount, null);
        else if (other.id !== p.id) {
          if (c.amount < 0) charge(s, other, -c.amount, p.id);
          else charge(s, p, c.amount, other.id);
        }
      }
    }
    if (c.kind === "refund" || c.kind === "expropriate") {
      const owned = BOARD.filter((x) => s.properties[x.id]?.owner === p.id);
      const target = c.kind === "refund" ? owned.find((x) => x.id === p.lastBought)
        : owned.sort((a, b) => b.price - a.price || a.id - b.id)[0];
      if (target) {
        // Sell the entire block's buildings to preserve even development.
        for (const peer of group(target.id)) {
          const property = s.properties[peer.id];
          if (property.owner === p.id) {
            credit(p, property.buildings * peer.buildCost / 2); property.buildings = 0;
          }
        }
        const property = s.properties[target.id];
        credit(p, c.kind === "refund" ? (property.mortgaged ? 0 : target.price / 2) : target.rents[0]);
        property.owner = null; property.mortgaged = false;
        addLog(s, `${p.name} devuelve ${target.name} al Banco por una carta.`);
        if (c.kind === "expropriate") s.auctionQueue = [...(s.auctionQueue ?? []), target.id];
      }
    }
    if (c.kind === "airline") {
      const target = BOARD.filter((x) => x.kind === "airline" && !s.properties[x.id].owner)
        .sort((a,b) => (a.id - p.position + 40) % 40 - (b.id - p.position + 40) % 40)[0];
      if (target) {
        move(s, p, (target.id - p.position + 40) % 40);
        charge(s, p, target.price + 5000, null);
        const debt = (s.debts?.length ? s.debts[s.debts.length - 1] : s.debt)!;
        debt.reason = "purchase"; debt.square = target.id;
      }
    }
    if (c.kind === "repairs") {
      const amount = Object.values(s.properties)
        .filter((a) => a.owner === p.id)
        .reduce(
          (v, a) =>
            v + (a.buildings === 5 ? c.hotel : a.buildings * c.restaurant),
          0,
        );
      charge(s, p, amount, null);
    }
    if (c.kind === "move") {
      const steps = (c.target - p.position + BOARD.length) % BOARD.length;
      if (steps > 0) {
        move(s, p, steps);
        land(s, p, now);
      }
      if (c.fine) charge(s, p, c.fine, null);
      if (c.skip) { p.skipTurns = (p.skipTurns ?? 0) + c.skip; s.extra = false; }
    }
    openNextAuction(s, now);
  }
}
