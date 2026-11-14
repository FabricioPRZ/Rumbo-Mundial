"use client";
import { useEffect, useRef, useState } from "react";
import { BOARD } from "@/lib/game/board";
import { group } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
export default function TradeModal({
  game,
  me,
  onClose,
  send,
  error,
  suspended = false,
}: {
  game: Game;
  me: Player;
  error?: string;
  suspended?: boolean;
  onClose: () => void;
  send: (a: Action) => Promise<boolean>;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const others = game.players.filter((p) => p.id !== me.id && !p.bankrupt && !(p.jailed && p.detention === "prison"));
  const [to, setTo] = useState(others[0]?.id ?? "");
  const [give, setGive] = useState<number[]>([]);
  const [take, setTake] = useState<number[]>([]);
  const [gm, setGm] = useState(0);
  const [tm, setTm] = useState(0);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (suspended) dialog.current?.close();
    else if (!dialog.current?.open) dialog.current?.showModal();
  }, [suspended]);
  const properties = (owner: string) =>
    BOARD.filter(
      (b) =>
        game.properties[b.id]?.owner === owner &&
        !game.properties[b.id].buildings &&
        !group(b.id).some((x) => game.properties[x.id].buildings),
    );
  return (
    <dialog ref={dialog} onCancel={onClose} className="trade-modal">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          if (
            await send({
              type: "trade",
              to,
              give,
              take,
              giveMoney: gm,
              takeMoney: tm,
            })
          )
            onClose();
          setBusy(false);
        }}
      >
        <div className="row">
          <h2>Hagamos un trato</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <label>
          Negociar con
          <select
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setTake([]);
            }}
          >
            {others.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <div className="trade-columns">
          {[
            {
              title: "Tú ofreces",
              owner: me.id,
              selected: give,
              set: setGive,
              money: gm,
              setMoney: setGm,
            },
            {
              title: "Tú pides",
              owner: to,
              selected: take,
              set: setTake,
              money: tm,
              setMoney: setTm,
            },
          ].map((side) => (
            <fieldset key={side.title}>
              <legend>{side.title}</legend>
              <label>
                Dinero
                <input
                  type="number"
                  min={0}
                  max={
                    game.players.find((p) => p.id === side.owner)?.money ?? 0
                  }
                  value={side.money}
                  onChange={(e) => side.setMoney(Number(e.target.value))}
                />
              </label>
              {properties(side.owner).map((b) => (
                <label key={b.id} className="checkbox">
                  <input
                    type="checkbox"
                    checked={side.selected.includes(b.id)}
                    onChange={(e) =>
                      side.set(
                        e.target.checked
                          ? [...side.selected, b.id]
                          : side.selected.filter((id) => id !== b.id),
                      )
                    }
                  />
                  {b.name}
                  {game.properties[b.id].mortgaged ? " (hipotecada)" : ""}
                </label>
              ))}
            </fieldset>
          ))}
        </div>
        <p>
          Solo propiedades de grupos sin edificios. Las hipotecas se transfieren
          y conservan su costo de liberación.
        </p>
        <button className="primary" disabled={busy || !to}>
          Enviar propuesta
        </button>
      </form>
    </dialog>
  );
}
