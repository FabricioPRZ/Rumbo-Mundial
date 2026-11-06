import { BOARD } from "./board";
import type { Game, Player } from "./types";
export const group = (id: number) =>
  BOARD.filter((b) => b.group && b.group === BOARD[id].group);
export const complete = (s: Game, id: number, owner: string) =>
  group(id).length > 0 &&
  group(id).every((b) => s.properties[b.id].owner === owner);
export function rent(s: Game, id: number, dice: number): number {
  const b = BOARD[id],
    p = s.properties[id];
  if (!p?.owner || p.mortgaged) return 0;
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
    if (player.money < b.buildCost) return "Saldo insuficiente.";
  } else if (type === "sell") {
    if (!p.buildings) return "No hay edificios para vender.";
    if (peers.some((x) => s.properties[x.id].buildings > p.buildings))
      return "Vende primero en la propiedad con más edificios.";
  } else if (type === "mortgage") {
    if (p.mortgaged) return "Ya está hipotecada.";
    if (built) return "Vende todos los edificios del grupo primero.";
  } else if (type === "redeem") {
    if (s.debt) return "Primero liquida tu deuda.";
    if (!p.mortgaged) return "No está hipotecada.";
    if (player.money < Math.ceil(b.mortgage * 1.1))
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
