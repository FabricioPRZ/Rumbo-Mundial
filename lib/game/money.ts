import type { Player } from "./types";
export const DENOMINATIONS = [50000, 10000, 5000, 2000, 1000, 500, 100, 50, 10, 1] as const;
export type Bills = Record<string, number>;
export const INITIAL_BILLS: Bills = {
  50000: 2, 10000: 2, 5000: 2, 2000: 1, 1000: 2, 500: 1,
};
export const totalBills = (bills: Bills) =>
  Object.entries(bills).reduce(
    (sum, [value, count]) => sum + Number(value) * count,
    0,
  );
export function change(amount: number): Bills {
  const result: Bills = {};
  for (const value of DENOMINATIONS) {
    result[value] = Math.floor(amount / value);
    amount %= value;
  }
  return result;
}
export function wallet(player: Player): Bills {
  return player.bills && totalBills(player.bills) === player.money
    ? { ...player.bills }
    : change(player.money);
}
export function pay(player: Player, amount: number, selected?: Bills) {
  if (!Number.isSafeInteger(amount) || amount < 0 || player.money < amount)
    throw new Error("Saldo insuficiente.");
  const held = wallet(player);
  if (!selected) {
    player.money -= amount;
    player.bills = change(player.money);
    return;
  }
  for (const [value, count] of Object.entries(selected))
    if (
      !DENOMINATIONS.some((d) => String(d) === value) ||
      !Number.isSafeInteger(count) ||
      count < 0 ||
      count > (held[value] ?? 0)
    )
      throw new Error("Los billetes seleccionados no están disponibles.");
  const tender = totalBills(selected);
  if (tender < amount)
    throw new Error("Selecciona suficientes billetes para pagar.");
  for (const value of DENOMINATIONS)
    held[value] = (held[value] ?? 0) - (selected[value] ?? 0);
  for (const [value, count] of Object.entries(change(tender - amount)))
    held[value] = (held[value] ?? 0) + count;
  player.money -= amount;
  player.bills = held;
}
export function exchange(player: Player, value: number) {
  const index = DENOMINATIONS.indexOf(value as (typeof DENOMINATIONS)[number]);
  const held = wallet(player);
  if (index < 0 || index === DENOMINATIONS.length - 1 || !held[value])
    throw new Error("No puedes cambiar ese billete.");
  held[value]--;
  let rest = value;
  for (const smaller of DENOMINATIONS.slice(index + 1)) {
    const count = Math.floor(rest / smaller);
    held[smaller] = (held[smaller] ?? 0) + count;
    rest %= smaller;
  }
  player.bills = held;
}

export function credit(player: Player, amount: number) {
  if (!Number.isSafeInteger(amount) || amount < 0) throw new Error("Abono inválido.");
  const held = wallet(player);
  for (const [value, count] of Object.entries(change(amount))) held[value] = (held[value] ?? 0) + count;
  player.money += amount; player.bills = held;
}
