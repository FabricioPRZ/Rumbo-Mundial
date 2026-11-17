import { getVoice as get } from "@/application/voice/get-voice";
import { updateVoice as update } from "@/application/voice/update-voice";
import { voiceDependencies } from "../composition";
import { httpCall } from "./errors";
import { roomId, tokenSchema } from "./room-schemas";
import { voiceCommand } from "./voice-schemas";
export const getVoice = (room: string, token: string, session: string) => httpCall(() => get(voiceDependencies, roomId.parse(room), tokenSchema.parse(token), tokenSchema.parse(session)));
export const updateVoice = (room: string, token: string, input: unknown) => httpCall(() => update(voiceDependencies, roomId.parse(room), tokenSchema.parse(token), voiceCommand.parse(input)));
