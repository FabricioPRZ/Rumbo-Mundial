import { z } from "zod";
import { HttpError, redis, roomIdentity } from "../store";
import { VOICE_PRESENCE_MS, type VoiceCommand, type VoiceState, type VoiceView } from "./types";

const session = z.string().uuid();
export const voiceCommand = z.discriminatedUnion("type", [
  z.object({ type: z.literal("join"), session, muted: z.boolean() }),
  z.object({ type: z.literal("heartbeat"), session, muted: z.boolean() }),
  z.object({ type: z.literal("leave"), session }),
  z.object({ type: z.literal("signal"), session, to: session, toSession: session, connection: session,
    description: z.object({ type: z.enum(["offer", "answer"]), sdp: z.string().min(10).max(12000)
      .refine((value) => value.startsWith("v=0") && /(?:^|\r?\n)m=audio /.test(value) && !/(?:^|\r?\n)m=(?:video|application) /.test(value), "Solo audio.") }),
  }),
]);

const key = (room: string) => `turista:voice:${room}`;
// CAS independiente del juego: las señales nunca cambian dinero, turnos o version.
const CAS = `local old=redis.call('GET',KEYS[1]); local revision=0; if old then revision=cjson.decode(old).revision end; if revision~=tonumber(ARGV[1]) then return 0 end; redis.call('SET',KEYS[1],ARGV[2],'EX',120); return 1`;

export function cleanVoice(state: VoiceState, players: string[], now: number): VoiceState {
  const next = structuredClone(state);
  next.members = Object.fromEntries(Object.entries(next.members).filter(([id, member]) => players.includes(id) && member.seen > now - VOICE_PRESENCE_MS));
  next.signals = next.signals.filter((signal) => signal.at > now - VOICE_PRESENCE_MS &&
    next.members[signal.from]?.session === signal.fromSession && next.members[signal.to]?.session === signal.toSession);
  return next;
}

export function applyVoice(state: VoiceState, command: VoiceCommand, playerId: string, players: string[], now: number): VoiceState {
  const next = cleanVoice(state, players, now);
  if (!players.includes(playerId)) throw new HttpError(403, "No perteneces a esta sala.");
  if (command.type === "join") {
    next.members[playerId] = { playerId, session: command.session, muted: command.muted, seen: now };
  } else if (command.type === "leave") {
    // Un cierre tardío de otra pestaña no puede expulsar la sesión nueva.
    if (next.members[playerId]?.session === command.session) delete next.members[playerId];
  } else {
    if (next.members[playerId]?.session !== command.session) throw new HttpError(409, "La conexión de voz venció o se abrió en otra pestaña. Vuelve a conectarte.");
    if (command.type === "heartbeat") {
      next.members[playerId].seen = now;
      next.members[playerId].muted = command.muted;
    } else {
      if (command.to === playerId || !players.includes(command.to) || next.members[command.to]?.session !== command.toSession) {
        throw new HttpError(409, "Ese viajero ya no está conectado a la voz.");
      }
      const offer = command.description.type === "offer";
      if ((offer && playerId > command.to) || (!offer && playerId < command.to)) throw new HttpError(400, "Orden de negociación inválido.");
      const existingOffer = next.signals.find((signal) => signal.description.type === "offer" && signal.from === command.to && signal.to === playerId && signal.connection === command.connection);
      if (!offer && !existingOffer) throw new HttpError(409, "La llamada cambió. Reconecta la voz.");
      const duplicate = next.signals.some((signal) => signal.from === playerId && signal.to === command.to && signal.connection === command.connection && signal.description.type === command.description.type);
      if (!duplicate) {
        next.signals = next.signals.filter((signal) => offer
          ? !((signal.from === playerId && signal.to === command.to) || (signal.to === playerId && signal.from === command.to))
          : !(signal.from === playerId && signal.to === command.to));
        next.signals.push({ from: playerId, fromSession: command.session, to: command.to, toSession: command.toSession, connection: command.connection, description: command.description, at: now });
      }
    }
  }
  const cleaned = cleanVoice(next, players, now);
  cleaned.revision = state.revision + 1;
  return cleaned;
}

function iceServers(): RTCIceServer[] {
  const servers: RTCIceServer[] = [{ urls: "stun:stun.cloudflare.com:3478" }];
  const urls = (process.env.VOICE_TURN_URLS ?? "").split(",").map((url) => url.trim()).filter((url) => /^turns?:[^\s]+$/.test(url));
  if (urls.length && process.env.VOICE_TURN_USERNAME && process.env.VOICE_TURN_CREDENTIAL) {
    servers.push({ urls, username: process.env.VOICE_TURN_USERNAME, credential: process.env.VOICE_TURN_CREDENTIAL });
  }
  return servers;
}

function view(state: VoiceState, playerId: string, ownSession: string): VoiceView {
  return { members: Object.values(state.members), replaced: state.members[playerId]?.session !== ownSession,
    signals: state.signals.filter((signal) => signal.to === playerId && signal.toSession === ownSession), iceServers: iceServers() };
}

export async function getVoice(room: string, token: string, ownSession: string) {
  session.parse(ownSession);
  const identity = await roomIdentity(room, token);
  const state = await redis().get<VoiceState>(key(room)) ?? { revision: 0, members: {}, signals: [] };
  return view(cleanVoice(state, identity.players, Date.now()), identity.playerId, ownSession);
}

export async function updateVoice(room: string, token: string, input: unknown) {
  const command = voiceCommand.parse(input);
  const identity = await roomIdentity(room, token);
  for (let attempt = 0; attempt < 12; attempt++) {
    const old = await redis().get<VoiceState>(key(room)) ?? { revision: 0, members: {}, signals: [] };
    const next = applyVoice(old, command, identity.playerId, identity.players, Date.now());
    const saved = await redis().eval(CAS, [key(room)], [old.revision, JSON.stringify(next)]);
    if (saved === 1) return view(next, identity.playerId, command.session);
    // Evita que los quince enlaces de una sala de seis entren en la misma carrera.
    await new Promise((resolve) => setTimeout(resolve, 15 + Math.floor(Math.random() * 45)));
  }
  throw new HttpError(409, "La voz está conectando a otros viajeros. Intenta de nuevo.");
}
