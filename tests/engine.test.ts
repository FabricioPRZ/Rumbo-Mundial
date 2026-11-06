import { describe, expect, it } from "vitest";
import { engine, finishByTime, newGame, newPlayer } from "../lib/game/engine";
import { BOARD } from "../lib/game/board";
import { CARDS } from "../lib/game/cards";
import { assetError, rent } from "../lib/game/rules";
import type { Action, Context, Game } from "../lib/game/types";
const ctx: Context = {
  now: 1000,
  dice: [1, 2],
  shuffled: {
    email: CARDS.email.map((_, i) => i),
    sms: CARDS.sms.map((_, i) => i),
  },
};
function game() {
  const s = newGame("ABC234", newPlayer("a", "Ana", "#a00"), 0);
  s.players.push(newPlayer("b", "Luis", "#00a"));
  return engine(s, { type: "start" }, "a", ctx);
}
const go = (s: Game, a: Action, dice: [number, number] = [1, 2], who = "a") =>
  engine(s, a, who, { ...ctx, dice });
describe("Tablero y motor", () => {
  it("tiene 40 casillas y mazos de 16 cartas", () => {
    expect(BOARD).toHaveLength(40);
    expect(CARDS.email).toHaveLength(16);
    expect(CARDS.sms).toHaveLength(16);
  });
  it("cobra al pasar y al caer en México sin mutar el estado", () => {
    const s = game();
    s.players[0].position = 38;
    const a = go(s, { type: "roll" }, [1, 2]);
    expect(a.players[0].money).toBe(1700);
    expect(a.players[0].position).toBe(1);
    expect(s.players[0].position).toBe(38);
    expect(go(s, { type: "roll" }, [1, 1]).players[0].money).toBe(1700);
  });
  it("dobla renta de grupo completo y respeta hipoteca", () => {
    const s = game();
    s.properties[1].owner = "a";
    s.properties[3].owner = "a";
    expect(rent(s, 1, 7)).toBe(4);
    s.properties[1].mortgaged = true;
    expect(rent(s, 1, 7)).toBe(0);
  });
  it("construye parejo hasta hotel y vende en orden inverso", () => {
    let s = game();
    s.players[0].money = 10000;
    for (const id of [6, 8, 9]) s.properties[id].owner = "a";
    s = go(s, { type: "build", square: 6 });
    expect(() => go(s, { type: "build", square: 6 })).toThrow(
      /menos edificios/,
    );
    for (const id of [8, 9]) s = go(s, { type: "build", square: id });
    for (let level = 2; level <= 5; level++)
      for (const id of [6, 8, 9]) s = go(s, { type: "build", square: id });
    expect(s.properties[6].buildings).toBe(5);
    expect(s.players[0].money).toBe(9250);
    s = go(s, { type: "sell", square: 6 });
    expect(s.properties[6].buildings).toBe(4);
    expect(s.players[0].money).toBe(9275);
    expect(() => go(s, { type: "sell", square: 6 })).toThrow(/más edificios/);
  });
  it("impide construir con hipotecas o grupo incompleto", () => {
    const s = game();
    s.properties[1].owner = "a";
    expect(assetError(s, s.players[0], 1, "build")).toMatch(/grupo/);
    s.properties[3].owner = "a";
    s.properties[3].mortgaged = true;
    expect(() => go(s, { type: "build", square: 1 })).toThrow(/hipotecas/);
  });
  it("hipoteca y libera con 10% de interés", () => {
    let s = game();
    s.properties[1].owner = "a";
    s = go(s, { type: "mortgage", square: 1 });
    expect(s.players[0].money).toBe(1530);
    s = go(s, { type: "redeem", square: 1 });
    expect(s.players[0].money).toBe(1497);
    expect(s.properties[1].mortgaged).toBe(false);
  });
  it("no hipoteca un grupo con edificios ni paga dos veces al devolver", () => {
    let s = game();
    s.properties[1].owner = "a";
    s.properties[3].owner = "a";
    s.properties[3].buildings = 1;
    expect(() => go(s, { type: "mortgage", square: 1 })).toThrow(/edificios/);
    s.properties[3].buildings = 0;
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "return", square: 1 });
    expect(s.players[0].money).toBe(1530);
    expect(s.properties[1].owner).toBeNull();
  });
  it("Oceanía al caer: pierde tres turnos y dobles permiten salir", () => {
    let s = game();
    s.players[0].position = 7;
    s = go(s, { type: "roll" });
    expect(s.players[0].jailed).toBe(3);
    for (let i = 2; i >= 0; i--) {
      s.phase = "roll";
      s = go(s, { type: "roll" });
      expect(s.players[0].jailed).toBe(i);
      expect(s.players[0].position).toBe(10);
    }
    s.phase = "roll";
    s = go(s, { type: "roll" }, [1, 2]);
    expect(s.players[0].position).toBe(13);
    s.players[0].jailed = 3;
    s.players[0].position = 10;
    s.phase = "roll";
    s = go(s, { type: "roll" }, [2, 2]);
    expect(s.players[0].jailed).toBe(0);
    expect(s.players[0].position).toBe(14);
    expect(s.extra).toBe(false);
  });
  it("tercer doble manda a Oceanía sin cobrar salida", () => {
    let s = game();
    s.doubles = 2;
    s.players[0].position = 39;
    s = go(s, { type: "roll" }, [2, 2]);
    expect(s.players[0].position).toBe(10);
    expect(s.players[0].money).toBe(1500);
    expect(s.extra).toBe(false);
  });
  it("permite turno extra solamente tras dobles", () => {
    let s = game();
    s = go(s, { type: "roll" }, [3, 3]);
    s = go(s, { type: "decline" });
    s = go(s, { type: "end" });
    expect(s.turn).toBe(0);
    expect(s.phase).toBe("roll");
    s = go(s, { type: "roll" }, [1, 2]);
    s = go(s, { type: "decline" });
    s = go(s, { type: "end" });
    expect(s.turn).toBe(1);
  });
  it("no permite comprar dos veces ni tirar fuera de turno", () => {
    let s = game();
    s = go(s, { type: "roll" });
    s = go(s, { type: "buy" });
    expect(() => go(s, { type: "buy" })).toThrow();
    expect(() => go(s, { type: "roll" }, [1, 2], "b")).toThrow(/turno/);
  });
  it("cobra aerolíneas y servicios con factores exactos", () => {
    const s = game();
    s.properties[5].owner = "b";
    s.properties[15].owner = "b";
    expect(rent(s, 5, 7)).toBe(50);
    s.properties[12].owner = "b";
    expect(rent(s, 12, 7)).toBe(28);
    s.properties[28].owner = "b";
    expect(rent(s, 12, 7)).toBe(70);
  });
  it("deuda bloquea turno y se paga al acreedor tras liquidar", () => {
    let s = game();
    s.players[0].money = 1;
    s.properties[3].owner = "b";
    s.properties[1].owner = "a";
    s = go(s, { type: "roll" });
    expect(s.debt?.amount).toBe(4);
    expect(() => go(s, { type: "end" })).toThrow(/deuda/);
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "settle" });
    expect(s.players[0].money).toBe(27);
    expect(s.players[1].money).toBe(1504);
    expect(s.debt).toBeNull();
  });
  it("quiebra exige liquidar, transfiere propiedades y termina partida", () => {
    let s = game();
    s.players[0].money = 0;
    s.properties[39].owner = "b";
    s.properties[39].buildings = 5;
    s.properties[1].owner = "a";
    s.players[0].position = 36;
    s = go(s, { type: "roll" });
    expect(() => go(s, { type: "bankrupt" })).toThrow(/Primero/);
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "bankrupt" });
    expect(s.properties[1].owner).toBe("b");
    expect(s.properties[1].mortgaged).toBe(true);
    expect(s.players[1].money).toBe(1530);
    expect(s.status).toBe("finished");
    expect(s.winner).toEqual(["b"]);
  });
  it("quiebra al Banco libera propiedades y no se permite si es solvente", () => {
    let s = game();
    s.players[0].money = 0;
    s.properties[1].owner = "a";
    s.debt = { amount: 10, creditor: null };
    expect(() => go(s, { type: "bankrupt" })).toThrow(/cubrir/);
    s.debt.amount = 200;
    s = go(s, { type: "mortgage", square: 1 });
    s = go(s, { type: "bankrupt" });
    expect(s.properties[1]).toEqual({
      owner: null,
      buildings: 0,
      mortgaged: false,
    });
  });
  it("tratos revalidan fondos y conservan hipotecas", () => {
    let s = game();
    s.properties[1].owner = "a";
    s.properties[1].mortgaged = true;
    s = go(s, {
      type: "trade",
      to: "b",
      give: [1],
      take: [],
      giveMoney: 0,
      takeMoney: 100,
    });
    const id = s.trades[0].id;
    s = go(s, { type: "accept", trade: id }, [1, 2], "b");
    expect(s.properties[1].owner).toBe("b");
    expect(s.properties[1].mortgaged).toBe(true);
    expect(s.players[0].money).toBe(1600);
    expect(s.players[1].money).toBe(1400);
    expect(() => go(s, { type: "accept", trade: id }, [1, 2], "b")).toThrow();
  });
  it("carta de salida se retira y vuelve al mazo al usarla", () => {
    let s = game();
    s.decks.email = [4, ...s.decks.email.filter((i) => i !== 4)];
    s = go(s, { type: "roll" }, [1, 1]);
    expect(s.players[0].passes).toEqual(["email"]);
    expect(s.decks.email).not.toContain(4);
    s.players[0].jailed = 3;
    s.phase = "roll";
    s = go(s, { type: "pass" });
    expect(s.players[0].jailed).toBe(0);
    expect(s.decks.email.at(-1)).toBe(4);
  });
  it("cartas de reparación distinguen hoteles de restaurantes", () => {
    let s = game();
    s.properties[1] = { owner: "a", buildings: 5, mortgaged: false };
    s.properties[3] = { owner: "a", buildings: 4, mortgaged: false };
    s.decks.email = [5, ...s.decks.email.filter((i) => i !== 5)];
    s = go(s, { type: "roll" }, [1, 1]);
    expect(s.players[0].money).toBe(1300);
  });
  it("modo por tiempo admite empate y descuenta hipotecas", () => {
    const s = game();
    s.endsAt = 2000;
    expect(finishByTime(s, 1999)).toBe(s);
    expect(finishByTime(s, 2000).winner).toEqual(["a", "b"]);
    s.properties[1].owner = "a";
    s.properties[1].mortgaged = true;
    expect(finishByTime(s, 2000).winner).toEqual(["a"]);
  });
  it("host solo salta por inactividad validada", () => {
    const s = game();
    expect(() => go(s, { type: "skip" })).toThrow(/90/);
    expect(
      engine(s, { type: "skip" }, "a", { ...ctx, inactive: true }).turn,
    ).toBe(1);
  });
});

