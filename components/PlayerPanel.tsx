"use client";
import { useState } from "react";
import { BOARD, cash } from "@/lib/game/board";
import { bankStock, liquidationValue, netWorth } from "@/lib/game/rules";
import type { Action, Game, Player } from "@/lib/game/types";

import { CountryArt } from "./TravelArt";
export default function PlayerPanel({ game, me, busy, send, onTrade, onSelect }: {
  game: Game; me: Player; busy: boolean; send: (a: Action) => void;
  onTrade: () => void; onSelect: (id: number) => void;
}) {
  const [panelTab, setPanelTab] = useState<"turn" | "assets">("turn");
  const [offer, setOffer] = useState(500);
  const [buildSquare, setBuildSquare] = useState<number | null>(null);
  const options = game.auction?.buildingOptions?.[me.id];
  const destination = options?.includes(buildSquare ?? -1) ? buildSquare! : options?.[0];
  const minimumBid = Math.max((game.auction?.amount ?? 0) + 500, destination === undefined ? 0 : BOARD[destination].buildCost);
  const active = game.players[game.turn], mine = active.id === me.id && !me.bankrupt;
  const debt = game.debt && (game.debt.payer ?? active.id) === me.id ? game.debt : null;
  const imprisoned = me.jailed > 0 && me.detention === "prison";
  const stock = bankStock(game);
  const button = (label: string, action: Action, reason: string | null = null) => <div>
    <button className="primary" disabled={busy || !!reason} title={reason ?? ""} onClick={() => send(action)}>{label}</button>
    {reason && <small>{reason}</small>}
  </div>;
  const properties = BOARD.filter((b) => game.properties[b.id]?.owner === me.id);
  const [propertyPage, setPropertyPage] = useState(0);
  const visiblePage = Math.min(propertyPage, Math.max(0, Math.ceil(properties.length / 4) - 1));
  return <section className={`panel player-panel ${mine ? "my-turn" : ""}`}>
    <p className="eyebrow">{game.opening ? "ELIGE QUIÉN DESPEGA" : mine ? "ES TU TURNO" : `VIAJA ${active.name}`}</p>
    <div className="row"><h2><i className="player-dot" style={{background:me.color}} />{me.name}</h2><span className="balance">{cash(me.money)}</span></div>
    <small>Patrimonio neto: {cash(netWorth(game, me))} · {properties.length} propiedades</small>
    <div className="tabs player-tabs"><button aria-pressed={panelTab === "turn"} onClick={()=>setPanelTab("turn")}>Mi turno</button><button aria-pressed={panelTab === "assets"} onClick={()=>setPanelTab("assets")}>Propiedades ({properties.length})</button></div>
    <div hidden={panelTab !== "turn"}>
    {me.acquisitionCard && <p className="notice">Tienes un permiso de adquisición. Selecciona el último país que te falte para completar un bloque.</p>}
    {me.rentBonus && <p className="notice">La próxima renta de un país sin edificios se duplica.</p>}
    {me.jailed > 0 && <div className="detention"><strong>{imprisoned ? "Cárcel" : "Deportado"}</strong><p>Quedan {me.jailed} turnos completos. Los dobles no reducen la estancia.</p><div className="detention-steps" aria-label={`${me.jailed} turnos pendientes`}>{[1,2,3].map((i) => <span key={i} className={i <= me.jailed ? "pending" : ""}>{i <= me.jailed ? "▥" : "✓"}</span>)}</div></div>}
    {!!me.skipTurns && <p>Estancia por carta: {me.skipTurns} turnos pendientes.</p>}
    {me.jailed > 0 && me.passes.length > 0 && !game.auction && button("Usar pase diplomático", {type:"pass"})}
    {mine && !!me.salary && !game.auction && button(`Cobrar sueldo · ${cash(me.salary)}`, {type:"salary"})}
    {me.bankrupt ? <p>Terminó tu viaje. Puedes seguir viendo la partida.</p> : <div className="actions">
      {game.opening ? <>
        <p>El número más alto inicia. En caso de empate vuelven a tirar los finalistas.</p>
        {game.opening.candidates.map((id) => <div className="row" key={id}><span>{game.players.find((p) => p.id === id)?.name}</span><b>{game.opening?.rolls[id] ?? "Por tirar"}</b></div>)}
        {button("Tirar dado de salida", {type:"opening-roll"}, !game.opening.candidates.includes(me.id) ? "Espera el desempate." : game.opening.rolls[me.id] !== undefined ? "Esperando a los demás." : null)}
      </> : game.auction ? <div className="auction-box">
        <span className="eyebrow">SUBASTA EN VIVO</span><h3>{game.auction.buildingOptions ? "Último edificio disponible" : BOARD[game.auction.square].name}</h3>
        <p>{game.auction.bidder ? `${game.players.find((p) => p.id === game.auction?.bidder)?.name} ofrece ${cash(game.auction.amount)}` : "Oferta inicial desde $500"}</p>
        <small>Quedan {Math.max(0, Math.ceil((game.auction.endsAt - Date.now()) / 1000))} s. Cada oferta añade 20 s.</small>
        {game.auction.buildingOptions && options?.length ? <label>Construir en<select value={destination} onChange={(e)=>setBuildSquare(Number(e.target.value))}>{options.map((id)=><option key={id} value={id}>{BOARD[id].name}</option>)}</select></label> : null}
        <label>Tu oferta<input type="number" step="500" min={game.auction.amount+500} max={me.money} value={Math.max(offer,minimumBid)} onChange={(e) => setOffer(Number(e.target.value))}/></label>
        {button("Ofertar", {type:"bid",amount:Math.max(offer,minimumBid),square:destination}, imprisoned ? "No puedes comprar desde la cárcel." : game.auction.buildingOptions && !options?.length ? "No tienes un país listo para construir." : game.auction.passed.includes(me.id) ? "Te retiraste de esta subasta." : Math.max(offer,minimumBid)>me.money ? "Saldo insuficiente." : null)}
        {button("Pasar esta subasta", {type:"fold"}, imprisoned || game.auction.passed.includes(me.id) || game.auction.bidder === me.id ? "No disponible." : null)}
        <small>La oferta ganadora se paga automáticamente al cerrar.</small>
      </div> : debt ? <>
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
          {button("Enviar a subasta", {type:"decline"})}
        </div>}
        {game.phase === "end" && button(game.extra ? "Continuar · tiro extra" : "Terminar turno →", {type:"end"}, mine ? null : "Espera tu turno.")}
        {mine && !!me.salary && <small>Si terminas el turno sin cobrar el sueldo, lo pierdes.</small>}
      </>}
    </div>}
    {!me.bankrupt && <button className="trade-trigger" onClick={onTrade} disabled={busy || !!game.debt || !!game.auction || !!game.opening || imprisoned} title={imprisoned ? "En la cárcel no puedes negociar." : "Ofrece dinero y propiedades, incluso fuera de tu turno."}>⇄ Proponer trato</button>}
    </div><div hidden={panelTab !== "assets"}>
    <h3>Mi pasaporte de propiedades</h3>
    <div className="owned">{properties.slice(visiblePage*4,visiblePage*4+4).map((b) => <button key={b.id} style={{borderLeftColor:b.color ?? "#777"}} onClick={() => onSelect(b.id)}>{b.flag} {b.name}<span>{game.properties[b.id].mortgaged ? "Hipotecada" : game.properties[b.id].buildings === 5 ? "Hotel" : game.properties[b.id].buildings ? `${game.properties[b.id].buildings} casas` : ""}</span></button>)}
      {!properties.length && <small>Tu primera escala te espera.</small>}
    </div>
    {properties.length>4 && <div className="row"><button disabled={!visiblePage} onClick={()=>setPropertyPage(visiblePage-1)}>←</button><small>{visiblePage+1} / {Math.ceil(properties.length/4)}</small><button disabled={(visiblePage+1)*4>=properties.length} onClick={()=>setPropertyPage(visiblePage+1)}>→</button></div>}
    <small className="bank-stock">Banco · {stock.houses} casas · {stock.hotels} hoteles disponibles</small>
    </div>
  </section>;
}
