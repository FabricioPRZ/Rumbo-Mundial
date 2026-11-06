import { BOARD } from "@/lib/game/board";
import { assetError } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";
export default function PropertyCard({
  id,
  game,
  me,
  send,
  busy,
}: {
  id: number;
  game: Game;
  me: Player | undefined;
  send: (a: Action) => void;
  busy: boolean;
}) {
  const b = BOARD[id],
    a = game.properties[id],
    owner = game.players.find((p) => p.id === a?.owner);
  return (
    <section
      className="panel property"
      style={{ borderTopColor: b.color ?? "#175344" }}
    >
      <p className="eyebrow">{b.group ?? "ESCALA DEL VIAJE"}</p>
      <h2>{b.name}</h2>
      {b.price ? (
        <>
          <p>
            {owner ? `Propiedad de ${owner.name}` : "Disponible en el Banco"}
            {a?.mortgaged ? " · Hipotecada" : ""}
          </p>
          <dl>
            <div>
              <dt>Compra</dt>
              <dd>${b.price}</dd>
            </div>
            <div>
              <dt>Hipoteca</dt>
              <dd>${b.mortgage}</dd>
            </div>
            {b.buildCost > 0 && (
              <div>
                <dt>Por edificio</dt>
                <dd>${b.buildCost}</dd>
              </div>
            )}
          </dl>
          <div className="rent-list">
            {b.rents.map((r, i) => (
              <span key={i}>
                {b.kind === "country"
                  ? [
                      "Base",
                      "1 restaurante",
                      "2 restaurantes",
                      "3 restaurantes",
                      "4 restaurantes",
                      "Hotel",
                    ][i]
                  : b.kind === "airline"
                    ? `${i + 1} aerolínea(s)`
                    : `${i + 1} servicio(s)`}
                <b>{b.kind === "utility" ? `${r} × dados` : `$${r}`}</b>
              </span>
            ))}
          </div>
          {b.kind === "country" && (
            <small>
              Renta base doble con el grupo completo. Edificios vendidos al
              Banco a mitad de precio.
            </small>
          )}
          {me && a?.owner === me.id && game.status === "playing" && (
            <div className="asset-actions">
              {(["build", "sell", "mortgage", "redeem", "return"] as const).map(
                (type) => {
                  const reason =
                    game.players[game.turn].id !== me.id
                      ? "Espera tu turno."
                      : assetError(game, me, id, type);
                  return (
                    <div key={type}>
                      <button
                        disabled={busy || !!reason}
                        title={reason ?? ""}
                        onClick={() => send({ type, square: id })}
                      >
                        {
                          {
                            build: "Construir",
                            sell: "Vender edificio",
                            mortgage: "Hipotecar",
                            redeem: "Deshipotecar",
                            return: "Devolver al Banco",
                          }[type]
                        }
                      </button>
                      {reason && <small>{reason}</small>}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </>
      ) : (
        <p>
          {b.kind === "oceania"
            ? "Groenlandia es de visita al caer con dados. Al ser deportado, cumple tres turnos, paga $50 o usa una carta de salida."
            : b.kind === "start"
              ? "Cobra $200 al pasar o caer aquí."
              : b.kind === "tax"
                ? `Paga $${b.tax} al Banco.`
                : b.kind === "go-oceania"
                  ? "Viaja a Groenlandia sin cobrar por México."
                  : b.kind === "rest"
                    ? "Oceanía: pierdes tres turnos; los dobles permiten salir antes."
                    : "Roba una carta y sigue sus instrucciones."}
        </p>
      )}
    </section>
  );
}
