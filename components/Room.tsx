"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Action, Game } from "@/lib/game/types";
import { COLORS } from "@/lib/game/types";
import { BOARD } from "@/lib/game/board";
import { redemptionCost, buildingBidders } from "@/lib/game/rules";
import { Banknote } from "./TravelArt";
import { DENOMINATIONS, wallet } from "@/lib/game/money";
import Board from "./Board";
import EntryForm from "./EntryForm";
import PropertyDialog from "./PropertyDialog";
import PlayerPanel from "./PlayerPanel";
import MobileTurnBar from "./MobileTurnBar";
import AudioControls from "./AudioControls";
import VoiceChat from "./VoiceChat";
import Victory from "./Victory";
import { useGameAudio } from "@/lib/useGameAudio";
import { useGamePlayback } from "@/lib/useGamePlayback";
import TradeModal from "./TradeModal";

import Activity from "./Activity";
import PaymentModal from "./PaymentModal";
export default function Room({ id }: { id: string }) {
  const [game, setGame] = useState<Game | null>(null),
    [token, setToken] = useState<string | null>(null),
    [playerId, setPlayerId] = useState<string | null>(null),
    [error, setError] = useState(""),
    [connectionError, setConnectionError] = useState(""),
    [busy, setBusy] = useState(false),
    [loaded, setLoaded] = useState(false),
    [missing, setMissing] = useState(false),
    [selected, setSelected] = useState(0),
    [propertyOpen, setPropertyOpen] = useState(false),
    [sideOpen, setSideOpen] = useState(false),
    [rosterOpen, setRosterOpen] = useState(false),
    [rosterIndex, setRosterIndex] = useState(0),
    [rosterPage, setRosterPage] = useState(0),
    [resultsDismissed, setResultsDismissed] = useState(false),
    [tradeOpen, setTradeOpen] = useState(false),
    [inactive, setInactive] = useState(0),
    [notice, setNotice] = useState(""),
    [now, setNow] = useState(Date.now());
  const audio = useGameAudio(game, playerId);
  const playback = useGamePlayback(game);
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
      setConnectionError("");
    } catch (e) {
      setConnectionError(e instanceof Error ? e.message : "Reconectando…");
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
      if (action.type === "decline" || action.type === "fold") setSideOpen(false);
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
    if (playback.busy) return false;
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
      amount = 5000;
      label = "Multa para salir de Deportado";
    }
    if (action.type === "build") {
      if (Object.keys(buildingBidders(s, action.square)).length > 1) return commit(action);
      amount = BOARD[action.square].buildCost;
      label = `Construir en ${BOARD[action.square].name}`;
    }
    if (action.type === "redeem") {
      amount = redemptionCost(s, action.square);
      label = `Deshipotecar ${BOARD[action.square].name}`;
    }
    if (action.type === "acquire") {
      const b = BOARD[action.square]; amount = s.properties[b.id].owner ? b.rents[0] : b.price - 1000;
      label = `Completar bloque con ${b.name}`;
    }
    if (amount > 0) {
      setPayment({ action, amount, label });
      return false;
    }
    return commit(action);
  };
  const selectProperty = (square: number) => { setSelected(square); setPropertyOpen(true); };
  useEffect(() => {
    if (!game || !playerId) return;
    if ((game.phase === "buy" && game.players[game.turn].id === playerId) ||
        game.debt?.payer === playerId || game.trades.some((t) => t.to === playerId)) setSideOpen(true);
  }, [game?.phase, game?.debt?.payer, game?.trades, game?.turn, playerId, game]);
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
        <p role="status">{error || connectionError || "Conectando con la sala."}</p>
        <Link href="/">Volver al inicio</Link>
      </main>
    );
  const me = game.players.find((p) => p.id === playerId),
    host = playerId === game.host;
  const seconds = game.endsAt
    ? Math.max(0, Math.ceil((game.endsAt - now) / 1000))
    : null;
  const rollSeconds = game.status === "playing" && (game.opening || game.phase === "roll") && !game.debt && !game.auction && !game.choice && !game.detentionDecision
    ? Math.min(20, Math.max(0, Math.ceil(((game.rollDeadline ?? game.turnAt + 20000) - now) / 1000))) : null;
  return (
    <main className={`room ${game.status !== "lobby" ? "table-viewport" : ""} ${sideOpen ? "side-open" : ""} ${rosterOpen ? "roster-open" : ""} ${playback.busy ? "presentation-playing" : ""}`}>
      <header className="room-header">
        <Link href="/" className="brand">
          ✈ RUMBO MUNDIAL
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
        <div className="room-audio-controls">
          <AudioControls audio={audio} />
          {me && token && <VoiceChat room={id} token={token} playerId={me.id} players={game.players} masterMuted={audio.preferences.muted} onEnableAudio={() => audio.change({ muted: false })} />}
        </div>
      </header>
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
      {(error || connectionError) && (
        <p role="alert" className="error">
          {error || connectionError}
        </p>
      )}
      {game.status === "finished" && !playback.busy && !resultsDismissed && (
        <Victory game={game} onClose={() => setResultsDismissed(true)} muted={audio.preferences.muted} onMute={() => audio.change({ muted: !audio.preferences.muted })} />
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
            {rollSeconds !== null && <span className={`roll-countdown ${rollSeconds <= 5 ? "urgent" : ""}`} role="timer">{rollSeconds ? `${rollSeconds} s para tirar` : "Cambiando turno…"}</span>}
            <span>Viaje compartido · {game.players.filter((p) => !p.bankrupt).length} en juego</span>
          </div>
          {me && game.status === "playing" && (
            <MobileTurnBar
              animating={playback.busy}
              position={playback.positions[me.id]}
              game={game}
              me={me}
              busy={busy || playback.busy}
              send={(action) => void send(action)}
              onOptions={() => { setSideOpen(true); setRosterOpen(false); }}
            />
          )}
          {game.status === "playing" && game.phase === "buy" && !game.auction && !game.debt && me?.id !== game.players[game.turn].id && <div className="buy-scene spectator-decision"><p className="eyebrow">DECISIÓN EN CURSO</p><h2>{game.players[game.turn].name} llegó a {BOARD[game.players[game.turn].position].name}</h2><p>Está decidiendo si compra la propiedad o la envía a subasta.</p></div>}
          <div className="table-toolbar">
            <nav className="table-tools" aria-label="Paneles de la mesa">
              {game.status === "finished" && <button onClick={() => setResultsDismissed(false)}>🏆 Resultados</button>}
              <button aria-expanded={sideOpen} onClick={()=>{setSideOpen(!sideOpen);setRosterOpen(false);}}>✈ Mis opciones</button>
              <button aria-expanded={rosterOpen} onClick={()=>{setRosterOpen(!rosterOpen);setSideOpen(false);}}>♟ Propiedades</button>
            </nav>
            <Activity game={game} event={playback.event} lastRoll={playback.lastRoll} onEvent={audio.playEvent} />
          </div>
          <div className="game-layout">
            <section>
              <Board game={game} positions={playback.positions} onSelect={selectProperty} />
              <div className="players-strip" aria-label="Propiedades de los viajeros"><button className="panel-close" onClick={()=>setRosterOpen(false)}>Cerrar ×</button><label>Viajero<select value={rosterIndex} onChange={(e)=>{setRosterIndex(Number(e.target.value));setRosterPage(0);}}>{game.players.map((p,i)=><option value={i} key={p.id}>{p.name}</option>)}</select></label>
                {game.players.filter((_, i)=>i===rosterIndex).map((p) => (
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
                    <details open>
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
                        ).slice(rosterPage*4,rosterPage*4+4).map((b) => (
                          <button key={b.id} onClick={() => selectProperty(b.id)}>
                            {b.name}
                            {game.properties[b.id].mortgaged ? " · H" : ""}
                          </button>
                        ))}
                      </div>
                      <div className="row"><button disabled={!rosterPage} onClick={()=>setRosterPage(rosterPage-1)}>←</button><span>Página {rosterPage+1}</span><button disabled={(rosterPage+1)*4>=Object.values(game.properties).filter((a)=>a.owner===p.id).length} onClick={()=>setRosterPage(rosterPage+1)}>→</button></div>
                    </details>
                  </div>
                ))}
              </div>

            </section>
            <aside aria-label="Panel de jugador"><button className="panel-close" onClick={()=>setSideOpen(false)}>Volver al tablero ×</button>
              {me && game.status === "playing" && (
                <PlayerPanel
                  game={game}
                  me={me}
                  busy={busy || playback.busy}
                  send={(a) => void send(a)}
                  onTrade={() => setTradeOpen(true)}
                  onSelect={selectProperty}
                />
              )}
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
      {me && game.status !== "lobby" && <div className="wallet" aria-label="Mi mano de billetes"><div className="wallet-summary">{DENOMINATIONS.filter((v)=>wallet(me)[v]).map((v)=><span key={v}><Banknote value={v} compact/><b>× {wallet(me)[v]}</b></span>)}</div></div>}
      {propertyOpen && <PropertyDialog id={selected} game={game} me={me} busy={busy || playback.busy} suspended={playback.busy} send={(a)=>void send(a)} onClose={()=>setPropertyOpen(false)} />}
      {payment && me && game.status === "playing" && (

        <PaymentModal
          suspended={playback.busy}
          player={me}
          {...payment}
          error={error}
          onClose={() => setPayment(null)}
          commit={commit}
        />
      )}
      {tradeOpen && me && (
        <TradeModal
          suspended={playback.busy}
          game={game}
          me={me}
          error={error}
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
