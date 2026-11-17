"use client";
import { COLORS, type Action, type Game, type Player } from "@/domain/game/types";
import Button from "../atoms/Button";
import EntryForm from "./EntryForm";
export default function Lobby({ id, game, me, token, busy, send }: { id: string; game: Game; me?: Player; token: string | null; busy: boolean; send: (action: Action) => Promise<boolean> }) {
  const host = me?.id === game.host;
  return (
        <div className="lobby-grid">
          <section className="panel lobby">
            <p className="eyebrow">SALA DE ABORDAJE</p>
            <h1>
              El viaje empieza
              <br />
              con tus amigos.
            </h1>
            <p>
              Comparte el ID <b>{id}</b>. Necesitan de 2 a 6 jugadores.
            </p>
            <p>
              {game.duration
                ? `Partida de ${game.duration} minutos.`
                : "Gana el último jugador que siga en pie."}
            </p>
            <ul className="passengers">
              {game.players.map((p) => (
                <li key={p.id}>
                  <span style={{ background: p.color }}>✈</span>
                  <b>{p.name}</b>
                  <small>
                    {p.id === game.host ? "Anfitrión" : "Listo para viajar"}
                  </small>
                </li>
              ))}
            </ul>
            {me && (
              <>
                <fieldset>
                  <legend>Tu avión</legend>
                  <div className="colors">
                    {COLORS.map((c, i) => (
                      <Button
                        key={c}
                        aria-label={`Color ${i + 1}`}
                        aria-pressed={me.color === c}
                        style={{ background: c }}
                        disabled={
                          busy ||
                          game.players.some(
                            (p) => p.id !== me.id && p.color === c,
                          )
                        }
                        onClick={() => void send({ type: "color", color: c })}
                      >
                        ✈
                      </Button>
                    ))}
                  </div>
                </fieldset>
                {host ? (
                  <>
                    <Button
                      className="primary"
                      disabled={busy || game.players.length < 2}
                      onClick={() => void send({ type: "start" })}
                    >
                      Iniciar partida
                    </Button>
                    {game.players.length < 2 && (
                      <small>Espera a que llegue al menos un amigo.</small>
                    )}
                  </>
                ) : (
                  <p>El anfitrión iniciará la partida.</p>
                )}
              </>
            )}
          </section>
          {!me && !token ? (
            <EntryForm room={id} />
          ) : (
            <section className="panel guide">
              <h2>Antes de despegar</h2>
              <p>Todos empiezan con $134,500. El Banco abona $20,000 al cerrar un turno en el que pasaste por Salida.</p>
              <p>
                Compra países y completa grupos para construir casas.
                Cinco construcciones se convierten en un hotel.
              </p>
              <p>
                Caer en Deportado: multa de $5,000 o tres turnos. Cárcel: fianza de $10,000 y tres turnos completos. Australia es descanso.
              </p>
              <p>Selecciona cualquier casilla para consultar su tarjeta.</p>
            </section>
          )}
        </div>
  );
}
