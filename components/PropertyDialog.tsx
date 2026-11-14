"use client";
import { useEffect, useRef } from "react";
import PropertyCard from "./PropertyCard";
import type { Action, Game, Player } from "@/lib/game/types";
export default function PropertyDialog({ id, game, me, busy, send, onClose, suspended = false }: {
  id:number; game:Game; me:Player|undefined; busy:boolean;
  send:(a:Action)=>void; onClose:()=>void;
  suspended?: boolean;
}) {
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{
    if (suspended) dialog.current?.close();
    else if (!dialog.current?.open) dialog.current?.showModal();
  },[suspended]);
  return <dialog className="property-dialog" ref={dialog} onCancel={onClose} aria-label={`Tarjeta de propiedad`}>
    <button aria-label="Cerrar tarjeta" onClick={onClose}>Cerrar ×</button>
    <PropertyCard id={id} game={game} me={me} busy={busy} send={(a)=>{onClose();send(a);}}/>
  </dialog>;
}
