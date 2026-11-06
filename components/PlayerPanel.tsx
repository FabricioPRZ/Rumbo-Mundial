import { BOARD } from "@/lib/game/board";
import { liquidationValue, netWorth } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
import Dice from "./Dice";
export default function PlayerPanel({
  game,
  me,
  busy,
  send,
  onTrade,
  onSelect,
}: {
  game: Game;
  me: Player;
  busy: boolean;
  send: (a: Action) => void;
  onTrade: () => void;
  onSelect: (id: number) => void;
}) {
  const active = game.players[game.turn],
    mine = active.id === me.id && !me.bankrupt;
  const debt = mine ? game.debt : null;
  const button = (
    label: string,
    action: Action,
    reason: string | null = null,
  ) => (
    <div>
      <button
        className="primary"
        disabled={busy || !!reason}
        title={reason ?? ""}
        onClick={() => send(action)}
      >
        {label}
      </button>
      {reason && <small>{reason}</small>}
    </div>
  );
  return (
    <section className="panel player-panel">
      <p className="eyebrow">{mine ? "TU TURNO" : `TURNO DE ${active.name}`}</p>
      <div className="row">
        <h2>{me.name}</h2>
        <span className="balance">${me.money.toLocaleString("es-MX")}</span>
      </div>
      <small>
        Patrimonio neto: ${netWorth(game, me).toLocaleString("es-MX")}
      </small>
      <Dice values={game.dice} />
      {me.jailed > 0 && (
        <p>Oceanía: quedan {me.jailed} turnos. Tira para intentar dobles.</p>
      )}
      {me.bankrupt ? (
        <p>Terminó tu viaje. Puedes seguir viendo la partida.</p>
      ) : (
        <div className="actions">
          {debt ? (
            <>
              <p className="error">
                Deuda: ${debt.amount}. Vende edificios, hipoteca o devuelve
                propiedades desde sus tarjetas.
              </p>
              {button(
                "Liquidar deuda",
                { type: "settle" },
                me.money < debt.amount
                  ? "Necesitas reunir el importe completo."
                  : null,
              )}
              {button(
                "Declarar quiebra",
                { type: "bankrupt" },
                liquidationValue(game, me) >= debt.amount
                  ? "Tus activos aún cubren la deuda."
                  : Object.values(game.properties).some(
                        (a) =>
                          a.owner === me.id &&
                          (a.buildings > 0 || !a.mortgaged),
                      )
                    ? "Primero vende edificios e hipoteca o devuelve propiedades."
                    : null,
              )}
            </>
          ) : (
            <>
              {game.phase === "roll" &&
                button(
                  "Tirar dados",
                  { type: "roll" },
                  mine ? null : "Espera tu turno.",
                )}
              {mine && game.phase === "buy" && (
                <>
                  {button(
                    `Comprar ${BOARD[me.position].name} · $${BOARD[me.position].price}`,
                    { type: "buy" },
                    me.money < BOARD[me.position].price
                      ? "Saldo insuficiente."
                      : null,
                  )}
                  {button("Declinar compra", { type: "decline" })}
                </>
              )}
              {game.phase === "end" &&
                button(
                  game.extra ? "Continuar · tiro extra" : "Terminar turno",
                  { type: "end" },
                  mine ? null : "Espera tu turno.",
                )}
              {mine &&
                me.jailed > 0 &&
                me.passes.length > 0 &&
                game.phase === "roll" &&
                button("Usar salida de Oceanía", { type: "pass" })}
              <button
                onClick={onTrade}
                disabled={!mine || busy}
                title={!mine ? "Espera tu turno." : ""}
              >
                Proponer trato
              </button>
            </>
          )}
        </div>
      )}
      <h3>Tus propiedades</h3>
      <div className="owned">
        {BOARD.filter((b) => game.properties[b.id]?.owner === me.id).map(
          (b) => (
            <button
              key={b.id}
              style={{ borderLeftColor: b.color ?? "#777" }}
              onClick={() => onSelect(b.id)}
            >
              {b.name}
              <span>
                {game.properties[b.id].mortgaged
                  ? "H"
                  : game.properties[b.id].buildings === 5
                    ? "🏨"
                    : game.properties[b.id].buildings
                      ? "🍴" + game.properties[b.id].buildings
                      : ""}
              </span>
            </button>
          ),
        )}
        {!Object.values(game.properties).some((a) => a.owner === me.id) && (
          <small>Tu primera escala te espera.</small>
        )}
      </div>
    </section>
  );
}
