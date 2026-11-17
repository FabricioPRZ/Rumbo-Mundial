import type { VoiceCommand, VoiceMember, VoiceSignal, VoiceView } from "../../domain/voice/types";

export interface VoiceClientView {
  phase: "off" | "joining" | "joined";
  members: VoiceMember[];
  connections: Record<string, "connecting" | "connected" | "failed">;
  error: string;
  playbackBlocked: boolean;
}
export const EMPTY_VOICE: VoiceClientView = { phase: "off", members: [], connections: {}, error: "", playbackBlocked: false };
interface Peer {
  pc: RTCPeerConnection;
  audio: HTMLAudioElement;
  session: string;
  connection: string;
  pending: boolean;
  answered: boolean;
  started: number;
}

class VoiceRequestError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

export function microphoneError(error: unknown): string {
  if (error instanceof Error) {
    if (error.name === "NotAllowedError" || error.name === "SecurityError") return "Permite el micrófono en los ajustes de este sitio y vuelve a intentarlo.";
    if (error.name === "NotFoundError") return "No se encontró un micrófono conectado.";
    if (error.name === "NotReadableError") return "Otra aplicación está usando el micrófono o no se puede abrir.";
    return error.message;
  }
  return "No se pudo iniciar el micrófono.";
}

// SDP con los candidatos ICE completos: el audio nunca pasa por estas peticiones.
export function gatherIce(pc: RTCPeerConnection, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted || pc.signalingState === "closed") { reject(new Error("Conexión cancelada.")); return; }
    if (pc.iceGatheringState === "complete") { resolve(); return; }
    const finish = () => { cleanup(); resolve(); };
    const cancel = () => { cleanup(); reject(new Error("Conexión cancelada.")); };
    const check = () => { if (pc.iceGatheringState === "complete") finish(); };
    const closed = () => { if (pc.signalingState === "closed") cancel(); };
    const timer = setTimeout(finish, 8000);
    const cleanup = () => {
      clearTimeout(timer);
      pc.removeEventListener("icegatheringstatechange", check);
      pc.removeEventListener("signalingstatechange", closed);
      signal.removeEventListener("abort", cancel);
    };
    pc.addEventListener("icegatheringstatechange", check);
    pc.addEventListener("signalingstatechange", closed);
    signal.addEventListener("abort", cancel, { once: true });
    check();
  });
}

export class VoiceClient {
  readonly session = crypto.randomUUID();
  private stream: MediaStream | null = null;
  private peers = new Map<string, Peer>();
  private state: VoiceClientView = { ...EMPTY_VOICE, connections: {} };
  private controller = new AbortController();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private heartbeat = 0;
  private disposed = false;
  private micMuted = false;
  private masterMuted = false;
  private iceServers: RTCIceServer[] = [];

  constructor(private readonly room: string, private readonly token: string, private readonly playerId: string,
    private readonly publish: (view: VoiceClientView) => void, private volume = 0.8) {}

  private emit() {
    if (!this.disposed) this.publish({ ...this.state, connections: { ...this.state.connections } });
  }

  private async request(command?: VoiceCommand): Promise<VoiceView> {
    const controller = new AbortController();
    const abort = () => controller.abort();
    this.controller.signal.addEventListener("abort", abort, { once: true });
    if (this.controller.signal.aborted) controller.abort();
    const timeout = setTimeout(abort, 12000);
    try {
      const response = await fetch(`/api/rooms/${this.room}/voice${command ? "" : `?session=${this.session}`}`, {
        method: command ? "POST" : "GET", cache: "no-store", signal: controller.signal,
        headers: { Authorization: `Bearer ${this.token}`, ...(command ? { "Content-Type": "application/json" } : {}) },
        body: command ? JSON.stringify(command) : undefined,
      });
      const data = await response.json();
      if (!response.ok) throw new VoiceRequestError(data.error ?? "No se pudo sincronizar la voz.", response.status);
      return data;
    } finally {
      clearTimeout(timeout);
      this.controller.signal.removeEventListener("abort", abort);
    }
  }

