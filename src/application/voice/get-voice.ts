import { cleanVoice } from "@/domain/voice/rules";
import type { VoiceState } from "@/domain/voice/types";
import { roomIdentity } from "../rooms/identity";
import type { VoiceDependencies } from "./contracts";
import { voiceView } from "./view";
export async function getVoice(deps: VoiceDependencies, room: string, token: string, ownSession: string) {
  const identity = await roomIdentity(deps.rooms, room, token);
  const state: VoiceState = await deps.voice.load(room) ?? { revision: 0, members: {}, signals: [] };
  return voiceView(cleanVoice(state, identity.players, deps.rooms.platform.now()), identity.playerId, ownSession, deps.iceServers());
}
