import { MOVE_SETTLE_MS, MOVE_STEP_MS, eventDuration } from "../../domain/game/presentation";
import type { Game, GameEvent } from "../../domain/game/types";

export interface PlaybackView {
  serial: number;
  positions: Record<string, number>;
  event: GameEvent | null;
  lastRoll: GameEvent | null;
  busy: boolean;
}

// Una sola cola dirige dados, recorridos y avisos; las reglas siguen en el servidor.
export class GamePlayback {
  private latest: Game;
  private seen: number;
  private queue: GameEvent[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private visible = true;
  private disposed = false;
  private view: PlaybackView;

  constructor(game: Game, private readonly publish: (view: PlaybackView) => void, private reduced = false) {
    this.latest = game;
    this.seen = game.eventSerial ?? 0;
    this.view = { serial: this.seen, positions: this.snapshot(), event: null, lastRoll: this.findLastRoll(), busy: false };
    this.emit();
  }

  private snapshot() {
    return Object.fromEntries(this.latest.players.map((player) => [player.id, player.position]));
  }

  private findLastRoll() {
    return [...(this.latest.events ?? [])].reverse().find((event) => event.type === "roll") ?? null;
  }

  private emit() {
    if (!this.disposed) this.publish({ ...this.view, positions: { ...this.view.positions } });
  }

  private clearTimer() {
    if (this.timer !== null) clearTimeout(this.timer);
    this.timer = null;
  }

  private sync() {
    this.clearTimer();
    this.queue = [];
    this.view = { serial: this.seen, positions: this.snapshot(), event: null, lastRoll: this.findLastRoll(), busy: false };
    this.emit();
  }

  update(game: Game) {
    if (this.disposed) return;
    if (game.id === this.latest.id && game.version < this.latest.version) return;
    const newRoom = game.id !== this.latest.id;
    this.latest = game;
    const events = game.events ?? [];
    const gap = events.length > 0 && events[0].id > this.seen + 1;
    const fresh = events.filter((event) => event.id > this.seen);
    this.seen = game.eventSerial ?? this.seen;
    this.view.serial = this.seen;
    if (newRoom || gap || !this.visible || game.status === "lobby") {
      this.sync();
      return;
    }
    this.queue.push(...fresh);
    if (!this.view.busy) this.next();
  }

  private next = () => {
    this.clearTimer();
    if (this.disposed) return;
    const event = this.queue.shift();
    if (!event) {
      this.view = { ...this.view, positions: this.snapshot(), event: null, busy: false };
      this.emit();
      return;
    }
    this.view = { ...this.view, event, busy: true };
    if (event.type === "roll") this.view.lastRoll = event;
    if (event.type === "move" && event.player && event.path?.length) {
      const player = event.player;
      const path = event.path;
      if (event.from !== undefined) this.view.positions[player] = event.from;
      this.emit();
      let step = 0;
      const advance = () => {
        this.view.positions[player] = path[step++];
        this.emit();
        this.timer = setTimeout(step < path.length ? advance : this.next, step < path.length ? MOVE_STEP_MS : MOVE_SETTLE_MS);
      };
      if (this.reduced || event.teleport) {
        this.view.positions[player] = path[path.length - 1];
        this.emit();
        this.timer = setTimeout(this.next, this.reduced ? 0 : MOVE_SETTLE_MS);
      } else this.timer = setTimeout(advance, MOVE_STEP_MS);
      return;
    }
    this.emit();
    const duration = this.reduced && event.type === "roll" ? 900 : eventDuration(event);
    this.timer = setTimeout(this.next, duration);
  };

  setVisible(visible: boolean) {
    this.visible = visible;
    if (!visible) this.sync();
  }

  setReducedMotion(reduced: boolean) { this.reduced = reduced; }

  dispose() {
    this.disposed = true;
    this.clearTimer();
    this.queue = [];
  }
}
