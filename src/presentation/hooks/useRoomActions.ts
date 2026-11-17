"use client";
import type { Action, Game } from "@/domain/game/types";
import { useState } from "react";
import { paymentQuote } from "../services/payment-quote";

export function useRoomActions(game: Game | null, playerId: string | null, animating: boolean, commit: (action: Action) => Promise<boolean>) {
  const [payment, setPayment] = useState<{ action: Action; amount: number; label: string } | null>(null);
  const send = async (action: Action): Promise<boolean> => {
    if (animating || !game || !playerId) return false;
    const quote = paymentQuote(game, playerId, action);
    if (quote) { setPayment({ action, ...quote }); return false; }
    return commit(action);
  };
  return { send, payment, closePayment: () => setPayment(null) };
}
