export interface AudioPreferences {
  muted: boolean;
  music: number;
  effects: number;
}

export const DEFAULT_AUDIO: AudioPreferences = { muted: true, music: 30, effects: 65 };
export type SoundCue = "roll" | "purchase" | "payment" | "card" | "turn" | "trade" | "victory" | "travel";

export function audioPreferences(value: unknown): AudioPreferences {
  const input = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const volume = (v: unknown, fallback: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.max(0, Math.min(100, v)) : fallback;
  return {
    muted: typeof input.muted === "boolean" ? input.muted : DEFAULT_AUDIO.muted,
    music: volume(input.music, DEFAULT_AUDIO.music),
    effects: volume(input.effects, DEFAULT_AUDIO.effects),
  };
}

// Partitura original: marimba suave, acordes y bajo. No descarga pistas externas.
const CHORDS = [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]];
const MELODY = [
  [76, 0, 79, 76, 74, 0, 72, 0, 0, 76, 79, 0, 81, 79, 76, 0],
  [72, 0, 76, 0, 81, 79, 76, 0, 74, 0, 72, 0, 71, 72, 0, 0],
  [69, 0, 72, 76, 77, 0, 76, 72, 0, 69, 72, 0, 76, 74, 72, 0],
  [71, 0, 74, 79, 0, 77, 74, 0, 71, 74, 0, 72, 0, 0, 0, 0],
];
const frequency = (note: number) => 440 * 2 ** ((note - 69) / 12);

export class GameAudio {
  private readonly music: GainNode;
  private readonly effects: GainNode;
  private preferences = DEFAULT_AUDIO;
  private timer: ReturnType<typeof setInterval> | null = null;
  private notes = new Set<OscillatorNode>();
  private step = 0;
  private nextBeat = 0;
  private visible = true;
  private disposed = false;

  constructor(private readonly context: AudioContext) {
    this.music = context.createGain();
    this.effects = context.createGain();
    this.music.connect(context.destination);
    this.effects.connect(context.destination);
    this.music.gain.value = 0;
    this.effects.gain.value = 0;
  }

  configure(preferences: AudioPreferences) {
    this.preferences = audioPreferences(preferences);
    const { muted, music, effects } = this.preferences;
    this.music.gain.setTargetAtTime(muted ? 0 : (music / 100) ** 2, this.context.currentTime, 0.025);
    this.effects.gain.setTargetAtTime(muted ? 0 : (effects / 100) ** 2, this.context.currentTime, 0.025);
    if (muted) this.pause();
    else if (this.context.state === "running" && this.visible) this.startMusic();
  }

  async unlock() {
    if (this.disposed || this.preferences.muted || !this.visible) return;
    await this.context.resume();
    if (!this.disposed && !this.preferences.muted && this.visible) this.startMusic();
    else if (!this.disposed) this.pause();
  }

  setVisible(visible: boolean) {
    this.visible = visible;
    if (!visible) this.pause();
  }

  private tone(note: number, at: number, duration: number, level: number, bus: GainNode, type: OscillatorType = "sine") {
    const oscillator = this.context.createOscillator();
    const envelope = this.context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency(note);
    envelope.gain.setValueAtTime(0, at);
    envelope.gain.linearRampToValueAtTime(level, at + 0.012);
    envelope.gain.exponentialRampToValueAtTime(0.001, at + duration);
    oscillator.connect(envelope);
    envelope.connect(bus);
    this.notes.add(oscillator);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
      this.notes.delete(oscillator);
    };
    oscillator.start(at);
    oscillator.stop(at + duration + 0.02);
  }

  private startMusic() {
    if (this.timer || this.disposed) return;
    this.nextBeat = this.context.currentTime + 0.05;
    const schedule = () => {
      if (this.context.state !== "running") return;
      if (this.nextBeat < this.context.currentTime) this.nextBeat = this.context.currentTime + 0.03;
      while (this.nextBeat < this.context.currentTime + 0.2) {
        const beat = this.step % 16;
        const bar = Math.floor(this.step / 16) % 4;
        if (this.preferences.music > 0) {
          if (beat % 4 === 0) {
            this.tone(CHORDS[bar][beat === 8 ? 1 : 0], this.nextBeat, 0.5, 0.18, this.music);
            CHORDS[bar].slice(1).forEach((note, i) => this.tone(note + 12, this.nextBeat + i * 0.018, 0.65, 0.035, this.music, "triangle"));
          }
          const melody = MELODY[bar][beat];
          if (melody) this.tone(melody, this.nextBeat, 0.32, 0.13, this.music);
          if (beat % 2) this.tone(90, this.nextBeat, 0.025, 0.025, this.music, "triangle");
        }
        this.step = (this.step + 1) % 64;
        this.nextBeat += 60 / 104 / 2;
      }
    };
    schedule();
    this.timer = setInterval(schedule, 100);
  }

  play(cue: SoundCue) {
    if (this.disposed || this.preferences.muted || !this.visible || !this.preferences.effects || this.context.state !== "running") return;
    const scores: Record<SoundCue, number[]> = {
      roll: [64, 53, 71, 57, 76, 60, 67],
      purchase: [72, 76, 79, 84], payment: [79, 76, 72],
      card: [76, 83, 88], turn: [72, 79], trade: [67, 74, 79, 74],
      victory: [72, 76, 79, 84, 79, 84, 88], travel: [64, 67, 72],
    };
    const start = this.context.currentTime + 0.01;
    scores[cue].forEach((note, i) => this.tone(
      note, start + i * (cue === "roll" ? 0.075 : 0.13),
      cue === "roll" ? 0.055 : 0.25, 0.15, this.effects,
      cue === "roll" ? "triangle" : "sine",
    ));
  }

  private pause() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    for (const note of this.notes) note.stop();
    this.notes.clear();
    if (this.context.state !== "closed") void this.context.suspend().catch(() => {});
  }

  dispose() {
    this.disposed = true;
    this.pause();
    void this.context.close().catch(() => {});
  }
}
