import { newGame, newPlayer } from "@/domain/game/factory";
import { COLORS } from "@/domain/game/types";
import { OperationError } from "@/domain/shared/errors";
import type { StoredRoom } from "../ports/room-repository";
import type { CreateRoomInput, RoomDependencies } from "./contracts";
import { publicGame } from "./shared";
export async function createRoom(deps: RoomDependencies, data: CreateRoomInput) {
  const token = deps.platform.uuid(),
    player = newPlayer(deps.platform.uuid(), data.name, data.color ?? COLORS[0]);
  for (let attempt = 0; attempt < 8; attempt++) {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const id = Array.from(
      { length: 6 },
      () => alphabet[deps.platform.randomInt(alphabet.length)],
    ).join("");
    const game = newGame(id, player, data.duration);
    const stored: StoredRoom = {
      game,
      tokens: { [deps.platform.digest(token)]: player.id },
      receipts: {},
    };
    if (await deps.rooms.create(id, stored))
      return {
        id,
        playerToken: token,
        playerId: player.id,
        game: publicGame(game),
      };
  }
  throw new OperationError("unavailable", "No se pudo crear una sala. Intenta otra vez.");
}