it("completa una partida de dos jugadores sin estados de bloqueo", () => {
  let s = game();
  let seed = 1234567;
  const dice = (): [number, number] => {
    const one = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return (seed % 6) + 1;
    };
    return [one(), one()];
  };
  for (let step = 0; step < 15000 && s.status === "playing"; step++) {
    const p = s.players[s.turn];
    let action: Action;
    const owned = BOARD.filter((b) => s.properties[b.id]?.owner === p.id);
    if (s.debt) {
      if (p.money >= s.debt.amount) action = { type: "settle" };
      else {
        const sell = owned.find((b) => !assetError(s, p, b.id, "sell"));
        const mortgage = owned.find((b) => !assetError(s, p, b.id, "mortgage"));
        action = sell
          ? { type: "sell", square: sell.id }
          : mortgage
            ? { type: "mortgage", square: mortgage.id }
            : { type: "bankrupt" };
      }
    } else if (s.phase === "roll") action = { type: "roll" };
    else if (s.phase === "buy")
      action = { type: p.money >= BOARD[p.position].price ? "buy" : "decline" };
    else {
      const build = owned.find(
        (b) => p.money > 300 && !assetError(s, p, b.id, "build"),
      );
      action = build ? { type: "build", square: build.id } : { type: "end" };
    }
    s = engine(s, action, p.id, { ...ctx, now: 1000 + step, dice: dice() });
    expect(s.players.every((p) => p.money >= 0)).toBe(true);
  }
  expect(s.status).toBe("finished");
  expect(s.winner).toHaveLength(1);
});

it("el anfitrión quebrado conserva la moderación de jugadores desconectados", () => {
  const s = game();
  s.players.push(newPlayer("c", "Sol", "#0a0"));
  s.players[0].bankrupt = true;
  s.turn = 1;
  const next = engine(s, { type: "skip" }, "a", { ...ctx, inactive: true });
  expect(next.turn).toBe(2);
  expect(() => engine(s, { type: "roll" }, "a", ctx)).toThrow(
    /Jugador no disponible/,
  );
});
