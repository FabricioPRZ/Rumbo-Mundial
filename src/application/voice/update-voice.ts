import { OperationError } from "@/domain/shared/errors";
import { applyVoice } from "@/domain/voice/rules";
import type { VoiceCommand, VoiceState } from "@/domain/voice/types";
import { roomIdentity } from "../rooms/identity";
import type { VoiceDependencies } from "./contracts";
import { voiceView } from "./view";
export async function updateVoice(deps: VoiceDependencies, room: string, token: string, command: VoiceCommand) {
  const identity = await roomIdentity(deps.rooms, room, token);
  for (let attempt = 0; attempt < 12; attempt++) {
    const old: VoiceState = await deps.voice.load(room) ?? { revision: 0, members: {}, signals: [] };
    const next = applyVoice(old, command, identity.playerId, identity.players, deps.rooms.platform.now());
    if (await deps.voice.save(room, old.revision, next)) return voiceView(next, identity.playerId, command.session, deps.iceServers());
    await deps.retry();
  }
  throw new OperationError("conflict", "La voz está conectando a otros viajeros. Intenta de nuevo.");
}
