import type { RoomDependencies } from "./contracts";
import { authorize, loadRoom } from "./shared";
export async function roomIdentity(deps: RoomDependencies, id: string, token: string) {
  const stored = await loadRoom(deps, id);
  return { playerId: authorize(deps, stored, token), players: stored.game.players.map((player) => player.id) };
}
