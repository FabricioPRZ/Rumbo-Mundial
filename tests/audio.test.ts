import { afterEach, expect, it, vi } from "vitest";
import { audioPreferences, DEFAULT_AUDIO, GameAudio } from "../lib/audio";

function audioContext() {
  const parameter = () => ({ value: 0, setTargetAtTime: vi.fn(), setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() });
  const oscillators: { stop: ReturnType<typeof vi.fn> }[] = [];
  const context = {
    state: "suspended",
    currentTime: 0,
    destination: {},
    createGain: vi.fn(() => ({ gain: parameter(), connect: vi.fn(), disconnect: vi.fn() })),
    createOscillator: vi.fn(() => {
      const oscillator = { frequency: parameter(), type: "sine", connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn(), onended: null };
      oscillators.push(oscillator);
      return oscillator;
    }),
    resume: vi.fn(async () => { context.state = "running"; }),
    suspend: vi.fn(async () => { context.state = "suspended"; }),
    close: vi.fn(async () => { context.state = "closed"; }),
  };
  return { context, oscillators, engine: new GameAudio(context as unknown as AudioContext) };
}

afterEach(() => { vi.useRealTimers(); });

it("valida preferencias dañadas y limita el volumen sin activar audio por defecto", () => {
  expect(audioPreferences(null)).toEqual(DEFAULT_AUDIO);
  expect(audioPreferences({ muted: "false", music: -9, effects: 120 })).toEqual({ muted: true, music: 0, effects: 100 });
  expect(audioPreferences({ muted: false, music: NaN, effects: Infinity })).toEqual({ muted: false, music: 30, effects: 65 });
});

it("no reproduce antes de activar audio y no duplica el secuenciador al tocar varias veces", async () => {
  vi.useFakeTimers();
  const { engine, context } = audioContext();
  await engine.unlock();engine.play("roll");
  expect(context.resume).not.toHaveBeenCalled();expect(context.createOscillator).not.toHaveBeenCalled();
  engine.configure({ muted: false, music: 30, effects: 65 });
  await engine.unlock();await engine.unlock();
  expect(vi.getTimerCount()).toBe(1);expect(context.createOscillator).toHaveBeenCalled();
  engine.dispose();expect(vi.getTimerCount()).toBe(0);expect(context.close).toHaveBeenCalledOnce();
});

it("silenciar todo detiene música y efectos sin perder los volúmenes", async () => {
  vi.useFakeTimers();
  const { engine, context, oscillators } = audioContext();
  engine.configure({ muted: false, music: 30, effects: 65 });await engine.unlock();
  engine.play("purchase");
  const count = oscillators.length;
  engine.configure({ muted: true, music: 30, effects: 65 });engine.play("victory");
  expect(oscillators.length).toBe(count);expect(vi.getTimerCount()).toBe(0);
  expect(oscillators.every((note) => note.stop.mock.calls.length >= 2)).toBe(true);
  expect(context.suspend).toHaveBeenCalled();
  engine.configure({ muted: false, music: 30, effects: 65 });await engine.unlock();
  expect(vi.getTimerCount()).toBe(1);engine.dispose();
});

it("volúmenes independientes permiten efectos con música a cero y viceversa", async () => {
  vi.useFakeTimers();
  const { engine, context } = audioContext();
  engine.configure({ muted: false, music: 0, effects: 65 });await engine.unlock();
  expect(context.createOscillator).not.toHaveBeenCalled();
  engine.play("card");expect(context.createOscillator).toHaveBeenCalledTimes(3);
  engine.configure({ muted: false, music: 30, effects: 0 });
  engine.play("roll");expect(context.createOscillator).toHaveBeenCalledTimes(3);
  engine.dispose();
});

it("ocultar la pestaña suspende audio y limpiar el componente cancela los recursos", async () => {
  vi.useFakeTimers();
  const { engine, context } = audioContext();
  engine.configure({ muted: false, music: 30, effects: 65 });await engine.unlock();
  engine.setVisible(false);
  expect(vi.getTimerCount()).toBe(0);expect(context.state).toBe("suspended");
  const count = context.createOscillator.mock.calls.length;
  await engine.unlock();engine.play("roll");
  expect(context.createOscillator).toHaveBeenCalledTimes(count);
  engine.setVisible(true);await engine.unlock();expect(vi.getTimerCount()).toBe(1);
  engine.dispose();await engine.unlock();expect(vi.getTimerCount()).toBe(0);expect(context.state).toBe("closed");
});
