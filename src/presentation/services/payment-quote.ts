import { BOARD } from "@/domain/game/board";
import { buildingBidders, redemptionCost } from "@/domain/game/rules";
import type { Action, Game } from "@/domain/game/types";

/** UI estimate only. The server validates and charges the submitted action again. */
export function paymentQuote(s: Game, playerId: string, action: Action): { amount: number; label: string } | null {
  const p = s.players.find((player) => player.id === playerId);
  if (!p) return null;
    let amount = 0,
      label = "";
    if (action.type === "buy") {
      amount = BOARD[p.position].price;
      label = `Comprar ${BOARD[p.position].name}`;
    }
    if (action.type === "settle" && s.debt) {
      amount = s.debt.amount;
      label = `Pago a ${s.players.find((x) => x.id === s.debt?.creditor)?.name ?? "el Banco"}`;
    }
    if (action.type === "bail") {
      amount = 5000;
      label = "Multa para salir de Deportado";
    }
    if (action.type === "build") {
      if (Object.keys(buildingBidders(s, action.square)).length > 1) return null;
      amount = BOARD[action.square].buildCost;
      label = `Construir en ${BOARD[action.square].name}`;
    }
    if (action.type === "redeem") {
      amount = redemptionCost(s, action.square);
      label = `Deshipotecar ${BOARD[action.square].name}`;
    }
    if (action.type === "acquire") {
      const b = BOARD[action.square]; amount = s.properties[b.id].owner ? b.rents[0] : b.price - 1000;
      label = `Completar bloque con ${b.name}`;
    }
  return amount > 0 ? { amount, label } : null;
}
