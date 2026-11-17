"use client";
import { BOARD } from "@/domain/game/board";
import type { Action } from "@/domain/game/types";
import { useGameAudio } from "@/presentation/hooks/useGameAudio";
import { useGamePlayback } from "@/presentation/hooks/useGamePlayback";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileTurnBar from "../molecules/MobileTurnBar";
import AudioControls from "../organisms/AudioControls";
import Board from "../organisms/Board";
import PlayerPanel from "../organisms/PlayerPanel";
import PropertyDialog from "../organisms/PropertyDialog";
import TradeModal from "../organisms/TradeModal";
import Victory from "../organisms/Victory";
import VoiceChat from "../organisms/VoiceChat";

import { useRoomActions } from "../hooks/useRoomActions";
import { useRoomSession } from "../hooks/useRoomSession";
import Activity from "../organisms/Activity";
import Lobby from "../organisms/Lobby";
import PaymentModal from "../organisms/PaymentModal";
import PlayerRoster from "../organisms/PlayerRoster";
import RoomHeader from "../organisms/RoomHeader";
import TradeOffers from "../organisms/TradeOffers";
import TurnStatus from "../organisms/TurnStatus";
import Wallet from "../organisms/Wallet";
import RoomLayout from "../templates/RoomLayout";

export default function Room({ id }: { id: string }) {
  const { game, token, playerId, error, connectionError, busy, missing, inactive, now, commit: submit } = useRoomSession(id);
  const [selected, setSelected] = useState(0);
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [rosterOpen, setRosterOpen] = useState(false);
  const [resultsDismissed, setResultsDismissed] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const audio = useGameAudio(game, playerId);
  const playback = useGamePlayback(game);
  const commit = async (action: Action) => {
    const accepted = await submit(action);
    if (accepted && (action.type === "decline" || action.type === "fold")) setSideOpen(false);
    return accepted;
  };
  const { payment, closePayment, send } = useRoomActions(game, playerId, playback.busy, commit);
  const selectProperty = (square: number) => { setSelected(square); setPropertyOpen(true); };
  useEffect(() => {
    if (!game || !playerId) return;
    if ((game.phase === "buy" && game.players[game.turn].id === playerId) ||
        game.debt?.payer === playerId || game.trades.some((t) => t.to === playerId)) setSideOpen(true);
  }, [game?.phase, game?.debt?.payer, game?.trades, game?.turn, playerId, game]);
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
  return (
    <RoomLayout playing={game.status !== "lobby"} sideOpen={sideOpen} rosterOpen={rosterOpen} presenting={playback.busy}>
      <RoomHeader id={id} controls={<><AudioControls audio={audio} />{me && token && <VoiceChat room={id} token={token} playerId={me.id} players={game.players} masterMuted={audio.preferences.muted} onEnableAudio={() => audio.change({ muted: false })} />}</>} />
      {(error || connectionError) && (
        <p role="alert" className="error">
          {error || connectionError}
        </p>
      )}
      {game.status === "finished" && !playback.busy && !resultsDismissed && (
        <Victory game={game} onClose={() => setResultsDismissed(true)} muted={audio.preferences.muted} onMute={() => audio.change({ muted: !audio.preferences.muted })} />
      )}
      {game.status === "lobby" ? (
        <Lobby id={id} game={game} me={me} token={token} busy={busy} send={send} />
      ) : (
        <>
          <TurnStatus game={game} now={now} />
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
              <PlayerRoster game={game} selectProperty={selectProperty} onClose={() => setRosterOpen(false)} />

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
              <TradeOffers game={game} playerId={playerId} busy={busy} send={send} />
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
      {me && game.status !== "lobby" && <Wallet player={me} />}
      {propertyOpen && <PropertyDialog id={selected} game={game} me={me} busy={busy || playback.busy} suspended={playback.busy} send={(a)=>void send(a)} onClose={()=>setPropertyOpen(false)} />}
      {payment && me && game.status === "playing" && (

        <PaymentModal
          suspended={playback.busy}
          player={me}
          {...payment}
          error={error}
          onClose={closePayment}
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
    </RoomLayout>
  );
}
