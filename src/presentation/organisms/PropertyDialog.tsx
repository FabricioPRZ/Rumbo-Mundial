"use client";
import Button from "../atoms/Button";
import Dialog from "../molecules/Dialog";

import type { Action, Game, Player } from "@/domain/game/types";
import PropertyCard from "./PropertyCard";
export default function PropertyDialog({ id, game, me, busy, send, onClose, suspended = false }: {
  id:number; game:Game; me:Player|undefined; busy:boolean;
  send:(a:Action)=>void; onClose:()=>void;
  suspended?: boolean;
}) {
  return <Dialog suspended={suspended} onDismiss={onClose} className="property-dialog"   aria-label={`Tarjeta de propiedad`}>
    <Button aria-label="Cerrar tarjeta" onClick={onClose}>Cerrar ×</Button>
    <PropertyCard id={id} game={game} me={me} busy={busy} send={(a)=>{onClose();send(a);}}/>
  </Dialog>;
}
