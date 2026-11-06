"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Action, Game } from "@/lib/game/types";
import { COLORS } from "@/lib/game/types";
import { BOARD } from "@/lib/game/board";
import { ranking } from "@/lib/game/rules";
import Board from "./Board";
import EntryForm from "./EntryForm";
import PropertyCard from "./PropertyCard";
import PlayerPanel from "./PlayerPanel";
import TradeModal from "./TradeModal";
import Log from "./Log";
import Activity from "./Activity";
import PaymentModal from "./PaymentModal";
export default function Room({ id }: { id: string }) {
  const [game, setGame] = useState<Game | null>(null),
    [token, setToken] = useState<string | null>(null),
    [playerId, setPlayerId] = useState<string | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [loaded, setLoaded] = useState(false),
    [missing, setMissing] = useState(false),
    [selected, setSelected] = useState(0),
    [tradeOpen, setTradeOpen] = useState(false),
    [inactive, setInactive] = useState(0),
    [notice, setNotice] = useState(""),
    [sound, setSound] = useState(false),
    [now, setNow] = useState(Date.now());
  const [payment, setPayment] = useState<{
    action: Action;
    amount: number;
    label: string;
  } | null>(null);
  const state = useRef<Game | null>(null),
    heartbeat = useRef(0),
    inFlight = useRef(false),
    actionFlight = useRef(false);
  const apply = useCallback((next: Game) => {
    if (!state.current || next.version >= state.current.version) {
      state.current = next;
      setGame(next);
    }
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem(`turista:${id}`));
    setSound(localStorage.getItem("turista:sound") === "1");
    setLoaded(true);
  }, [id]);
  const refresh = useCallback(async () => {
    if (document.hidden || inFlight.current || !loaded) return;
    inFlight.current = true;
    try {
      const pulse = Date.now() - heartbeat.current > 20000;
      const response = await fetch(
        `/api/rooms/${id}?since=${state.current?.version ?? 0}`,
        {
          cache: "no-store",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "x-heartbeat": pulse ? "1" : "0",
              }
            : {},
          signal: AbortSignal.timeout(12000),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 404) setMissing(true);
        throw new Error(data.error);
      }
      if (pulse) heartbeat.current = Date.now();
      if (data.game) apply(data.game);
      setPlayerId(data.playerId);
      setInactive(data.inactiveFor ?? 0);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reconectando…");
    } finally {
      inFlight.current = false;
    }
  }, [id, token, loaded, apply]);
  useEffect(() => {
    if (!loaded) return;
    void refresh();
    const timer = setInterval(() => {
      setNow(Date.now());
      void refresh();
    }, 1000);
    const visible = () => {
      if (!document.hidden) void refresh();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [loaded, refresh]);
  const commit = async (action: Action): Promise<boolean> => {
    if (!token || !state.current || actionFlight.current) return false;
    actionFlight.current = true;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/rooms/${id}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          action,
          version: state.current.version,
          requestId: crypto.randomUUID(),
        }),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok) {
        void refresh();
        throw new Error(data.error);
      }
      apply(data.game);
      if (sound && action.type === "roll") {
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        gain.gain.value = 0.04;
        osc.frequency.value = 600;
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + 0.12);
        osc.onended = () => void audio.close();
      }
      return true;
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo enviar. Reconectando…",
      );
      return false;
    } finally {
      setBusy(false);
      actionFlight.current = false;
    }
  };
  const send = async (action: Action): Promise<boolean> => {
    const s = state.current;
    const p = s?.players.find((x) => x.id === playerId);
    if (!s || !p) return false;
    let amount = 0,
      label = "";
    if (action.type === "buy") {
      amount = BOARD[p.position].price;
      label = `Comprar ${BOARD[p.position].name}`;
    }
    if (action.type === "settle" && s.debt) {
      amount = s.debt.amount;
      label = `Pago a ${s.players.find((x) => x.id === s.debt?.creditor)?.name ?? "el Banco"}`;
    }
    if (action.type === "bail") {
      amount = 50;
      label = "Multa para salir de Groenlandia";
    }
    if (action.type === "build") {
      amount = BOARD[action.square].buildCost;
      label = `Construir en ${BOARD[action.square].name}`;
    }
    if (action.type === "redeem") {
      amount = Math.ceil(BOARD[action.square].mortgage * 1.1);
      label = `Deshipotecar ${BOARD[action.square].name}`;
    }
    if (amount > 0) {
      setPayment({ action, amount, label });
      return false;
    }
    return commit(action);
  };
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copiado. Ya puedes invitar a tus amigos.");
    } catch {
      setNotice(`Copia este dato: ${value}`);
    }
  };
  if (missing)
    return (
      <main className="empty panel">
        <h1>Sala no encontrada</h1>
        <p>Revisa el ID. Las salas vencen después de 24 horas sin acciones.</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  if (!game)
    return (
      <main className="empty panel">
        <h1>Preparando tu viaje…</h1>
        <p role="status">{error || "Conectando con la sala."}</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  const me = game.players.find((p) => p.id === playerId),
    host = playerId === game.host;
  const seconds = game.endsAt
    ? Math.max(0, Math.ceil((game.endsAt - now) / 1000))
    : null;
  return (
    <main className="room">
      <header className="room-header">
        <Link href="/" className="brand">
          ✈ TURISTA MUNDIAL
        </Link>
        <div className="room-code">
          <span>
            SALA <b>{id}</b>
          </span>
          <button onClick={() => void copy(id)}>Copiar ID</button>
          <button
            onClick={() => void copy(`${window.location.origin}/sala/${id}`)}
          >
            Copiar link
          </button>
        </div>
        <button
          aria-pressed={sound}
          onClick={() => {
            setSound(!sound);
            localStorage.setItem("turista:sound", sound ? "0" : "1");
          }}
        >
          Sonido {sound ? "activado" : "apagado"}
        </button>
      </header>
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {game.status === "finished" && (
        <section className="victory panel">
          <p className="eyebrow">VIAJE COMPLETADO</p>
          <h1>
            {game.winner
              .map((w) => game.players.find((p) => p.id === w)?.name)
              .join(" y ")}{" "}
            {game.winner.length > 1 ? "ganan" : "gana"} la partida
          </h1>
          <ol className="ranking">
            {ranking(game).map(({ player: p, place, score }) => (
              <li key={p.id}>
                <strong>
                  {place}. {p.name}
                </strong>
                <span>
                  ${score.toLocaleString("es-MX")}
                  {p.bankrupt ? " · En quiebra" : ""}
                </span>
              </li>
            ))}
          </ol>
          <Link href="/">Organizar la revancha ↗</Link>
        </section>
      )}
      {game.status === "lobby" ? (
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
                      <button
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
                      </button>
                    ))}
                  </div>
                </fieldset>
                {host ? (
                  <>
                    <button
                      className="primary"
                      disabled={busy || game.players.length < 2}
                      onClick={() => void send({ type: "start" })}
                    >
                      Iniciar partida
                    </button>
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
              <p>Todos empiezan con $1,500. Cobra $200 al pasar por México.</p>
              <p>
                Compra países y completa grupos para construir restaurantes.
                Cinco construcciones se convierten en un hotel.
              </p>
              <p>
                Groenlandia implica tres turnos completos: puedes pagar $50 o
                usar una carta para salir. En Oceanía puedes intentar dobles.
              </p>
              <p>Selecciona cualquier casilla para consultar su tarjeta.</p>
            </section>
          )}
        </div>
      ) : (
        <>
          <div className="status-strip">
            <span>
              <i style={{ background: game.players[game.turn].color }} />
              Turno de <b>{game.players[game.turn].name}</b>
            </span>
            {seconds !== null && (
              <span>
                Tiempo: {Math.floor(seconds / 60)}:
                {String(seconds % 60).padStart(2, "0")}
              </span>
            )}
            <span>Versión {game.version}</span>
          </div>
          <Activity game={game} />
          <div className="game-layout">
            <section>
              <Board game={game} onSelect={setSelected} />
              <div className="players-strip">
                {game.players.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      borderColor: p.color,
                      opacity: p.bankrupt ? 0.5 : 1,
                    }}
                  >
                    <b>{p.name}</b>
                    <span>
                      {p.bankrupt
                        ? "En quiebra"
                        : `$${p.money.toLocaleString("es-MX")}`}
                    </span>
                    <details>
                      <summary>
                        {
                          Object.values(game.properties).filter(
                            (a) => a.owner === p.id,
                          ).length
                        }{" "}
                        propiedades
                      </summary>
                      <div className="owned">
                        {BOARD.filter(
                          (b) => game.properties[b.id]?.owner === p.id,
                        ).map((b) => (
                          <button key={b.id} onClick={() => setSelected(b.id)}>
                            {b.name}
                            {game.properties[b.id].mortgaged ? " · H" : ""}
                          </button>
                        ))}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
              <Log events={game.log} history={game.events} />
            </section>
            <aside>
              {me && game.status === "playing" && (
                <PlayerPanel
                  game={game}
                  me={me}
                  busy={busy}
                  send={(a) => void send(a)}
                  onTrade={() => setTradeOpen(true)}
                  onSelect={setSelected}
                />
              )}
              <PropertyCard
                id={selected}
                game={game}
                me={me}
                send={(a) => void send(a)}
                busy={busy}
              />
              {game.trades
                .filter((t) => t.to === playerId || t.from === playerId)
                .map((t) => (
                  <section className="panel" key={t.id}>
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
                      <button
                        className="primary"
                        disabled={busy || !!game.debt}
                        onClick={() =>
                          void send({ type: "accept", trade: t.id })
                        }
                      >
                        Aceptar trato
                      </button>
                    )}
                    <button
                      disabled={busy}
                      onClick={() => void send({ type: "reject", trade: t.id })}
                    >
                      {t.from === playerId ? "Cancelar" : "Rechazar"}
                    </button>
                  </section>
                ))}
              {host && game.status === "playing" && inactive >= 90000 && (
                <section className="panel">
                  <h2>Jugador sin conexión</h2>
                  <p>Sin responder por más de 90 segundos.</p>
                  <button
                    disabled={busy || !!game.debt}
                    onClick={() => void send({ type: "skip" })}
                  >
                    Saltar turno
                  </button>
                  <button
                    disabled={busy}
                    onClick={() => {
                      if (
                        window.confirm(
                          "¿Declarar en quiebra al jugador inactivo?",
                        )
                      )
                        void send({ type: "expel" });
                    }}
                  >
                    Declarar quiebra
                  </button>
                </section>
              )}
            </aside>
          </div>
        </>
      )}
      {payment && me && (
        <PaymentModal
          player={me}
          {...payment}
          onClose={() => setPayment(null)}
          commit={commit}
        />
      )}
      {tradeOpen && me && (
        <TradeModal
          game={game}
          me={me}
          send={send}
          onClose={() => setTradeOpen(false)}
        />
      )}
      <footer>
        Reglas y valores adaptados · Selecciona una casilla para conocer sus
        detalles.
      </footer>
    </main>
  );
}
