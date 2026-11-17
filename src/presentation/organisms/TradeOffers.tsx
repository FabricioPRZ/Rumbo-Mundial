import { BOARD } from "@/domain/game/board";
import type { Action, Game } from "@/domain/game/types";
import Button from "../atoms/Button";
export default function TradeOffers({ game, playerId, busy, send }: { game: Game; playerId: string | null; busy: boolean; send: (action: Action) => Promise<boolean> }) {
  return <>
              {game.trades
                .filter((t) => t.to === playerId || t.from === playerId)
                .map((t) => (
                  <section className="panel trade-scene" key={t.id}>
                    <h2>Propuesta de trato</h2>
                    <p>
                      {game.players.find((p) => p.id === t.from)?.name} ofrece $
                      {t.giveMoney} y{" "}
                      {t.give.map((i) => BOARD[i].name).join(", ") ||
                        "ninguna propiedad"}
                      .
                    </p>
                    <p>
                      Pide ${t.takeMoney} y{" "}
                      {t.take.map((i) => BOARD[i].name).join(", ") ||
                        "ninguna propiedad"}
                      .
                    </p>
                    {t.to === playerId && (
                      <Button
                        className="primary"
                        disabled={busy || !!game.debt}
                        onClick={() =>
                          void send({ type: "accept", trade: t.id })
                        }
                      >
                        Aceptar trato
                      </Button>
                    )}
                    <Button
                      disabled={busy}
                      onClick={() => void send({ type: "reject", trade: t.id })}
                    >
                      {t.from === playerId ? "Cancelar" : "Rechazar"}
                    </Button>
                  </section>
                ))}
  </>;
}
