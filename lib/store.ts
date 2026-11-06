import { Redis } from "@upstash/redis";
import { createHash, randomInt, randomUUID } from "node:crypto";
import { z } from "zod";
import { CARDS } from "./game/cards";
import { shuffleDeck } from "./game/shuffle";
import {
  addLog,
  engine,
  finishByTime,
  newGame,
  newPlayer,
} from "./game/engine";
import { COLORS, type Action, type Context, type Game } from "./game/types";
interface Stored {
  game: Game;
  tokens: Record<string, string>;
  receipts: Record<string, number>;
}
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token)
    throw new HttpError(
      503,
      "Configura las variables de Upstash Redis para jugar.",
    );
  return new Redis({ url, token });
}
const key = (id: string) => `turista:room:${id}`;
const digest = (token: string) =>
  createHash("sha256").update(token).digest("hex");
export const roomId = z
  .string()
  .regex(/^[A-HJ-NP-Z2-9]{6}$/, "ID de sala inválido.");
export const identity = z.object({
  name: z.string().trim().min(1).max(24),
  color: z.enum(COLORS as [string, ...string[]]).optional(),
});
const square = z.number().int().min(0).max(39);
const baseActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.enum([
      "start",
      "roll",
      "buy",
      "decline",
      "end",
      "settle",
      "bankrupt",
      "pass",
      "wait",
      "bail",
      "skip",
      "expel",
    ]),
  }),
  z.object({
    type: z.enum(["build", "sell", "mortgage", "redeem", "return"]),
    square,
  }),
  z.object({
    type: z.literal("color"),
    color: z.enum(COLORS as [string, ...string[]]),
  }),
  z.object({
    type: z.literal("trade"),
    to: z.string().uuid(),
    give: z.array(square).max(28),
    take: z.array(square).max(28),
    giveMoney: z.number().int().nonnegative().max(100000000),
    takeMoney: z.number().int().nonnegative().max(100000000),
  }),
  z.object({ type: z.literal("accept"), trade: z.string().max(100) }),
  z.object({ type: z.literal("reject"), trade: z.string().max(100) }),
  z.object({
    type: z.literal("change"),
    denomination: z.number().int().positive(),
  }),
]);
export const actionSchema: z.ZodType<Action> = baseActionSchema.and(
  z.object({
    bills: z.record(z.number().int().nonnegative().max(100000000)).optional(),
  }),
);
const CAS = `local old=redis.call('GET',KEYS[1]); if not old then return -1 end; local parsed=cjson.decode(old); if parsed.game.version~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',86400); return 1`;
async function save(id: string, old: number, value: Stored) {
  const result = await redis().eval(
    CAS,
    [key(id)],
    [old, JSON.stringify(value)],
  );
  if (result === -1) throw new HttpError(404, "Sala no encontrada.");
  if (result !== 1)
    throw new HttpError(
      409,
      "La sala cambió. Actualiza el estado antes de intentar otra vez.",
    );
}
async function read(id: string): Promise<Stored> {
  roomId.parse(id);
  const stored = await redis().get<Stored>(key(id));
  if (!stored) throw new HttpError(404, "Sala no encontrada.");
  return stored;
}
function authorize(stored: Stored, token: string) {
  const id = stored.tokens[digest(token)];
  if (!id) throw new HttpError(401, "El token no pertenece a esta sala.");
  return id;
}
export function publicGame(s: Game): Game {
  return { ...s, decks: { email: [], sms: [] } };
}
function context(): Context {
  return {
    now: Date.now(),
    dice: [randomInt(1, 7), randomInt(1, 7)],
    shuffled: {
      email: shuffleDeck(CARDS.email.length, randomInt),
      sms: shuffleDeck(CARDS.sms.length, randomInt),
    },
  };
}
export async function createRoom(input: unknown) {
  const data = identity
    .extend({
      duration: z
        .union([z.literal(0), z.literal(30), z.literal(60), z.literal(90)])
        .default(0),
    })
    .parse(input);
  const token = randomUUID(),
    player = newPlayer(randomUUID(), data.name, data.color ?? COLORS[0]);
  for (let attempt = 0; attempt < 8; attempt++) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const id = Array.from(
      { length: 6 },
      () => alphabet[randomInt(alphabet.length)],
    ).join("");
    const game = newGame(id, player, data.duration);
    const stored: Stored = {
      game,
      tokens: { [digest(token)]: player.id },
      receipts: {},
    };
    if (await redis().set(key(id), stored, { nx: true, ex: 86400 }))
      return {
        id,
        playerToken: token,
        playerId: player.id,
        game: publicGame(game),
      };
  }
  throw new HttpError(503, "No se pudo crear una sala. Intenta otra vez.");
}
export async function joinRoom(id: string, input: unknown) {
  const data = identity
    .extend({ token: z.string().uuid().optional() })
    .parse(input);
  const token = randomUUID();
  for (let i = 0; i < 4; i++) {
    const stored = await read(id);
    if (data.token) {
      const existing = stored.tokens[digest(data.token)];
      if (!existing)
        throw new HttpError(401, "El token no pertenece a esta sala.");
      return {
        playerToken: data.token,
        playerId: existing,
        game: publicGame(stored.game),
      };
    }
    const s = stored.game;
    if (s.status !== "lobby")
      throw new HttpError(409, "La partida ya comenzó.");
    if (s.players.length >= 6) throw new HttpError(409, "La sala está llena.");
    const color =
      data.color ?? COLORS.find((c) => !s.players.some((p) => p.color === c));
    if (!color || s.players.some((p) => p.color === color))
      throw new HttpError(409, "Este color ya está ocupado.");
    const p = newPlayer(randomUUID(), data.name, color);
    s.players.push(p);
    stored.tokens[digest(token)] = p.id;
    const old = s.version;
    s.version++;
    addLog(s, `${p.name} se unió al viaje.`);
    try {
      await save(id, old, stored);
      return { playerToken: token, playerId: p.id, game: publicGame(s) };
    } catch (e) {
      if (!(e instanceof HttpError) || e.status !== 409 || i === 3) throw e;
    }
  }
  throw new HttpError(409, "Intenta unirte nuevamente.");
}
export async function getRoom(
  id: string,
  token: string | null,
  heartbeat: boolean,
) {
  let stored = await read(id);
  let playerId: string | null = null;
  if (token) {
    playerId = authorize(stored, token);
    if (heartbeat)
      await redis().set(`turista:seen:${id}:${playerId}`, Date.now(), {
        ex: 86400,
      });
  }
  const expired = finishByTime(stored.game, Date.now());
  if (expired !== stored.game) {
    const old = stored.game.version;
    expired.version = old + 1;
    stored.game = expired;
    try {
      await save(id, old, stored);
    } catch (e) {
      if (!(e instanceof HttpError) || e.status !== 409) throw e;
      stored = await read(id);
    }
  }
  const active = stored.game.players[stored.game.turn];
  const seen = await redis().get<number>(`turista:seen:${id}:${active.id}`);
  return {
    game: publicGame(stored.game),
    playerId,
    inactiveFor: Math.max(
      0,
      Date.now() - Math.max(stored.game.turnAt, seen ?? 0),
    ),
  };
}
export async function act(id: string, input: unknown) {
  const data = z
    .object({
      token: z.string().uuid(),
      action: actionSchema,
      version: z.number().int().positive(),
      requestId: z.string().uuid(),
    })
    .parse(input);
  const stored = await read(id),
    pid = authorize(stored, data.token);
  const receipt = `${pid}:${data.requestId}`;
  if (stored.receipts[receipt]) return { game: publicGame(stored.game) };
  if (stored.game.version !== data.version)
    throw new HttpError(409, "La sala cambió. Revisa el estado actualizado.");
  const ctx = context();
  if (data.action.type === "skip" || data.action.type === "expel") {
    const active = stored.game.players[stored.game.turn];
    const seen = await redis().get<number>(`turista:seen:${id}:${active.id}`);
    ctx.inactive = ctx.now - Math.max(stored.game.turnAt, seen ?? 0) >= 90000;
  }
  let next: Game;
  try {
    next = engine(stored.game, data.action, pid, ctx);
  } catch (e) {
    throw new HttpError(
      400,
      e instanceof Error ? e.message : "Acción inválida.",
    );
  }
  next.version = stored.game.version + 1;
  const old = stored.game.version;
  stored.game = next;
  stored.receipts[receipt] = next.version;
  stored.receipts = Object.fromEntries(
    Object.entries(stored.receipts).slice(-100),
  );
  await save(id, old, stored);
  await redis().set(`turista:seen:${id}:${pid}`, ctx.now, { ex: 86400 });
  return { game: publicGame(next) };
}
