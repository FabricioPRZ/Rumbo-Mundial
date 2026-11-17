import type { VoiceRepository } from "@/application/ports/voice-repository";
import type { VoiceState } from "@/domain/voice/types";
import { redis } from "./client";
const key = (room: string) => `turista:voice:${room}`;
const CAS = `local old=redis.call('GET',KEYS[1]); local revision=0; if old then revision=cjson.decode(old).revision end; if revision~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',120); return 1`;

export const voiceRepository: VoiceRepository = {
  load: (room) => redis().get<VoiceState>(key(room)),
  save: async (room, revision, state) => await redis().eval(CAS, [key(room)], [revision, JSON.stringify(state)]) === 1,
};
