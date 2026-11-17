import type { IceServer, VoiceState, VoiceView } from "@/domain/voice/types";
export function voiceView(state: VoiceState, playerId: string, ownSession: string, servers: IceServer[]): VoiceView {
  return { members: Object.values(state.members), replaced: state.members[playerId]?.session !== ownSession,
    signals: state.signals.filter((signal) => signal.to === playerId && signal.toSession === ownSession), iceServers: servers };
}

