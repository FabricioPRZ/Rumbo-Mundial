import { AUCTION_INCREMENT, AUCTION_PRICE_RATIO, BOARD, HOTEL_SUPPLY, HOUSE_SUPPLY } from "./board";
import type { Game, Player } from "./types";
export function auctionMinimum(square: number, previousBid = 0, building = false): number {
  const initial = building ? BOARD[square].buildCost : Math.ceil(BOARD[square].price * AUCTION_PRICE_RATIO / AUCTION_INCREMENT) * AUCTION_INCREMENT;
  return Math.max(initial, previousBid + AUCTION_INCREMENT);
}
export const group = (id: number) =>
  BOARD.filter((b) => b.group && b.group === BOARD[id].group);
export const complete = (s: Game, id: number, owner: string) =>
  group(id).length > 0 &&
  group(id).every((b) => s.properties[b.id].owner === owner);
export function rent(s: Game, id: number, dice: number): number {
  const b = BOARD[id],
    p = s.properties[id];
  if (!p?.owner || p.mortgaged || s.players.some((x) => x.id === p.owner && x.jailed > 0 && x.detention === "prison")) return 0;
  if (b.kind === "country")
    return (
      b.rents[p.buildings] *
      (p.buildings === 0 && complete(s, id, p.owner) ? 2 : 1)
    );
  const count = BOARD.filter(
    (x) => x.kind === b.kind && s.properties[x.id]?.owner === p.owner,
  ).length;
  return b.kind === "utility" ? dice * b.rents[count - 1] : b.rents[count - 1];
}
export function assetError(
  s: Game,
  player: Player,
  id: number,
  type: string,
): string | null {
  const b = BOARD[id],
    p = s.properties[id];
  if (!b || !p || p.owner !== player.id)
    return "Esta propiedad no te pertenece.";
  if (player.bankrupt) return "Ya no participas en la partida.";
  if (s.auction) return "Termina la subasta primero.";
  if (s.opening) return "Primero se elige quién inicia.";
  if (player.jailed > 0 && player.detention === "prison" &&
      !(s.debt && (s.debt.payer ?? s.players[s.turn].id) === player.id && ["sell", "sell-group", "mortgage", "return"].includes(type)))
    return "En la cárcel no puedes administrar propiedades.";
  const peers = group(id),
    built = peers.some((x) => s.properties[x.id].buildings > 0);
  if (type === "build") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (
      !complete(s, id, player.id) ||
      peers.some((x) => s.properties[x.id].mortgaged)
    )
      return "Necesitas todo el grupo sin hipotecas.";
    if (p.buildings >= 5) return "Ya tiene un hotel.";
    if (peers.some((x) => s.properties[x.id].buildings < p.buildings))
      return "Construye primero en la propiedad con menos edificios.";
    const stock = bankStock(s);
    if (p.buildings < 4 && stock.houses <= 0) return "El Banco no tiene casas disponibles.";
    if (p.buildings === 4 && stock.hotels <= 0) return "El Banco no tiene hoteles disponibles.";
    if (player.money < b.buildCost) return "Saldo insuficiente.";
  } else if (type === "sell") {
    if (p.buildings === 5 && bankStock(s).houses < 4) return "El Banco necesita cuatro casas para deshacer este hotel.";
    if (!p.buildings) return "No hay edificios para vender.";
    if (peers.some((x) => s.properties[x.id].buildings > p.buildings))
      return "Vende primero en la propiedad con más edificios.";
  } else if (type === "sell-group") {
    if (!built) return "No hay edificios en este bloque.";
  } else if (type === "mortgage") {
    if (p.mortgaged) return "Ya está hipotecada.";
    if (built) return "Vende todos los edificios del grupo primero.";
  } else if (type === "redeem") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (!p.mortgaged) return "No está hipotecada.";
    if (player.money < redemptionCost(s, id))
      return "Saldo insuficiente.";
  } else if (type === "return" && built)
    return "Vende todos los edificios del grupo primero.";
  return null;
}
export const netWorth = (s: Game, p: Player) =>
  p.money +
  BOARD.reduce((n, b) => {
    const a = s.properties[b.id];
    return (
      n +
      (a?.owner === p.id
        ? b.price - (a.mortgaged ? b.mortgage : 0) + a.buildings * b.buildCost
        : 0)
    );
  }, 0);
export const liquidationValue = (s: Game, p: Player) =>
  p.money +
  BOARD.reduce((n, b) => {
    const a = s.properties[b.id];
    return (
      n +
      (a?.owner === p.id
        ? (a.mortgaged ? 0 : b.mortgage) + (a.buildings * b.buildCost) / 2
        : 0)
    );
  }, 0);

export function ranking(s: Game) {
  const score = (p: Player) =>
    netWorth(s, p) -
    ([...(s.debt ? [s.debt] : []), ...(s.debts ?? [])].filter((d) => (d.payer ?? s.players[s.turn].id) === p.id).reduce((sum, d) => sum + d.amount, 0));
  const ordered = [...s.players].sort((a, b) => {
    if (a.bankrupt !== b.bankrupt) return a.bankrupt ? 1 : -1;
    if (a.bankrupt)
      return (
        (s.eliminated ?? []).indexOf(b.id) -
          (s.eliminated ?? []).indexOf(a.id) ||
        (b.eliminatedAt ?? 0) - (a.eliminatedAt ?? 0)
      );
    return score(b) - score(a);
  });
  let previousRank = 0;
  return ordered.map((player, i) => {
    const before = ordered[i - 1];
    const tied =
      before &&
      !player.bankrupt &&
      !before.bankrupt &&
      score(player) === score(before);
    const place = tied ? previousRank : i + 1;
    previousRank = place;
    return { player, place, score: score(player) };
  });
}

export const bankStock = (s: Game) => ({
  houses: HOUSE_SUPPLY - Object.values(s.properties).reduce((n, p) => n + (p.buildings < 5 ? p.buildings : 0), 0),
  hotels: HOTEL_SUPPLY - Object.values(s.properties).filter((p) => p.buildings === 5).length,
});
export const redemptionCost = (s: Game, id: number) => BOARD[id].mortgage +
  (s.properties[id].inheritanceTurn !== undefined && s.properties[id].inheritanceTurn === (s.turnNumber ?? 0) ? 0 : Math.ceil(BOARD[id].mortgage / 10));

export function buildingBidders(s: Game, id: number): Record<string, number[]> {
  const hotels = s.properties[id]?.buildings === 4;
  const stock = bankStock(s);
  if ((hotels ? stock.hotels : stock.houses) !== 1) return {};
  const result: Record<string, number[]> = {};
  for (const p of s.players.filter((p) => !p.bankrupt)) {
    const options = BOARD.filter((b) => b.kind === "country" &&
      s.properties[b.id].owner === p.id &&
      (hotels ? s.properties[b.id].buildings === 4 : s.properties[b.id].buildings < 4) &&
      !assetError(s, p, b.id, "build")).map((b) => b.id);
    if (options.length) result[p.id] = options;
  }
  return result;
}
