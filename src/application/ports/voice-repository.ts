import type { VoiceState } from "@/domain/voice/types";
export interface VoiceRepository {
  load(room: string): Promise<VoiceState | null>;
  save(room: string, expectedRevision: number, state: VoiceState): Promise<boolean>;
}
