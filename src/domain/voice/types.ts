export interface IceServer { urls: string | string[]; username?: string; credential?: string; }
export interface VoiceMember {
  playerId: string;
  session: string;
  muted: boolean;
  seen: number;
}
export interface VoiceSignal {
  from: string;
  fromSession: string;
  to: string;
  toSession: string;
  connection: string;
  description: { type: "offer" | "answer"; sdp: string };
  at: number;
}
export interface VoiceState {
  revision: number;
  members: Record<string, VoiceMember>;
  signals: VoiceSignal[];
}
export interface VoiceView {
  members: VoiceMember[];
  signals: VoiceSignal[];
  replaced: boolean;
  iceServers: IceServer[];
}
export type VoiceCommand =
  | { type: "join"; session: string; muted: boolean }
  | { type: "heartbeat"; session: string; muted: boolean }
  | { type: "leave"; session: string }
  | { type: "signal"; session: string; to: string; toSession: string; connection: string; description: VoiceSignal["description"] };

export const VOICE_PRESENCE_MS = 45_000;
