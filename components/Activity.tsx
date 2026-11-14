"use client";
import { useEffect, useRef, useState } from "react";
import type { Game, GameEvent } from "@/lib/game/types";
import Dice from "./Dice";
import { Globe, Building } from "./TravelArt";
import { BOARD } from "@/lib/game/board";
export default function Activity({ game }: { game: Game }) {
  const [queue,setQueue]=useState<GameEvent[]>([]);
  const seen=useRef(game.eventSerial??0);
  useEffect(()=>{
    const fresh=(game.events??[]).filter((e)=>e.id>seen.current && e.type!=="move");
    seen.current=game.eventSerial??0;
    if(fresh.length)setQueue((q)=>[...q,...fresh]);
  },[game.events,game.eventSerial]);
  const event=queue[0];
  useEffect(()=>{
    if(!event)return;
    const timer=setTimeout(()=>setQueue((q)=>q.slice(1)),event.type==="card"?6500:event.type==="roll"?2600:3400);
    return()=>clearTimeout(timer);
  },[event]);
  const lastRoll=[...(game.events??[])].reverse().find((e)=>e.type==="roll");
  const property=event?.square===undefined?null:BOARD[event.square];
  return <section className="activity" aria-label="Actividad compartida">
    <div className="shared-dice"><strong>{lastRoll?.text??"Preparando el despegue"}</strong><Dice values={lastRoll?.dice??game.dice}/></div>
    {event&&<div className="table-scene" key={event.id} role="status" aria-live="polite">
      <div className={`scene-content scene-${event.type}`}>
        <span className="eyebrow">{event.type==="roll"?"LOS DADOS DECIDEN":event.type==="card"?event.deck==="email"?"CORREO RECIBIDO":"NUEVO MENSAJE":event.type==="purchase"?"NUEVA PROPIEDAD":"EN NUESTRA MESA"}</span>
        {event.dice?<Dice values={event.dice} rollId={event.id}/>:event.type==="card"?<div className="scene-envelope" aria-hidden="true">{event.deck==="email"?"✉":"☏"}</div>:event.text.includes("construyó")?<div className="scene-building"><Building hotel={Object.values(game.properties).some((p)=>p.buildings===5)}/></div>:<Globe className="scene-globe"/>}
        {property&&<div className="scene-flag">{property.flag??"✈"}</div>}
        <h2>{event.text}</h2>
        <button onClick={()=>setQueue((q)=>q.slice(1))}>Continuar{queue.length>1?` · ${queue.length-1} acontecimientos`:""}</button>
      </div>
    </div>}
  </section>;
}
