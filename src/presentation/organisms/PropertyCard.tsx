import { BOARD } from "@/domain/game/board";
import { assetError, group } from "@/domain/game/rules";
import type { Action, Game, Player } from "@/domain/game/types";
import { Building } from "../atoms/Building";
import { CountryArt } from "../atoms/CountryArt";
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
      {b.kind === "country" && <CountryArt id={b.id} />}
      <h2>{b.flag} {b.name}</h2>
      {!!a?.buildings && <div className="property-buildings">{a.buildings === 5 ? <Building hotel /> : Array.from({length: a.buildings}, (_, i) => <Building key={i} />)}</div>}
      {me?.acquisitionCard && b.kind === "country" && a?.owner !== me.id && group(id).every((x) => x.id === id || game.properties[x.id].owner === me.id) && <button className="primary" disabled={busy || !!game.debt || !!game.auction} onClick={() => send({type:"acquire", square:id})}>Usar permiso para completar bloque</button>}
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
                      "1 casa",
                      "2 casas",
                      "3 casas",
                      "4 casas",
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
              {(["build", "sell", "sell-group", "mortgage", "redeem", "return"] as const).map(
                (type) => {
                  const reason =
                    assetError(game, me, id, type);
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
                            "sell-group": "Vender edificios del bloque",
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
            ? "De visita al caer con dados. Si te envían aquí: paga $5,000 o cumple tres turnos completos; después regresas a Salida sin sueldo. Puedes administrar tus propiedades."
            : b.kind === "start"
              ? "Reclama $20,000 al pasar o caer aquí, antes de ceder el turno."
              : b.kind === "tax"
                ? `Paga $${b.tax} al Banco.`
                : b.kind === "go-oceania"
                  ? "Paga $10,000 de fianza y cumple tres turnos completos. No cobras rentas ni administras propiedades. Los dobles no te liberan."
                  : b.kind === "rest"
                    ? "Australia es descanso: no hay castigo al caer con dados. Algunas cartas pueden indicar una estancia especial."
                    : "Roba una carta y sigue sus instrucciones."}
        </p>
      )}
    </section>
  );
}