  async join() {
    this.state.phase = "joining";this.emit();
    try {
      if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === "undefined") throw new Error("La voz necesita un navegador compatible y una conexión HTTPS.");
      const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      if (this.disposed) { stream.getTracks().forEach((track) => track.stop()); return; }
      this.stream = stream;
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !this.micMuted && !this.masterMuted;
        track.onended = () => this.fail("El micrófono se desconectó. Vuelve a activar la voz.");
      });
      const view = await this.request({ type: "join", session: this.session, muted: this.micMuted || this.masterMuted });
      if (this.disposed) return;
      this.state.phase = "joined";this.heartbeat = Date.now();
      this.apply(view);this.poll();
    } catch (error) {
      if (!this.disposed) this.fail(microphoneError(error));
    }
  }

  private poll = () => {
    if (this.disposed) return;
    this.timer = setTimeout(async () => {
      try {
        const pulse = Date.now() - this.heartbeat >= 10000;
        const view = await this.request(pulse ? { type: "heartbeat", session: this.session, muted: this.micMuted || this.masterMuted } : undefined);
        if (this.disposed) return;
        if (pulse) this.heartbeat = Date.now();
        this.state.error = "";this.apply(view);
      } catch (error) {
        if (this.disposed) return;
        if (error instanceof VoiceRequestError && [401, 403, 404, 409, 410].includes(error.status)) { this.fail(error.message); return; }
        this.state.error = "Reconectando la señal de voz…";this.emit();
      }
      this.poll();
    }, 1000);
  };

  private apply(view: VoiceView) {
    if (view.replaced) { this.fail("Tu sesión de voz venció o se abrió en otra pestaña. Vuelve a conectarte."); return; }
    this.iceServers = view.iceServers;
    this.state.members = view.members;
    for (const [id, peer] of this.peers) {
      if (!view.members.some((member) => member.playerId === id && member.session === peer.session)) this.removePeer(id);
    }
    for (const member of view.members) {
      if (member.playerId === this.playerId) continue;
      if (this.playerId < member.playerId && !this.peers.has(member.playerId)) {
        const peer = this.createPeer(member, crypto.randomUUID());
        this.negotiate(member.playerId, peer);
      }
      const peer = this.peers.get(member.playerId);
      if (peer && peer.pc.connectionState !== "connected" && Date.now() - peer.started > 30000) this.state.connections[member.playerId] = "failed";
    }
    for (const signal of view.signals) {
      const member = view.members.find((m) => m.playerId === signal.from && m.session === signal.fromSession);
      if (!member) continue;
      let peer = this.peers.get(signal.from);
      if (signal.description.type === "offer") {
        if (peer?.connection === signal.connection) continue;
        if (peer) this.removePeer(signal.from);
        peer = this.createPeer(member, signal.connection);
        this.negotiate(signal.from, peer, signal);
      } else if (peer?.connection === signal.connection && !peer.pending && !peer.answered) {
        const receivingPeer = peer;
        receivingPeer.pending = true;
        void receivingPeer.pc.setRemoteDescription(signal.description).then(() => { receivingPeer.answered = true; }).catch(() => this.peerFailed(signal.from, receivingPeer))
          .finally(() => { receivingPeer.pending = false; });
      }
    }
    this.emit();
  }

  private createPeer(member: VoiceMember, connection: string): Peer {
    const pc = new RTCPeerConnection({ iceServers: this.iceServers });
    const audio = new Audio();audio.autoplay = true;audio.setAttribute("playsinline", "");
    audio.volume = this.volume;audio.muted = this.masterMuted;
    const peer: Peer = { pc, audio, session: member.session, connection, pending: false, answered: false, started: Date.now() };
    this.peers.set(member.playerId, peer);
    this.state.connections[member.playerId] = "connecting";
    this.stream?.getAudioTracks().forEach((track) => pc.addTrack(track, this.stream!));
    pc.ontrack = (event) => {
      if (this.disposed || event.track.kind !== "audio") return;
      audio.srcObject = event.streams[0] ?? new MediaStream([event.track]);
      void audio.play().catch(() => { if (!this.disposed) { this.state.playbackBlocked = true;this.emit(); } });
    };
    pc.onconnectionstatechange = () => {
      if (this.disposed || this.peers.get(member.playerId) !== peer) return;
      this.state.connections[member.playerId] = pc.connectionState === "connected" ? "connected" : pc.connectionState === "failed" ? "failed" : "connecting";
      this.emit();
    };
    return peer;
  }

  private negotiate(id: string, peer: Peer, offer?: VoiceSignal) {
    peer.pending = true;
    void (async () => {
      if (offer) await peer.pc.setRemoteDescription(offer.description);
      await peer.pc.setLocalDescription(offer ? await peer.pc.createAnswer() : await peer.pc.createOffer());
      await gatherIce(peer.pc, this.controller.signal);
      if (this.disposed || this.peers.get(id) !== peer) return;
      const sdp = peer.pc.localDescription?.sdp;
      if (!sdp) throw new Error("No se pudo preparar el audio.");
      await this.request({ type: "signal", session: this.session, to: id, toSession: peer.session, connection: peer.connection,
        description: { type: offer ? "answer" : "offer", sdp } });
    })().catch(() => this.peerFailed(id, peer)).finally(() => { peer.pending = false; });
  }

  private peerFailed(id: string, peer: Peer) {
    if (!this.disposed && this.peers.get(id) === peer) { this.state.connections[id] = "failed";this.emit(); }
  }

  setMuted(muted: boolean) { this.micMuted = muted;this.applyLevels(); }
  setMasterMuted(muted: boolean) { this.masterMuted = muted;this.applyLevels(); }
  setVolume(volume: number) { this.volume = Math.min(1, Math.max(0, volume));this.applyLevels(); }
  private applyLevels() {
    this.stream?.getAudioTracks().forEach((track) => { track.enabled = !this.micMuted && !this.masterMuted; });
    this.peers.forEach(({ audio }) => { audio.volume = this.volume;audio.muted = this.masterMuted; });
    // El siguiente polling publica el nuevo estado del micrófono.
    this.heartbeat = 0;
  }

  async resumePlayback() {
    const results = await Promise.allSettled([...this.peers.values()].filter((peer) => peer.audio.srcObject).map((peer) => peer.audio.play()));
    if (this.disposed) return;
    this.state.playbackBlocked = results.some((result) => result.status === "rejected");this.emit();
  }

  private removePeer(id: string) {
    const peer = this.peers.get(id);
    if (peer) {
      peer.pc.ontrack = null;peer.pc.onconnectionstatechange = null;
      peer.pc.close();peer.audio.pause();peer.audio.srcObject = null;
      this.peers.delete(id);delete this.state.connections[id];
    }
  }

  private fail(message: string) {
    this.state = { ...EMPTY_VOICE, error: message };this.emit();this.dispose();
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;this.controller.abort();
    if (this.timer) clearTimeout(this.timer);
    this.stream?.getTracks().forEach((track) => { track.onended = null;track.stop(); });
    this.stream = null;
    for (const id of this.peers.keys()) this.removePeer(id);
    void fetch(`/api/rooms/${this.room}/voice`, { method: "POST", keepalive: true,
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ type: "leave", session: this.session }),
    }).catch(() => {});
  }
}
