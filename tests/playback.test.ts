import { afterEach, expect, it, vi } from "vitest";
import { GamePlayback, type PlaybackView } from "../src/presentation/services/playback";
import { eventDuration } from "../src/domain/game/presentation";
import { game, go } from "./helpers";

afterEach(() => vi.useRealTimers());

it("muestra los dados, después cada casilla y solo entonces el aviso de llegada", () => {
  vi.useFakeTimers();
  const initial = game();
  const frames: PlaybackView[] = [];
  const playback = new GamePlayback(initial, (view) => frames.push(view));
  const rolled = go(initial, { type: "roll" });
  playback.update(rolled);
  expect(frames.at(-1)?.event?.type).toBe("roll");
  expect(frames.at(-1)?.positions.a).toBe(0);
  vi.advanceTimersByTime(2599);
  expect(frames.at(-1)?.positions.a).toBe(0);
  vi.advanceTimersByTime(1);
  expect(frames.at(-1)?.event?.type).toBe("move");
  for (const position of [1, 2, 3]) {
    vi.advanceTimersByTime(160);
    expect(frames.at(-1)?.positions.a).toBe(position);
    expect(frames.at(-1)?.event?.type).toBe("move");
  }
  vi.advanceTimersByTime(220);
  expect(frames.at(-1)?.event?.text).toContain("llegó a");
  vi.advanceTimersByTime(2400);
  expect(frames.at(-1)?.busy).toBe(false);
  expect(frames.at(-1)?.event).toBeNull();
  expect(vi.getTimerCount()).toBe(0);
  playback.dispose();
});

it("polling repetido no reinicia una animación ni duplica el recorrido", () => {
  vi.useFakeTimers();
  const initial = game();const frames: PlaybackView[] = [];
  const playback = new GamePlayback(initial, (view) => frames.push(view));
  const rolled = go(initial, { type: "roll" });
  playback.update(rolled);vi.advanceTimersByTime(1000);
  playback.update(structuredClone(rolled));
  vi.advanceTimersByTime(1600);
  expect(frames.at(-1)?.event?.type).toBe("move");
  vi.runAllTimers();
  expect(frames.filter((frame) => frame.event?.type === "roll")).toHaveLength(1);
  expect(frames.at(-1)?.positions).toEqual({ a: 3, b: 0 });
  playback.dispose();
});

it("refrescar y recuperar una brecha de eventos toma la posición real sin reproducir historia", () => {
  vi.useFakeTimers();
  const initial = go(game(), { type: "roll" });const frames: PlaybackView[] = [];
  const playback = new GamePlayback(initial, (view) => frames.push(view));
  expect(frames.at(-1)?.positions.a).toBe(3);expect(frames.at(-1)?.busy).toBe(false);
  const reconnected = structuredClone(initial);
  reconnected.players[0].position = 25;
  reconnected.eventSerial = (initial.eventSerial ?? 0) + 200;
  reconnected.events = [{ id: reconnected.eventSerial, text: "Reconexión", type: "log" }];
  playback.update(reconnected);
  expect(frames.at(-1)?.positions.a).toBe(25);expect(frames.at(-1)?.busy).toBe(false);
  expect(vi.getTimerCount()).toBe(0);playback.dispose();
});

it("cerrar una subasta nunca traslada al comprador ni al jugador que pasó", () => {
  vi.useFakeTimers();
  let s = game(3);s.players[1].position = 24;s.players[2].position = 39;
  s = go(go(s, { type: "roll" }), { type: "decline" });
  const frames: PlaybackView[] = [];
  const playback = new GamePlayback(s, (view) => frames.push(view));
  s = go(s, { type: "fold" }, [1, 2], "b");playback.update(s);
  s = go(s, { type: "bid", amount: 16000 }, [1, 2], "c");playback.update(s);
  vi.runAllTimers();
  expect(frames.every((frame) => frame.positions.a === 3 && frame.positions.b === 24 && frame.positions.c === 39)).toBe(true);
  playback.dispose();
});

it("movimiento reducido omite pasos pero conserva el orden y limpia temporizadores al salir", () => {
  vi.useFakeTimers();
  const initial = game();const frames: PlaybackView[] = [];
  const playback = new GamePlayback(initial, (view) => frames.push(view), true);
  const rolled = go(initial, { type: "roll" });playback.update(rolled);
  vi.advanceTimersByTime(900);
  expect(frames.at(-1)?.positions.a).toBe(3);
  playback.setVisible(false);
  expect(frames.at(-1)?.busy).toBe(false);expect(vi.getTimerCount()).toBe(0);
  playback.dispose();
  expect(eventDuration({ id: 1, text: "", type: "move", path: [1, 2, 3] })).toBe(700);
});
