import { expect, it } from "vitest";
import { engine, finishByTime, newGame, newPlayer } from "../lib/game/engine";
import { auctionMinimum } from "../lib/game/rules";
import { game, go, ctx } from "./helpers";

it("el servidor salta la tirada vencida a los 20 segundos, sin mover la ficha", () => {
  const s = game();
  expect(finishByTime(s, s.rollDeadline! - 1)).toBe(s);
  const next = finishByTime(s, s.rollDeadline!);
  expect(next.turn).toBe(1);expect(next.players.map((p) => p.position)).toEqual([0, 0]);
  expect(next.log.at(-1)).toContain("20 segundos");
  expect(next.rollDeadline! - next.presentationUntil!).toBe(20000);
  expect(finishByTime(next, s.rollDeadline!)).toBe(next);
  expect(() => engine(s, { type: "roll" }, "a", { ...ctx, now: s.rollDeadline! })).toThrow(/automáticamente/);
});

it("la compra cierra el turno automáticamente después de sus animaciones", () => {
  let s = go(game(), { type: "roll" });
  expect(s.phase).toBe("buy");expect(s.autoEndAt).toBeUndefined();
  expect(finishByTime(s, 1_000_000)).toBe(s);
  s = go(s, { type: "buy" });
  expect(finishByTime(s, s.autoEndAt! - 1)).toBe(s);
  const next = finishByTime(s, s.autoEndAt!);
  expect(next.turn).toBe(1);expect(next.phase).toBe("roll");
  expect(next.properties[3].owner).toBe("a");
});

it("los dobles habilitan automáticamente otra tirada con 20 segundos nuevos", () => {
  let s = go(game(), { type: "roll" }, [1, 1]);s = go(s, { type: "buy" });
  const next = finishByTime(s, s.autoEndAt!);
  expect(next.turn).toBe(0);expect(next.phase).toBe("roll");expect(next.doubles).toBe(1);
  expect(next.rollDeadline).toBe(s.autoEndAt! + 20000);
});

it("el cambio automático cobra el sueldo exactamente una vez", () => {
  let s = game();s.players[0].position = 39;
  s = go(s, { type: "roll" });s = go(s, { type: "buy" });
  const before = s.players[0].money;
  const next = finishByTime(s, s.autoEndAt!);
  expect(next.players[0].money).toBe(before + 20000);expect(next.players[0].salary).toBe(0);
  expect(finishByTime(next, s.autoEndAt!)).toBe(next);
});

it("deportación espera una decisión y quedarse no consume el turno de llegada", () => {
  let s = game();s.players[0].position = 7;s = go(s, { type: "roll" });
  expect(s.detentionDecision).toBe("a");expect(finishByTime(s, 1_000_000)).toBe(s);
  s = go(s, { type: "stay" });
  expect(s.players[0].jailed).toBe(3);
  const next = finishByTime(s, s.autoEndAt!);
  expect(next.turn).toBe(1);expect(next.players[0].jailed).toBe(3);
});

it("un turno vencido en deportación descuenta solo una espera", () => {
  const s = game();s.players[0].position = 10;s.players[0].detention = "oceania";s.players[0].jailed = 3;
  const next = finishByTime(s, s.rollDeadline!);
  expect(next.players[0].jailed).toBe(2);expect(next.players[0].position).toBe(10);expect(next.turn).toBe(1);
});

it("la selección inicial también vence sin bloquear la partida si nadie tira", () => {
  let s = newGame("ABC234", newPlayer("a", "Ana", "red"), 0);s.players.push(newPlayer("b", "Luis", "blue"));
  s = go(s, { type: "start" });s = finishByTime(s, s.rollDeadline!);
  expect(s.opening).toBeNull();expect(s.phase).toBe("roll");expect(s.rollDeadline).toBeGreaterThan(s.turnAt);
});

it("deudas y subastas pendientes no son saltadas por el contador de dados", () => {
  let s = game();s.properties[3].owner = "b";s = go(s, { type: "roll" });
  expect(finishByTime(s, 100000)).toBe(s);
  let auction = go(go(game(), { type: "roll" }), { type: "decline" });
  expect(auction.autoEndAt).toBeUndefined();
  auction = finishByTime(auction, auction.auction!.endsAt);
  expect(auction.autoEndAt).toBeDefined();expect(auction.turn).toBe(0);
});

it("subastas empiezan cerca del valor impreso y el servidor rechaza ofertas bajas", () => {
  expect(auctionMinimum(1)).toBe(10000);
  expect(auctionMinimum(3)).toBe(16000);
  expect(auctionMinimum(3, 16000)).toBe(16500);
  expect(auctionMinimum(1, 0, true)).toBe(5000);
  const s = go(go(game(3), { type: "roll" }), { type: "decline" });
  expect(() => go(s, { type: "bid", amount: 500 }, [1, 2], "b")).toThrow(/16000/);
  const next = go(s, { type: "bid", amount: 16000 }, [1, 2], "b");
  expect(next.auction?.amount).toBe(16000);
  expect(() => go(next, { type: "bid", amount: 16001 }, [1, 2], "c")).toThrow(/16500/);
});
