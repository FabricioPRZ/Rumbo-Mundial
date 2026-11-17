"use client";
import { DENOMINATIONS, totalBills, wallet } from "@/domain/game/money";
import type { Action, Player } from "@/domain/game/types";
import { useState } from "react";
import { Banknote } from "../atoms/Banknote";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Dialog from "../molecules/Dialog";
export default function PaymentModal({
  player,
  amount,
  label,
  action,
  onClose,
  commit,
  error,
  suspended = false,
}: {
  player: Player;
  amount: number;
  label: string;
  action: Action;
  error?: string;
  suspended?: boolean;
  onClose: () => void;
  commit: (a: Action) => Promise<boolean>;
}) {
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const held = wallet(player);
  const total = totalBills(selected);
  return (
    <Dialog aria-label="Selecciona tus billetes" suspended={suspended} onDismiss={onClose}
      
      
      className="trade-modal payment-modal"
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          if (await commit({ ...action, bills: selected })) onClose();
          setBusy(false);
        }}
      >
        <div className="row">
          <h2>Selecciona tus billetes</h2>
          <Button type="button" onClick={onClose} aria-label="Cerrar pago">
            ×
          </Button>
        </div>
        <p>{label}</p>
        {error && <p className="error" role="alert">{error}</p>}
        <p className="balance">Por pagar: ${amount.toLocaleString("es-MX")}</p>
        <small>
          Tu saldo: ${player.money.toLocaleString("es-MX")}. El Banco entrega el
          cambio automáticamente.
        </small>
        <div className="banknotes">
          {DENOMINATIONS.filter((value) => held[value]).map((value) => (
            <div
              key={value}
              className="banknote"
            >
              <Button type="button" className="pick-note" disabled={busy || (selected[value] ?? 0) >= (held[value] ?? 0)} aria-label={`Añadir billete de $${value}`} onClick={() => setSelected({...selected, [value]: Math.min(held[value] ?? 0, (selected[value] ?? 0) + 1)})}><Banknote value={value} /></Button>
              <small>Tienes {held[value] ?? 0}</small>
              <label>
                Cantidad
                <Input
                  type="number"
                  disabled={busy}
                  min="0"
                  max={held[value] ?? 0}
                  value={selected[value] ?? 0}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      [value]: Number(e.target.value),
                    })
                  }
                />
              </label>
              {value > 1 && (
                <Button
                  type="button"
                  disabled={busy || !held[value]}
                  onClick={async () => {
                    setBusy(true);
                    if (await commit({ type: "change", denomination: value }))
                      setSelected({});
                    setBusy(false);
                  }}
                >
                  Cambiar billete
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="row">
          <span>Entregas: ${total.toLocaleString("es-MX")}</span>
          <span>Cambio: ${Math.max(0, total - amount)}</span>
        </div>
        <Button
          type="button"
          onClick={() => {
            let remaining = amount;
            const next: Record<string, number> = {};
            for (const value of DENOMINATIONS) {
              next[value] = Math.min(
                held[value] ?? 0,
                Math.ceil(Math.max(0, remaining) / value),
              );
              remaining -= next[value] * value;
            }
            setSelected(next);
          }}
        >
          Seleccionar por mí
        </Button>
        <Button
          type="submit"
          className="primary"
          disabled={busy || total < amount || player.money < amount}
        >
          {busy ? "Procesando…" : `Pagar $${amount}`}
        </Button>
      </form>
    </Dialog>
  );
}
