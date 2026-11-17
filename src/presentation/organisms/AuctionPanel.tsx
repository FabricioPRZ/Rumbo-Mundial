"use client";
import { BOARD, cash } from "@/domain/game/board";
import { auctionMinimum } from "@/domain/game/rules";
import type { Action, Game, Player } from "@/domain/game/types";
import { useState } from "react";
import ActionButton from "../molecules/ActionButton";
import TextField from "../molecules/TextField";
export default function AuctionPanel({ game, me, busy, send }: { game: Game; me: Player; busy: boolean; send: (action: Action) => void }) {
  const [offer, setOffer] = useState(500);
  const [buildSquare, setBuildSquare] = useState<number | null>(null);
  const options = game.auction?.buildingOptions?.[me.id];
  const destination = options?.includes(buildSquare ?? -1) ? buildSquare! : options?.[0];
  const minimumBid = game.auction ? auctionMinimum(destination ?? game.auction.square, game.auction.amount, !!game.auction.buildingOptions) : 500;
  const imprisoned = me.jailed > 0 && me.detention === "prison";
  const button = (label: string, action: Action, reason: string | null = null) => <ActionButton disabled={busy} disabledReason={reason ?? undefined} onClick={() => send(action)}>{label}</ActionButton>;
  if (!game.auction) return null;
  return <div className="auction-box">
        <span className="eyebrow">SUBASTA EN VIVO</span><h3>{game.auction.buildingOptions ? "Último edificio disponible" : BOARD[game.auction.square].name}</h3>
        <p>{game.auction.bidder ? `${game.players.find((p) => p.id === game.auction?.bidder)?.name} ofrece ${cash(game.auction.amount)}` : `Oferta inicial desde ${cash(minimumBid)}`}</p>
        <small>Quedan {Math.max(0, Math.ceil((game.auction.endsAt - Date.now()) / 1000))} s. Cada oferta añade 20 s.</small>
        {game.auction.passed.includes(me.id) ? <p className="notice">Ya rechazaste esta subasta. Tu ficha permanece en {BOARD[me.position].name}. Esperando a los demás viajeros.</p> : <>
        {game.auction.buildingOptions && options?.length ? <label>Construir en<select value={destination} onChange={(e)=>setBuildSquare(Number(e.target.value))}>{options.map((id)=><option key={id} value={id}>{BOARD[id].name}</option>)}</select></label> : null}
        <TextField label="Tu oferta" type="number" step="500" min={minimumBid} max={me.money} value={Math.max(offer,minimumBid)} onChange={(e) => setOffer(Number(e.target.value))}/>
        {button("Ofertar", {type:"bid",amount:Math.max(offer,minimumBid),square:destination}, imprisoned ? "No puedes comprar desde la cárcel." : game.auction.buildingOptions && !options?.length ? "No tienes un país listo para construir." : game.auction.passed.includes(me.id) ? "Te retiraste de esta subasta." : Math.max(offer,minimumBid)>me.money ? "Saldo insuficiente." : null)}
        {button("Pasar esta subasta", {type:"fold"}, imprisoned || game.auction.passed.includes(me.id) || game.auction.bidder === me.id ? "No disponible." : null)}
        </>}
        <small>La oferta ganadora se paga automáticamente al cerrar.</small>
      </div>;
}
