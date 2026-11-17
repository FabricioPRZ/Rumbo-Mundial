import type { RoomDependencies } from "@/application/rooms/contracts";
import type { VoiceDependencies } from "@/application/voice/contracts";
import { iceServers } from "@/infrastructure/config/voice";
import { roomRepository } from "@/infrastructure/redis/room-repository";
import { voiceRepository } from "@/infrastructure/redis/voice-repository";
import { platform } from "@/infrastructure/security/platform";
// Solo adaptadores sin estado: cada operación lee/escribe Redis.
export const roomDependencies: RoomDependencies = { rooms: roomRepository, platform };
export const voiceDependencies: VoiceDependencies = {
  rooms: roomDependencies, voice: voiceRepository, iceServers,
  retry: () => new Promise((resolve) => setTimeout(resolve, 15 + platform.randomInt(45))),
};
