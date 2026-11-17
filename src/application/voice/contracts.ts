import type { IceServer } from "@/domain/voice/types";
import type { VoiceRepository } from "../ports/voice-repository";
import type { RoomDependencies } from "../rooms/contracts";
export interface VoiceDependencies {
  rooms: RoomDependencies;
  voice: VoiceRepository;
  iceServers(): IceServer[];
  retry(): Promise<void>;
}
