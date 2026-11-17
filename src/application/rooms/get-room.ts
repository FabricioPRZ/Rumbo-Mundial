import { finishByTime } from "@/domain/game/timing";
import { waitingPlayer } from "@/domain/game/turns";
import { OperationError } from "@/domain/shared/errors";
import type { RoomDependencies } from "./contracts";
import { authorize, loadRoom, publicGame } from "./shared";
export async function getRoom(deps: RoomDependencies, id: string, token: string | null, heartbeat: boolean) {
  let stored = await loadRoom(deps, id);
  let playerId: string | null = null;
  if (token) {
    playerId = authorize(deps, stored, token);
    if (heartbeat)
      await deps.rooms.markSeen(id, playerId, deps.platform.now());
  }
  const expired = finishByTime(stored.game, deps.platform.now());
  if (expired !== stored.game) {
    const old = stored.game.version;
    expired.version = old + 1;
    stored.game = expired;
    try {
      await deps.rooms.save(id, old, stored);
    } catch (e) {
      if (!(e instanceof OperationError) || e.code !== "conflict") throw e;
      stored = await loadRoom(deps, id);
    }
  }
  const active = stored.game.players.find((p) => p.id === waitingPlayer(stored.game))!;
  const seen = await deps.rooms.lastSeen(id, active.id);
  return {
    game: publicGame(stored.game),
    playerId,
    inactiveFor: Math.max(
      0,
      deps.platform.now() - Math.max(stored.game.turnAt, seen ?? 0),
    ),
  };
}
