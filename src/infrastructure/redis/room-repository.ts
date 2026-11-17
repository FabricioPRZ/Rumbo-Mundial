import type { RoomRepository, StoredRoom } from "@/application/ports/room-repository";
import { OperationError } from "@/domain/shared/errors";
import { redis } from "./client";
const key = (id: string) => `turista:room:${id}`;
const CAS = `local old=redis.call('GET',KEYS[1]); if not old then return -1 end; local parsed=cjson.decode(old); if parsed.game.version~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',86400); return 1`;

export const roomRepository: RoomRepository = {
  load: (id) => redis().get<StoredRoom>(key(id)),
  create: async (id, room) => !!await redis().set(key(id), room, { nx: true, ex: 86400 }),
  async save(id, expectedVersion, room) {
    const result = await redis().eval(CAS, [key(id)], [expectedVersion, JSON.stringify(room)]);
    if (result === -1) throw new OperationError("not_found", "Sala no encontrada.");
    if (result !== 1) throw new OperationError("conflict", "La sala cambió. Actualiza el estado antes de intentar otra vez.");
  },
  markSeen: async (id, playerId, now) => { await redis().set(`turista:seen:${id}:${playerId}`, now, { ex: 86400 }); },
  lastSeen: (id, playerId) => redis().get<number>(`turista:seen:${id}:${playerId}`),
};
