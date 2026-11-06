"use client";
import { useEffect, useRef, useState } from "react";
import { DENOMINATIONS, totalBills, wallet } from "@/lib/game/money";
import type { Action, Player } from "@/lib/game/types";
export default function PaymentModal({
  player,
  amount,
  label,
  action,
  onClose,
  commit,
}: {
  player: Player;
  amount: number;
  label: string;
  action: Action;
  onClose: () => void;
  commit: (a: Action) => Promise<boolean>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [busy, setBusy] = useState(false);
  const held = wallet(player);
  const total = totalBills(selected);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      onCancel={onClose}
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
          <button type="button" onClick={onClose} aria-label="Cerrar pago">
            ×
          </button>
        </div>
        <p>{label}</p>
        <p className="balance">Por pagar: ${amount.toLocaleString("es-MX")}</p>
        <small>
          Tu saldo: ${player.money.toLocaleString("es-MX")}. El Banco entrega el
          cambio automáticamente.
        </small>
        <div className="banknotes">
          {DENOMINATIONS.map((value, i) => (
            <div
              key={value}
              className="banknote"
              style={{
                borderColor: [
                  "#754c99",
                  "#427f60",
                  "#b07b36",
                  "#397e9e",
                  "#b65155",
                  "#8c7851",
                  "#6b7280",
                ][i],
              }}
            >
              <strong>${value}</strong>
              <small>Tienes {held[value] ?? 0}</small>
              <label>
                Cantidad
                <input
                  type="number"
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
                <button
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
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="row">
          <span>Entregas: ${total}</span>
          <span>Cambio: ${Math.max(0, total - amount)}</span>
        </div>
        <button
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
        </button>
        <button
          className="primary"
          disabled={busy || total < amount || player.money < amount}
        >
          {busy ? "Procesando…" : `Pagar $${amount}`}
        </button>
      </form>
    </dialog>
  );
}
