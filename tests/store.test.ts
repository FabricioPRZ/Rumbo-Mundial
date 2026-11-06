import { beforeEach, describe, expect, it, vi } from "vitest";
import { randomUUID } from "node:crypto";
// Test double only: production state is exclusively in Redis.
const memory = vi.hoisted(() => new Map<string, string>());
vi.mock("@upstash/redis", () => ({
  Redis: class {
    async get(key: string) {
      const raw = memory.get(key);
      return raw ? JSON.parse(raw) : null;
    }
    async set(key: string, value: unknown, options?: { nx?: boolean }) {
      if (options?.nx && memory.has(key)) return null;
      memory.set(key, JSON.stringify(value));
      return "OK";
    }
    async eval(_script: string, keys: string[], args: unknown[]) {
      const raw = memory.get(keys[0]);
      if (!raw) return -1;
      const stored = JSON.parse(raw);
      if (stored.game.version !== args[0]) return 0;
      memory.set(keys[0], String(args[1]));
      return 1;
    }
  },
}));
import { act, createRoom, getRoom, joinRoom } from "../lib/store";
import type { Action } from "../lib/game/types";
async function setup() {
  const a = await createRoom({ name: "Ana" });
  const b = await joinRoom(a.id, { name: "Luis" });
  return { a, b };
}
const request = (
  token: string,
  version: number,
  action: Action,
  requestId = randomUUID(),
) => ({ token, version, action, requestId });
beforeEach(() => {
  memory.clear();
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.test");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
});
describe("Persistencia autoritativa (adaptador Redis simulado)", () => {
  it("emite tokens únicos, recupera identidad y no filtra secretos ni mazos", async () => {
    const { a, b } = await setup();
    expect(a.playerToken).not.toBe(b.playerToken);
    const view = await getRoom(a.id, a.playerToken, true);
    expect(view.playerId).toBe(a.playerId);
    expect(JSON.stringify(view)).not.toContain(a.playerToken);
    const started = await act(
      a.id,
      request(a.playerToken, b.game.version, { type: "start" }),
    );
    expect(started.game.decks).toEqual({ email: [], sms: [] });
    const stored = JSON.parse(memory.get(`turista:room:${a.id}`)!);
    expect(stored.game.decks.email).toHaveLength(16);
    expect(JSON.stringify(stored)).not.toContain(a.playerToken);
  });
  it("rechaza token falsificado y no confía en un playerId", async () => {
    const { a, b } = await setup();
    await expect(
      act(a.id, {
        ...request(randomUUID(), b.game.version, { type: "start" }),
        playerId: a.playerId,
      }),
    ).rejects.toMatchObject({ status: 401 });
    await expect(
      act(a.id, request(b.playerToken, b.game.version, { type: "start" })),
    ).rejects.toMatchObject({ status: 400 });
  });
  it("dos acciones simultáneas con la misma versión tienen un solo ganador", async () => {
    const { a, b } = await setup();
    const start = await act(
      a.id,
      request(a.playerToken, b.game.version, { type: "start" }),
    );
    const results = await Promise.allSettled([
      act(a.id, request(a.playerToken, start.game.version, { type: "roll" })),
      act(a.id, request(a.playerToken, start.game.version, { type: "roll" })),
    ]);
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    const failure = results.find((r) => r.status === "rejected");
    expect(failure?.status === "rejected" && failure.reason.status).toBe(409);
    const final = await getRoom(a.id, a.playerToken, false);
    expect(final.game.version).toBe(start.game.version + 1);
  });
  it("repetir el mismo requestId no repite el efecto", async () => {
    const { a, b } = await setup();
    const req = request(a.playerToken, b.game.version, { type: "start" });
    const first = await act(a.id, req);
    const second = await act(a.id, req);
    expect(second.game).toEqual(first.game);
  });
  it("uniones concurrentes conservan colores y jugadores distintos", async () => {
    const a = await createRoom({ name: "Ana" });
    const joined = await Promise.all([
      joinRoom(a.id, { name: "Luis" }),
      joinRoom(a.id, { name: "Sol" }),
    ]);
    expect(joined).toHaveLength(2);
    const view = await getRoom(a.id, null, false);
    expect(view.game.players).toHaveLength(3);
    expect(new Set(view.game.players.map((p) => p.color)).size).toBe(3);
  });
  it("reconecta el token existente sin agregar otro jugador", async () => {
    const { a, b } = await setup();
    const again = await joinRoom(a.id, {
      name: "Otra Ana",
      token: a.playerToken,
    });
    expect(again.playerId).toBe(a.playerId);
    expect(again.game.players).toHaveLength(b.game.players.length);
  });
  it("impide entrar después del inicio y devuelve sala no encontrada", async () => {
    const { a, b } = await setup();
    await act(a.id, request(a.playerToken, b.game.version, { type: "start" }));
    await expect(joinRoom(a.id, { name: "Tercero" })).rejects.toMatchObject({
      status: 409,
    });
    await expect(getRoom("ZZZZZZ", null, false)).rejects.toMatchObject({
      status: 404,
    });
  });
  it("finaliza la partida vencida al consultarla sin temporizador residente", async () => {
    const a = await createRoom({ name: "Ana", duration: 30 });
    const b = await joinRoom(a.id, { name: "Luis" });
    await act(a.id, request(a.playerToken, b.game.version, { type: "start" }));
    const k = `turista:room:${a.id}`;
    const s = JSON.parse(memory.get(k)!);
    s.game.endsAt = Date.now() - 1;
    memory.set(k, JSON.stringify(s));
    const view = await getRoom(a.id, a.playerToken, false);
    expect(view.game.status).toBe("finished");
    expect(view.game.winner).toHaveLength(2);
  });
  it("valida cuerpos, montos, IDs y colores", async () => {
    await expect(createRoom({ name: " " })).rejects.toThrow();
    await expect(createRoom({ name: "Ana", duration: 12 })).rejects.toThrow();
    const { a, b } = await setup();
    await expect(
      act(
        a.id,
        request(a.playerToken, b.game.version, {
          type: "trade",
          to: b.playerId,
          give: [],
          take: [],
          giveMoney: -100,
          takeMoney: 0,
        }),
      ),
    ).rejects.toThrow();
  });
});

it("no acepta que un cliente elija un token nuevo al unirse", async () => {
  const a = await createRoom({ name: "Ana" });
  await expect(
    joinRoom(a.id, { name: "Luis", token: randomUUID() }),
  ).rejects.toMatchObject({ status: 401 });
  expect((await getRoom(a.id, null, false)).game.players).toHaveLength(1);
});
