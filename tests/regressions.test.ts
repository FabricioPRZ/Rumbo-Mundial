import { describe, it, expect } from "vitest";
import { engine, newGame, newPlayer } from "../lib/game/engine";
import { CARDS } from "../lib/game/cards";
import { wallet, totalBills, pay, exchange } from "../lib/game/money";
import { ranking } from "../lib/game/rules";
import { shuffleDeck } from "../lib/game/shuffle";
import type { Context, Game, Action } from "../lib/game/types";
const ctx: Context = {
  now: 100,
  dice: [1, 2],
  shuffled: {
    email: CARDS.email.map((_, i) => i),
    sms: CARDS.sms.map((_, i) => i),
  },
};
function game() {
  const s = newGame("ABC234", newPlayer("a", "Ana", "red"), 0);
  s.players.push(newPlayer("b", "Luis", "blue"));
  return engine(s, { type: "start" }, "a", ctx);
}
const act = (
  s: Game,
  action: Action,
  id = s.players[s.turn].id,
  dice: [number, number] = [1, 2],
) => engine(s, action, id, { ...ctx, dice });
describe("Correcciones de la partida en línea", () => {
  it("una tirada alta avanza exactamente 12 casillas y no una vuelta", () => {
    const s = act(game(), { type: "roll" }, "a", [6, 6]);
    expect(s.players[0].position).toBe(12);
    expect(s.motion?.path).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(s.players[0].money).toBe(1500);
  });
  it("registra por separado la tirada y el movimiento ordenado por una carta", () => {
    const s = act(game(), { type: "roll" }, "a", [3, 4]);
    const moves = s.events?.filter((e) => e.type === "move");
    expect(moves?.[0].path).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(s.events?.some((e) => e.type === "card" && e.deck === "sms")).toBe(
      true,
    );
  });
  it("una tarjeta dirigida a la casilla actual no agrega 40 pasos", () => {
    const s = game();
    const original = CARDS.email[0];
    try {
      CARDS.email[0] = { kind: "move", target: 2, text: "Permanece aquí" };
      const next = act(s, { type: "roll" }, "a", [1, 1]);
      expect(next.motion?.path).toEqual([1, 2]);
      expect(next.players[0].money).toBe(1500);
    } finally {
      CARDS.email[0] = original;
    }
  });
  it("Groenlandia es visita al caer con dados", () => {
    const s = game();
    s.players[0].position = 7;
    const next = act(s, { type: "roll" });
    expect(next.players[0].position).toBe(10);
    expect(next.players[0].jailed).toBe(0);
  });
  it("la prisión no libera en el segundo turno ni al sacar dobles", () => {
    let s = game();
    s.players[0].position = 27;
    s = act(s, { type: "roll" });
    expect(s.players[0].jailed).toBe(3);
    for (let left = 2; left >= 0; left--) {
      s = act(s, { type: "end" });
      s.players[1].position = 37;
      s = act(s, { type: "roll" }, "b", [1, 2]);
      s = act(s, { type: "end" });
      s = act(s, { type: "roll" }, "a", [2, 2]);
      expect(s.players[0].jailed).toBe(left);
      expect(s.players[0].position).toBe(10);
      expect(s.phase).toBe("end");
    }
  });
  it("la multa permite salir solo de prisión y conserva el dinero de los billetes", () => {
    let s = game();
    s.players[0].jailed = 3;
    s.players[0].detention = "prison";
    s = act(s, { type: "bail", bills: { 100: 1 } });
    expect(s.players[0].money).toBe(1450);
    expect(totalBills(wallet(s.players[0]))).toBe(1450);
    expect(s.players[0].jailed).toBe(0);
    s.players[0].jailed = 3;
    s.players[0].detention = "oceania";
    expect(() => act(s, { type: "bail" })).toThrow();
  });
  it("tratos disponibles fuera del turno y sobreviven al cambio de turno", () => {
    let s = game();
    s.properties[1].owner = "b";
    s = act(
      s,
      {
        type: "trade",
        to: "a",
        give: [1],
        take: [],
        giveMoney: 0,
        takeMoney: 10,
      },
      "b",
    );
    const trade = s.trades[0].id;
    s.phase = "end";
    s = act(s, { type: "end" });
    expect(s.trades[0].id).toBe(trade);
    s = act(s, { type: "accept", trade }, "a");
    expect(s.properties[1].owner).toBe("a");
  });
  it("la renta espera el pago y no se puede finalizar sin pagar", () => {
    let s = game();
    s.properties[3].owner = "b";
    s = act(s, { type: "roll" });
    expect(s.players[0].money).toBe(1500);
    expect(s.debt?.amount).toBe(4);
    expect(() => act(s, { type: "end" })).toThrow();
    s = act(s, { type: "settle", bills: { 5: 1 } });
    expect(s.players[0].money).toBe(1496);
    expect(s.players[1].money).toBe(1504);
    expect(wallet(s.players[0])[1]).toBe(1);
    expect(() => act(s, { type: "settle" })).toThrow();
  });
  it("el Banco valida billetes, entrega cambio y rechaza cantidades inventadas", () => {
    const p = newPlayer("a", "Ana", "red");
    expect(totalBills(wallet(p))).toBe(1500);
    expect(() => pay(p, 20, { 500: 3 })).toThrow();
    expect(() => pay(p, 20, { 5: -1 })).toThrow();
    expect(() => pay(p, 20, { 3: 10 })).toThrow();
    pay(p, 60, { 100: 1 });
    expect(p.money).toBe(1440);
    expect(totalBills(wallet(p))).toBe(1440);
    const before = p.money;
    exchange(p, 500);
    expect(p.money).toBe(before);
    expect(totalBills(wallet(p))).toBe(before);
  });
  it("cada tirada tiene ID propio incluso cuando salen los mismos dados", () => {
    let s = act(game(), { type: "roll" }, "a", [3, 3]);
    s = act(s, { type: "decline" });
    s = act(s, { type: "end" });
    s = act(s, { type: "roll" }, "a", [3, 3]);
    const rolls = s.events?.filter((e) => e.type === "roll") ?? [];
    expect(rolls).toHaveLength(2);
    expect(rolls[0].id).not.toBe(rolls[1].id);
    expect(rolls[0].dice).toEqual(rolls[1].dice);
  });
  it("publica compras con propietario y casilla", () => {
    let s = act(game(), { type: "roll" });
    s = act(s, { type: "buy", bills: { 100: 1 } });
    expect(s.events?.find((e) => e.type === "purchase")).toMatchObject({
      player: "a",
      square: 3,
    });
  });
  it("el ranking ordena por patrimonio y luego por orden inverso de eliminación", () => {
    const s = game();
    s.players.push(
      newPlayer("c", "Sol", "green"),
      newPlayer("d", "Paz", "pink"),
    );
    s.players[0].money = 50;
    s.players[1].money = 100;
    s.players[2].bankrupt = true;
    s.players[3].bankrupt = true;
    s.eliminated = ["c", "d"];
    expect(ranking(s).map((r) => r.player.id)).toEqual(["b", "a", "d", "c"]);
    s.players[0].money = 100;
    expect(
      ranking(s)
        .slice(0, 2)
        .map((r) => r.place),
    ).toEqual([1, 1]);
  });
  it("baraja ambos mazos sin perder cartas y usa la entropía recibida", () => {
    const a = shuffleDeck(16, () => 0),
      b = shuffleDeck(16, (max) => max - 1);
    expect(a).not.toEqual(b);
    expect([...a].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 16 }, (_, i) => i),
    );
    let s = game();
    s.status = "lobby";
    s = engine(s, { type: "start" }, "a", {
      ...ctx,
      shuffled: { email: a, sms: b },
    });
    expect(s.decks.email).toEqual(a);
    expect(s.decks.sms).toEqual(b);
  });
});
