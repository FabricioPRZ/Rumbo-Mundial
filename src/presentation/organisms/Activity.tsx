"use client";
import { BOARD } from "@/domain/game/board";
import type { Game, GameEvent } from "@/domain/game/types";
import { useEffect } from "react";
import { Building } from "../atoms/Building";
import { Globe } from "../atoms/Globe";
import Dice from "../molecules/Dice";
export default function Activity({ game, event, lastRoll, onEvent }: {
  game: Game;
  event: GameEvent | null;
  lastRoll: GameEvent | null;
  onEvent?: (event: GameEvent) => void;
}) {
  useEffect(() => {
    if (event) onEvent?.(event);
  }, [event, onEvent]);
  const scene = event?.type === "move" ? null : event;
  const property=event?.square===undefined?null:BOARD[event.square];
  return <section className="activity" aria-label="Actividad compartida">
    <div className="shared-dice"><strong>{lastRoll?.text??"Preparando el despegue"}</strong><Dice values={lastRoll?.dice??game.dice}/></div>
    {scene&&<div className="table-scene" key={scene.id} role="status" aria-live="polite">
      <div className={`scene-content scene-${scene.type}`}>
        <span className="eyebrow">{scene.type==="roll"?"LOS DADOS DECIDEN":scene.type==="card"?scene.deck==="email"?"CORREO RECIBIDO":"NUEVO MENSAJE":scene.type==="purchase"?"NUEVA PROPIEDAD":"EN NUESTRA MESA"}</span>
        {scene.dice?<Dice values={scene.dice} rollId={scene.id}/>:scene.type==="card"?<div className="scene-envelope" aria-hidden="true">{scene.deck==="email"?"✉":"☏"}</div>:scene.text.includes("construyó")?<div className="scene-building"><Building hotel={Object.values(game.properties).some((p)=>p.buildings===5)}/></div>:<Globe className="scene-globe"/>}
        {property&&<div className="scene-flag">{property.flag??"✈"}</div>}
        <h2>{scene.text}</h2>
        <small className="scene-auto-close">El viaje continúa automáticamente</small>
      </div>
    </div>}
  </section>;
}
