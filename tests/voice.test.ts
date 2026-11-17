import { beforeEach, expect, it } from "vitest";
import { applyVoice, cleanVoice } from "../src/domain/voice/rules";
import { voiceCommand } from "../src/server/http/voice-schemas";
import { getVoice as get } from "../src/application/voice/get-voice";
import { updateVoice as update } from "../src/application/voice/update-voice";
import type { VoiceDependencies } from "../src/application/voice/contracts";
import type { VoiceCommand } from "../src/domain/voice/types";
import { newGame, newPlayer } from "../src/domain/game/factory";
import type { VoiceState } from "../src/domain/voice/types";

const a = "00000000-0000-4000-8000-000000000001";
const b = "00000000-0000-4000-8000-000000000002";
const c = "00000000-0000-4000-8000-000000000003";
const sa = "10000000-0000-4000-8000-000000000001";
const sb = "10000000-0000-4000-8000-000000000002";
const connection = "20000000-0000-4000-8000-000000000001";
const sdp = "v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n";
const blank = (): VoiceState => ({ revision: 0, members: {}, signals: [] });
function joined() {
  return applyVoice(applyVoice(blank(), { type: "join", session: sa, muted: false }, a, [a, b, c], 1000), { type: "join", session: sb, muted: false }, b, [a, b, c], 1000);
}
const offer = { type: "signal" as const, session: sa, to: b, toSession: sb, connection, description: { type: "offer" as const, sdp } };
// Injected repository and clock: no environment variables, network or module mocks.
const values = new Map<string, VoiceState>();
const roomGame = newGame("ABC234", newPlayer(a, "Ana", "#a00"), 0);
roomGame.players.push(newPlayer(b, "Luis", "#0a0"), newPlayer(c, "Sol", "#00a"));
const deps: VoiceDependencies = {
  rooms: {
    platform: { now: () => 1000, uuid: () => connection, digest: (token) => token, randomInt: () => 0 },
    rooms: {
      load: async () => ({ game: structuredClone(roomGame), tokens: { [a]: a, [b]: b, [c]: c }, receipts: {} }),
      create: async () => { throw new Error("Unexpected create"); },
      save: async () => { throw new Error("Unexpected game mutation"); },
      markSeen: async () => {}, lastSeen: async () => null,
    },
  },
  voice: {
    load: async (room) => structuredClone(values.get(room) ?? null),
    save: async (room, version, state) => {
      if ((values.get(room)?.revision ?? 0) !== version) return false;
      values.set(room, structuredClone(state)); return true;
    },
  },
  iceServers: () => [{ urls: "stun:stun.cloudflare.com:3478" }],
  retry: async () => {},
};
const getVoice = (room: string, token: string, session: string) => get(deps, room, token, session);
const updateVoice = (room: string, token: string, command: VoiceCommand) => update(deps, room, token, command);
beforeEach(() => values.clear());

it("admite solo audio y rechaza video, datos y SDP excesivo", () => {
  expect(voiceCommand.safeParse(offer).success).toBe(true);
  expect(voiceCommand.safeParse({ ...offer, description: { type: "offer", sdp: sdp + "m=video 9 UDP/TLS/RTP/SAVPF 96\r\n" } }).success).toBe(false);
  expect(voiceCommand.safeParse({ ...offer, description: { type: "offer", sdp: sdp + "x".repeat(12000) } }).success).toBe(false);
});

it("señales exigen participación, sesión vigente y destinatario de la misma sala", () => {
  const s = joined();
  expect(() => applyVoice(s, { ...offer, session: sb }, a, [a, b], 1000)).toThrow(/venció/);
  expect(() => applyVoice(s, { ...offer, to: c }, a, [a, b], 1000)).toThrow(/viajero/);
  expect(() => applyVoice(s, { ...offer, toSession: sa }, a, [a, b], 1000)).toThrow(/viajero/);
  expect(() => applyVoice(s, { ...offer, to: a }, a, [a, b], 1000)).toThrow(/viajero/);
});

it("una respuesta necesita una oferta vigente y el orden evita ofertas simultáneas", () => {
  const answer = { ...offer, session: sb, to: a, toSession: sa, description: { type: "answer" as const, sdp } };
  expect(() => applyVoice(joined(), answer, b, [a, b], 1000)).toThrow(/cambió/);
  expect(() => applyVoice(joined(), { ...answer, description: { type: "offer", sdp } }, b, [a, b], 1000)).toThrow(/Orden/);
  const proposed = applyVoice(joined(), offer, a, [a, b], 1000);
  const answered = applyVoice(proposed, answer, b, [a, b], 1000);
  expect(answered.signals).toHaveLength(2);
  expect(applyVoice(answered, offer, a, [a, b], 1001).signals).toHaveLength(2);
});

it("salir desde una pestaña vieja no expulsa la sesión nueva ni conserva señales viejas", () => {
  let s = applyVoice(joined(), offer, a, [a, b], 1000);
  s = applyVoice(s, { type: "join", session: connection, muted: false }, a, [a, b], 1001);
  expect(s.signals).toHaveLength(0);
  s = applyVoice(s, { type: "leave", session: sa }, a, [a, b], 1002);
  expect(s.members[a].session).toBe(connection);
});

it("presencia y señales expiran sin almacenar grabaciones", () => {
  const s = applyVoice(joined(), offer, a, [a, b], 1000);
  const expired = cleanVoice(s, [a, b], 46000);
  expect(expired.members).toEqual({});expect(expired.signals).toEqual([]);
  expect(s.members[a]).toBeDefined();
});

it("altas concurrentes no pierden participantes y solo el destinatario recibe SDP", async () => {
  await Promise.all([
    updateVoice("ABC234", a, { type: "join", session: sa, muted: false }),
    updateVoice("ABC234", b, { type: "join", session: sb, muted: false }),
  ]);
  await updateVoice("ABC234", a, offer);
  const receiver = await getVoice("ABC234", b, sb);
  expect(receiver.members).toHaveLength(2);expect(receiver.signals).toHaveLength(1);
  expect((await getVoice("ABC234", a, sa)).signals).toHaveLength(0);
  expect((await getVoice("ABC234", c, connection)).signals).toHaveLength(0);
  expect(receiver.iceServers[0].urls).toBe("stun:stun.cloudflare.com:3478");
  expect(values.get("ABC234")?.revision).toBe(3);
});

it("tokens inválidos no pueden leer ni modificar voz", async () => {
  await expect(getVoice("ABC234", "inventado", sa)).rejects.toThrow(/token/);
  await expect(updateVoice("ABC234", "inventado", { type: "join", session: sa, muted: false })).rejects.toThrow(/token/);
  expect(values.size).toBe(0);
});
