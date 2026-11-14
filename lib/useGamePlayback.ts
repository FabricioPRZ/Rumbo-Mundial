"use client";

import { useEffect, useRef, useState } from "react";
import { GamePlayback, type PlaybackView } from "./game/playback";
import type { Game } from "./game/types";

export function useGamePlayback(game: Game | null) {
  const controller = useRef<GamePlayback | null>(null);
  const [view, setView] = useState<PlaybackView>({ serial: 0, positions: {}, event: null, lastRoll: null, busy: false });

  useEffect(() => {
    if (!game) return;
    if (!controller.current) {
      controller.current = new GamePlayback(game, setView, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      controller.current.setVisible(!document.hidden);
    } else controller.current.update(game);
  }, [game]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = () => controller.current?.setReducedMotion(motion.matches);
    const visible = () => controller.current?.setVisible(!document.hidden);
    motion.addEventListener("change", reduced);
    document.addEventListener("visibilitychange", visible);
    return () => {
      controller.current?.dispose();
      controller.current = null;
      motion.removeEventListener("change", reduced);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);

  // Oculta decisiones desde el primer render de una actualización, antes del efecto.
  return { ...view, busy: view.busy || (game?.eventSerial ?? 0) > view.serial };
}
