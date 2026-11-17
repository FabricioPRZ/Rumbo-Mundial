import { engine } from "@/domain/game/engine";
import { waitingPlayer } from "@/domain/game/turns";
import type { Game } from "@/domain/game/types";
import { OperationError } from "@/domain/shared/errors";
import type { RoomActionInput, RoomDependencies } from "./contracts";
import { authorize, context, loadRoom, publicGame } from "./shared";
export async function act(deps: RoomDependencies, id: string, data: RoomActionInput) {
  const stored = await loadRoom(deps, id),
    pid = authorize(deps, stored, data.token);
  const receipt = `${pid}:${data.requestId}`;
  if (stored.receipts[receipt]) return { game: publicGame(stored.game) };
  if (stored.game.version !== data.version)
    throw new OperationError("conflict", "La sala cambió. Revisa el estado actualizado.");
  const ctx = context(deps);
  if (data.action.type === "skip" || data.action.type === "expel") {
    const active = stored.game.players.find((p) => p.id === waitingPlayer(stored.game))!;
    const seen = await deps.rooms.lastSeen(id, active.id);
    ctx.inactive = ctx.now - Math.max(stored.game.turnAt, seen ?? 0) >= 90000;
  }
  let next: Game;
  try {
    next = engine(stored.game, data.action, pid, ctx);
  } catch (e) {
    throw new OperationError("invalid",
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
  await deps.rooms.save(id, old, stored);
  await deps.rooms.markSeen(id, pid, ctx.now);
  return { game: publicGame(next) };
}
