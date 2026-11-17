"use client";
import { BOARD, cash } from "@/domain/game/board";
import { liquidationValue, netWorth } from "@/domain/game/rules";
import type { Action, Game, Player } from "@/domain/game/types";
import { useEffect, useState } from "react";

import { CountryArt } from "../atoms/CountryArt";
import PlayerMarker from "../atoms/PlayerMarker";
import ActionButton from "../molecules/ActionButton";
import AuctionPanel from "./AuctionPanel";
import PropertyInventory from "./PropertyInventory";
export default function PlayerPanel({ game, me, busy, send, onTrade, onSelect }: {
  game: Game; me: Player; busy: boolean; send: (a: Action) => void;
  onTrade: () => void; onSelect: (id: number) => void;
}) {
  const [panelTab, setPanelTab] = useState<"turn" | "assets">("turn");
  const auctionSquare = game.auction?.square;
  useEffect(() => {
    if (me.jailed || auctionSquare !== undefined) setPanelTab("turn");
  }, [me.jailed, auctionSquare]);
  const active = game.players[game.turn], mine = active.id === me.id && !me.bankrupt;
  const debt = game.debt && (game.debt.payer ?? active.id) === me.id ? game.debt : null;
  const imprisoned = me.jailed > 0 && me.detention === "prison";
  const button = (label: string, action: Action, reason: string | null = null) => <ActionButton disabled={busy} disabledReason={reason ?? undefined} onClick={() => send(action)}>{label}</ActionButton>;
  const properties = BOARD.filter((b) => game.properties[b.id]?.owner === me.id);
  return <section className={`panel player-panel ${mine ? "my-turn" : ""}`}>
    <p className="eyebrow">{game.opening ? "ELIGE QUIÉN DESPEGA" : mine ? "ES TU TURNO" : `VIAJA ${active.name}`}</p>
    <div className="row"><h2><PlayerMarker color={me.color} />{me.name}</h2><span className="balance">{cash(me.money)}</span></div>
    <small>Patrimonio neto: {cash(netWorth(game, me))} · {properties.length} propiedades</small>
    <div className="tabs player-tabs"><button aria-pressed={panelTab === "turn"} onClick={()=>setPanelTab("turn")}>Mi turno</button><button aria-pressed={panelTab === "assets"} onClick={()=>setPanelTab("assets")}>Propiedades ({properties.length})</button></div>
    <div hidden={panelTab !== "turn"}>
    {me.acquisitionCard && <p className="notice">Tienes un permiso de adquisición. Selecciona el último país que te falte para completar un bloque.</p>}
    {me.rentBonus && <p className="notice">La próxima renta de un país sin edificios se duplica.</p>}
    {me.jailed > 0 && <div className="detention"><strong>{imprisoned ? "Cárcel" : "Deportado"}</strong><p>Quedan {me.jailed} turnos completos. Los dobles no reducen la estancia.</p><div className="detention-steps" aria-label={`${me.jailed} turnos pendientes`}>{[1,2,3].map((i) => <span key={i} className={i <= me.jailed ? "pending" : ""}>{i <= me.jailed ? "▥" : "✓"}</span>)}</div></div>}
    {!!me.skipTurns && <p>Estancia por carta: {me.skipTurns} turnos pendientes.</p>}
    {me.jailed > 0 && me.passes.length > 0 && !game.auction && button("Usar pase diplomático", {type:"pass"})}
    {mine && !!me.salary && <small>El Banco cobrará tu sueldo de {cash(me.salary)} automáticamente al cerrar el turno.</small>}
    {me.bankrupt ? <p>Terminó tu viaje. Puedes seguir viendo la partida.</p> : <div className="actions">
      {game.opening ? <>
        <p>El número más alto inicia. En caso de empate vuelven a tirar los finalistas.</p>
        {game.opening.candidates.map((id) => <div className="row" key={id}><span>{game.players.find((p) => p.id === id)?.name}</span><b>{game.opening?.rolls[id] ?? "Por tirar"}</b></div>)}
        {button("Tirar dado de salida", {type:"opening-roll"}, !game.opening.candidates.includes(me.id) ? "Espera el desempate." : game.opening.rolls[me.id] !== undefined ? "Esperando a los demás." : null)}
      </> : game.auction ? <AuctionPanel game={game} me={me} busy={busy} send={send} /> : debt ? <>
        <p className="error">Pago pendiente: {cash(debt.amount)}. Puedes seleccionar billetes o reunir dinero administrando tus propiedades.</p>
        {button("Seleccionar billetes y pagar", {type:"settle"}, me.money < debt.amount ? "Primero reúne el importe completo." : null)}
        {button("Declarar quiebra", {type:"bankrupt"}, liquidationValue(game, me) >= debt.amount ? "Tus activos todavía pueden cubrir el pago." : null)}
      </> : game.debt ? <p className="notice">Esperando el pago de {game.players.find((p) => p.id === (game.debt?.payer ?? active.id))?.name}.</p> : game.choice ? <>
        <p>Elige al viajero que te pagará {cash(game.choice.amount)}.</p>
        {game.choice.player === me.id ? game.players.filter((p) => p.id !== me.id && !p.bankrupt).map((p) => <button key={p.id} onClick={() => send({type:"collect",target:p.id})} disabled={busy}>{p.name}</button>) : <small>Esperando la elección de {active.name}.</small>}
      </> : <>
        {game.phase === "roll" && (me.jailed || me.skipTurns) && mine ? button("Cumplir un turno de espera", {type:"wait"}) : game.phase === "roll" && button("✦ Tirar los dados", {type:"roll"}, mine ? null : "Espera tu turno.")}
        {mine && me.jailed > 0 && !imprisoned && button("Pagar $5,000 y volver a Salida", {type:"bail"}, me.money < 5000 ? "Saldo insuficiente." : null)}
        {mine && game.phase === "buy" && <div className="buy-scene"><div className="scene-country"><CountryArt id={me.position} /><span>{BOARD[me.position].flag ?? "✈"}</span><h2>{BOARD[me.position].name}</h2><p>¿Agregamos este destino a tu viaje?</p></div>
          {button(`Comprar ${BOARD[me.position].name} · ${cash(BOARD[me.position].price)}`, {type:"buy"}, me.money < BOARD[me.position].price ? "Saldo insuficiente." : null)}
          {button("Rechazar y subastar para los demás", {type:"decline"})}
        </div>}
        {mine && game.detentionDecision === me.id && button("Quedarme · esperar 3 turnos", {type:"stay"})}
        {mine && game.phase === "end" && !game.detentionDecision && <p role="status">{game.extra ? "Tu tiro extra se habilitará automáticamente." : "El turno terminará automáticamente."}</p>}
      </>}
    </div>}
    {!me.bankrupt && <button className="trade-trigger" onClick={onTrade} disabled={busy || !!game.debt || !!game.auction || !!game.opening || imprisoned} title={imprisoned ? "En la cárcel no puedes negociar." : "Ofrece dinero y propiedades, incluso fuera de tu turno."}>⇄ Proponer trato</button>}
    </div><div hidden={panelTab !== "assets"}>
    <PropertyInventory game={game} me={me} onSelect={onSelect} />
    </div>
  </section>;
}
