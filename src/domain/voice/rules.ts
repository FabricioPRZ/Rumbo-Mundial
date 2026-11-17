import { OperationError } from "../shared/errors";
import { VOICE_PRESENCE_MS, type VoiceCommand, type VoiceState } from "./types";
export function cleanVoice(state: VoiceState, players: string[], now: number): VoiceState {
  const next = structuredClone(state);
  next.members = Object.fromEntries(Object.entries(next.members).filter(([id, member]) => players.includes(id) && member.seen > now - VOICE_PRESENCE_MS));
  next.signals = next.signals.filter((signal) => signal.at > now - VOICE_PRESENCE_MS &&
    next.members[signal.from]?.session === signal.fromSession && next.members[signal.to]?.session === signal.toSession);
  return next;
}

export function applyVoice(state: VoiceState, command: VoiceCommand, playerId: string, players: string[], now: number): VoiceState {
  const next = cleanVoice(state, players, now);
  if (!players.includes(playerId)) throw new OperationError("forbidden", "No perteneces a esta sala.");
  if (command.type === "join") {
    next.members[playerId] = { playerId, session: command.session, muted: command.muted, seen: now };
  } else if (command.type === "leave") {
    // Un cierre tardío de otra pestaña no puede expulsar la sesión nueva.
    if (next.members[playerId]?.session === command.session) delete next.members[playerId];
  } else {
    if (next.members[playerId]?.session !== command.session) throw new OperationError("conflict", "La conexión de voz venció o se abrió en otra pestaña. Vuelve a conectarte.");
    if (command.type === "heartbeat") {
      next.members[playerId].seen = now;
      next.members[playerId].muted = command.muted;
    } else {
      if (command.to === playerId || !players.includes(command.to) || next.members[command.to]?.session !== command.toSession) {
        throw new OperationError("conflict", "Ese viajero ya no está conectado a la voz.");
      }
      const offer = command.description.type === "offer";
      if ((offer && playerId > command.to) || (!offer && playerId < command.to)) throw new OperationError("invalid", "Orden de negociación inválido.");
      const existingOffer = next.signals.find((signal) => signal.description.type === "offer" && signal.from === command.to && signal.to === playerId && signal.connection === command.connection);
      if (!offer && !existingOffer) throw new OperationError("conflict", "La llamada cambió. Reconecta la voz.");
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

