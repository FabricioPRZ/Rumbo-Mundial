import { afterEach, expect, it, vi } from "vitest";
import { gatherIce, microphoneError, VoiceClient, type VoiceClientView } from "../src/infrastructure/browser/voice-client";
import type { VoiceCommand, VoiceMember, VoiceSignal } from "../src/domain/voice/types";

afterEach(() => { vi.unstubAllGlobals();vi.useRealTimers(); });

it("espera los candidatos ICE y libera escuchas y temporizadores al cancelar", async () => {
  vi.useFakeTimers();
  const target = new EventTarget();
  const pc = Object.assign(target, { iceGatheringState: "gathering", signalingState: "stable" });
  const cancel = new AbortController();
  const pending = gatherIce(pc as unknown as RTCPeerConnection, cancel.signal);
  const expected = expect(pending).rejects.toThrow(/cancelada/);
  cancel.abort();await expected;expect(vi.getTimerCount()).toBe(0);
  pc.iceGatheringState = "complete";
  await gatherIce(pc as unknown as RTCPeerConnection, new AbortController().signal);
  expect(vi.getTimerCount()).toBe(0);
});

it("cancelar mientras se pide permiso detiene el micrófono cuando finalmente llega", async () => {
  let allow!: (stream: MediaStream) => void;
  const getUserMedia = vi.fn(() => new Promise<MediaStream>((resolve) => { allow = resolve; }));
  const track = { stop: vi.fn(), enabled: true };
  vi.stubGlobal("navigator", { mediaDevices: { getUserMedia } });
  vi.stubGlobal("RTCPeerConnection", class {});
  const request = vi.fn<typeof fetch>(async () => new Response("{}"));vi.stubGlobal("fetch", request);
  const client = new VoiceClient("ABC234", "token", "a", () => {});
  const pending = client.join();client.dispose();
  allow({ getTracks: () => [track] } as unknown as MediaStream);await pending;
  expect(track.stop).toHaveBeenCalledOnce();
  expect(request).toHaveBeenCalledOnce();
  expect(JSON.parse(request.mock.calls[0][1]?.body as string).type).toBe("leave");
});

it("silenciar corta el envío, salir detiene pistas y no queda polling activo", async () => {
  vi.useFakeTimers();
  const track = { stop: vi.fn(), enabled: true, onended: null };
  const stream = { getAudioTracks: () => [track], getTracks: () => [track] };
  vi.stubGlobal("navigator", { mediaDevices: { getUserMedia: vi.fn(async () => stream) } });
  vi.stubGlobal("RTCPeerConnection", class {});
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true, json: async () => ({ members: [], signals: [], replaced: false, iceServers: [] }) })));
  const frames: VoiceClientView[] = [];
  const client = new VoiceClient("ABC234", "token", "a", (view) => frames.push(view));
  await client.join();expect(frames.at(-1)?.phase).toBe("joined");
  client.setMuted(true);expect(track.enabled).toBe(false);
  client.setMuted(false);expect(track.enabled).toBe(true);
  client.setMasterMuted(true);expect(track.enabled).toBe(false);
  client.dispose();expect(track.stop).toHaveBeenCalledOnce();expect(vi.getTimerCount()).toBe(0);
});

it("denegar permiso deja un error comprensible y no mantiene la captura", async () => {
  const denied = new Error("denied");denied.name = "NotAllowedError";
  expect(microphoneError(denied)).toMatch(/Permite el micrófono/);
  vi.stubGlobal("navigator", { mediaDevices: { getUserMedia: vi.fn(async () => { throw denied; }) } });
  vi.stubGlobal("RTCPeerConnection", class {});
  vi.stubGlobal("fetch", vi.fn(async () => ({ ok: true })));
  const frames: VoiceClientView[] = [];
  const client = new VoiceClient("ABC234", "token", "a", (view) => frames.push(view));
  await client.join();expect(frames.at(-1)).toMatchObject({ phase: "off", error: expect.stringContaining("Permite el micrófono") });
});

it("dos clientes negocian una sola oferta/respuesta y no renegocian por cada polling", async () => {
  vi.useFakeTimers();
  const peers: FakePeer[] = [];
  const sdp = "v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n";
  class FakePeer extends EventTarget {
    iceGatheringState = "complete";
    signalingState = "stable";
    connectionState = "new";
    localDescription: RTCSessionDescriptionInit | null = null;
    remoteDescription: RTCSessionDescriptionInit | null = null;
    onconnectionstatechange: (() => void) | null = null;
    ontrack = null;
    addTrack = vi.fn();
    close = vi.fn(() => { this.signalingState = "closed"; });
    constructor() { super();peers.push(this); }
    async createOffer() { return { type: "offer" as const, sdp }; }
    async createAnswer() { return { type: "answer" as const, sdp }; }
    async setLocalDescription(description: RTCSessionDescriptionInit) { this.localDescription = description; }
    async setRemoteDescription(description: RTCSessionDescriptionInit) { this.remoteDescription = description; }
  }
  class FakeAudio {
    autoplay = false;volume = 1;muted = false;srcObject = null;
    setAttribute() {}
    async play() {}
    pause() {}
  }
  vi.stubGlobal("RTCPeerConnection", FakePeer);vi.stubGlobal("Audio", FakeAudio);
  vi.stubGlobal("navigator", { mediaDevices: { getUserMedia: async () => {
    const track = { enabled: true, stop: vi.fn(), onended: null };
    return { getTracks: () => [track], getAudioTracks: () => [track] };
  } } });
  const members: Record<string, VoiceMember> = {};
  const signals: VoiceSignal[] = [];
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit) => {
    const id = (init.headers as Record<string, string>).Authorization.slice(7);
    const command = init.body ? JSON.parse(init.body as string) as VoiceCommand : null;
    const ownSession = command?.session ?? new URL(url, "https://test.example").searchParams.get("session");
    if (command?.type === "join" || command?.type === "heartbeat") members[id] = { playerId: id, session: command.session, muted: command.muted, seen: Date.now() };
    if (command?.type === "leave") delete members[id];
    if (command?.type === "signal") signals.push({ from: id, fromSession: command.session, to: command.to, toSession: command.toSession, connection: command.connection, description: command.description, at: Date.now() });
    return { ok: true, json: async () => ({ members: Object.values(members), signals: signals.filter((signal) => signal.to === id), replaced: members[id]?.session !== ownSession, iceServers: [] }) };
  }));
  const a = new VoiceClient("ABC234", "a", "a", () => {});
  const b = new VoiceClient("ABC234", "b", "b", () => {});
  await a.join();await b.join();
  await vi.advanceTimersByTimeAsync(5000);
  expect(peers).toHaveLength(2);
  expect(signals.map((signal) => signal.description.type)).toEqual(["offer", "answer"]);
  expect(peers.map((peer) => peer.remoteDescription?.type).sort()).toEqual(["answer", "offer"]);
  expect(peers.every((peer) => peer.addTrack.mock.calls.length === 1)).toBe(true);
  a.dispose();b.dispose();expect(vi.getTimerCount()).toBe(0);
  expect(peers.every((peer) => peer.close.mock.calls.length === 1)).toBe(true);
});
