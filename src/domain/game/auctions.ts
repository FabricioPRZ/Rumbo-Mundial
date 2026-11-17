import { BOARD } from "./board";
import { addLog } from "./events";
import { pay } from "./money";
import { auctionMinimum } from "./rules";
import type { Game, Player } from "./types";

export function openNextAuction(s: Game, now: number, rejectedBy?: Player) {
  if (s.auction || s.debt || s.status !== "playing") return;
  const square = (s.auctionQueue ?? []).shift();
  if (square === undefined) return;
  s.auction = { square, amount: 0, bidder: null, passed: [], endsAt: now + 30000 };
  addLog(s, `Subasta de ${BOARD[square].name}: primera oferta desde $${auctionMinimum(square)}. Participan quienes no la hayan rechazado.`);
  // Rechazar la compra también retira al visitante de esa subasta.
  if (rejectedBy?.position === square) {
    s.auction.passed.push(rejectedBy.id);
    const participants = s.players.filter((p) => !p.bankrupt && !(p.jailed && p.detention === "prison"));
    if (participants.every((p) => s.auction!.passed.includes(p.id))) closeAuction(s, now);
  }
}

export function closeAuction(s: Game, now: number) {
  const auction = s.auction; if (!auction) return;
  if (auction.bidder) {
    const buyer = s.players.find((p) => p.id === auction.bidder)!;
    pay(buyer, auction.amount);
    if (auction.buildingOptions) s.properties[auction.square].buildings++;
    else { s.properties[auction.square].owner = buyer.id; buyer.lastBought = auction.square; }
    addLog(s, `${buyer.name} ganó la subasta ${auction.buildingOptions ? "del edificio en" : "de"} ${BOARD[auction.square].name} por $${auction.amount}.`, { type: "purchase", player: buyer.id, square: auction.square });
  } else addLog(s, `Sin ofertas: ${BOARD[auction.square].name} permanece en el Banco.`);
  s.auction = null; openNextAuction(s, now);
}
