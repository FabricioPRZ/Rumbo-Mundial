import { BOARD } from "@/lib/game/board";
import { liquidationValue, netWorth } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
import { DENOMINATIONS, wallet } from "@/lib/game/money";
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
      <details className="wallet">
        <summary>Tus billetes</summary>
        <div className="wallet-summary">
          {DENOMINATIONS.map((value) => (
            <span key={value}>
              ${value} × {wallet(me)[value] ?? 0}
            </span>
          ))}
        </div>
      </details>
      {!me.bankrupt && (
        <button
          className="primary trade-trigger"
          onClick={onTrade}
          disabled={busy || !!game.debt}
          title={game.debt ? "Primero debe resolverse el pago pendiente." : ""}
        >
          Proponer trato
        </button>
      )}
      {me.jailed > 0 && (
        <p>
          {me.detention === "oceania" ? "Oceanía" : "Groenlandia"}: faltan{" "}
          {me.jailed} turnos de castigo.{" "}
          {me.detention === "oceania"
            ? "Los dobles permiten salir antes."
            : "Los dobles no eliminan el castigo de prisión."}
        </p>
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
                (!me.jailed || me.detention === "oceania" || !mine) &&
                button(
                  "Tirar dados",
                  { type: "roll" },
                  mine ? null : "Espera tu turno.",
                )}
              {mine && me.jailed > 0 && game.phase === "roll" && (
                <>
                  {button("Cumplir un turno de castigo", { type: "wait" })}
                  {me.detention !== "oceania" &&
                    button(
                      "Pagar multa de $50 y salir",
                      { type: "bail" },
                      me.money < 50 ? "Saldo insuficiente." : null,
                    )}
                </>
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
                (!me.jailed || me.detention === "oceania" || !mine) &&
                button("Usar salida de Oceanía", { type: "pass" })}
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
