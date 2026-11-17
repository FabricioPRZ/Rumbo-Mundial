import { addLog } from "@/domain/game/events";
import { newPlayer } from "@/domain/game/factory";
import { COLORS } from "@/domain/game/types";
import { OperationError } from "@/domain/shared/errors";
import type { JoinRoomInput, RoomDependencies } from "./contracts";
import { loadRoom, publicGame } from "./shared";
export async function joinRoom(deps: RoomDependencies, id: string, data: JoinRoomInput) {
  const token = deps.platform.uuid();
  for (let i = 0; i < 4; i++) {
    const stored = await loadRoom(deps, id);
    if (data.token) {
      const existing = stored.tokens[deps.platform.digest(data.token)];
      if (!existing)
        throw new OperationError("unauthorized", "El token no pertenece a esta sala.");
      return {
        playerToken: data.token,
        playerId: existing,
        game: publicGame(stored.game),
      };
    }
    const s = stored.game;
    if (s.status !== "lobby")
      throw new OperationError("conflict", "La partida ya comenzó.");
    if (s.players.length >= 6) throw new OperationError("conflict", "La sala está llena.");
    const color =
      data.color ?? COLORS.find((c) => !s.players.some((p) => p.color === c));
    if (!color || s.players.some((p) => p.color === color))
      throw new OperationError("conflict", "Este color ya está ocupado.");
    const p = newPlayer(deps.platform.uuid(), data.name, color);
    s.players.push(p);
    stored.tokens[deps.platform.digest(token)] = p.id;
    const old = s.version;
    s.version++;
    addLog(s, `${p.name} se unió al viaje.`);
    try {
      await deps.rooms.save(id, old, stored);
      return { playerToken: token, playerId: p.id, game: publicGame(s) };
    } catch (e) {
      if (!(e instanceof OperationError) || e.code !== "conflict" || i === 3) throw e;
    }
  }
  throw new OperationError("conflict", "Intenta unirte nuevamente.");
}
