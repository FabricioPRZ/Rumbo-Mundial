import { COLORS, type Action } from "@/domain/game/types";
import { z } from "zod";
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
      "stay",
      "bail",
      "skip",
      "expel",
      "salary",
      "opening-roll",
      "fold",
      "auction-expire",
    ]),
  }),
  z.object({
    type: z.enum(["build", "sell", "sell-group", "mortgage", "redeem", "return"]),
    square,
  }),
  z.object({
    type: z.literal("color"),
    color: z.enum(COLORS as [string, ...string[]]),
  }),
  z.object({
    type: z.literal("trade"),
    to: z.string().uuid(),
    give: z.array(square).max(30),
    take: z.array(square).max(30),
    giveMoney: z.number().int().nonnegative().max(100000000),
    takeMoney: z.number().int().nonnegative().max(100000000),
  }),
  z.object({ type: z.literal("bid"), amount: z.number().int().positive().max(100000000), square: square.optional() }),
  z.object({ type: z.literal("collect"), target: z.string().uuid() }),
  z.object({ type: z.literal("acquire"), square }),
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

export const createRoomSchema = identity.extend({ duration: z.union([z.literal(0), z.literal(30), z.literal(60), z.literal(90)]).default(0) });
export const joinRoomSchema = identity.extend({ token: z.string().uuid().optional() });
export const tokenSchema = z.string().uuid();
export const actionRequestSchema = z.object({ token: tokenSchema, action: actionSchema, version: z.number().int().positive(), requestId: z.string().uuid() });
