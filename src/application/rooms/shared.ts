import { RULES_VERSION } from "@/domain/game/board";
import { CARDS } from "@/domain/game/cards";
import { shuffleDeck } from "@/domain/game/shuffle";
import type { Context, Game } from "@/domain/game/types";
import { OperationError } from "@/domain/shared/errors";
import type { StoredRoom } from "../ports/room-repository";
import type { RoomDependencies } from "./contracts";
export async function loadRoom(deps: RoomDependencies, id: string) {
  const stored = await deps.rooms.load(id);
  if (!stored) throw new OperationError("not_found", "Sala no encontrada.");
  if (stored.game.rulesVersion !== RULES_VERSION) throw new OperationError("gone", "Esta sala usa el tablero anterior. Crea una sala nueva para jugar Rumbo Mundial.");
  return stored;
}
export function authorize(deps: RoomDependencies, stored: StoredRoom, token: string) {
  const id = stored.tokens[deps.platform.digest(token)];
  if (!id) throw new OperationError("unauthorized", "El token no pertenece a esta sala.");
  return id;
}
export function publicGame(game: Game): Game { return { ...game, decks: { email: [], sms: [] } }; }
export function context(deps: RoomDependencies): Context {
  return { now: deps.platform.now(), dice: [deps.platform.randomInt(6) + 1, deps.platform.randomInt(6) + 1],
    shuffled: { email: shuffleDeck(CARDS.email.length, deps.platform.randomInt), sms: shuffleDeck(CARDS.sms.length, deps.platform.randomInt) } };
}
