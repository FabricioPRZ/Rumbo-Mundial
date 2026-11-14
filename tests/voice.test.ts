import { beforeEach, expect, it, vi } from "vitest";
import { applyVoice, cleanVoice, getVoice, updateVoice, voiceCommand } from "../lib/voice/store";
import type { VoiceState } from "../lib/voice/types";

const mock = vi.hoisted(() => ({ values: new Map<string, string>(), identity: vi.fn() }));
vi.mock("../lib/store", () => ({
  HttpError: class extends Error { constructor(readonly status: number, message: string) { super(message); } },
  roomIdentity: mock.identity,
  redis: () => ({
    get: async (key: string) => mock.values.has(key) ? JSON.parse(mock.values.get(key)!) : null,
    eval: async (_script: string, keys: string[], args: (number | string)[]) => {
      const old = mock.values.has(keys[0]) ? JSON.parse(mock.values.get(keys[0])!) : { revision: 0 };
      if (old.revision !== args[0]) return 0;
      mock.values.set(keys[0], String(args[1]));return 1;
    },
  }),
}));

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
beforeEach(() => {
  mock.values.clear();mock.identity.mockReset();
  mock.identity.mockImplementation(async (_room: string, token: string) => {
    if (![a, b, c].includes(token)) throw new Error("Token inválido");
    return { playerId: token, players: [a, b, c] };
  });
});

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
  expect([...mock.values.keys()]).toEqual(["turista:voice:ABC234"]);
});

it("tokens inválidos no pueden leer ni modificar voz", async () => {
  await expect(getVoice("ABC234", "inventado", sa)).rejects.toThrow(/Token/);
  await expect(updateVoice("ABC234", "inventado", { type: "join", session: sa, muted: false })).rejects.toThrow(/Token/);
  expect(mock.values.size).toBe(0);
});
