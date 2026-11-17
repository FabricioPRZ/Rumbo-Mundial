"use client";
import { BOARD } from "@/domain/game/board";
import { bankStock } from "@/domain/game/rules";
import type { Game, Player } from "@/domain/game/types";
import { useState } from "react";
export default function PropertyInventory({ game, me, onSelect }: { game: Game; me: Player; onSelect: (id: number) => void }) {
  const properties = BOARD.filter((square) => game.properties[square.id]?.owner === me.id);
  const stock = bankStock(game);
  const [propertyPage, setPropertyPage] = useState(0);
  const visiblePage = Math.min(propertyPage, Math.max(0, Math.ceil(properties.length / 4) - 1));
  return <>
    <h3>Mi pasaporte de propiedades</h3>
    <div className="owned">{properties.slice(visiblePage*4,visiblePage*4+4).map((b) => <button key={b.id} style={{borderLeftColor:b.color ?? "#777"}} onClick={() => onSelect(b.id)}>{b.flag} {b.name}<span>{game.properties[b.id].mortgaged ? "Hipotecada" : game.properties[b.id].buildings === 5 ? "Hotel" : game.properties[b.id].buildings ? `${game.properties[b.id].buildings} casas` : ""}</span></button>)}
      {!properties.length && <small>Tu primera escala te espera.</small>}
    </div>
    {properties.length>4 && <div className="row"><button disabled={!visiblePage} onClick={()=>setPropertyPage(visiblePage-1)}>←</button><small>{visiblePage+1} / {Math.ceil(properties.length/4)}</small><button disabled={(visiblePage+1)*4>=properties.length} onClick={()=>setPropertyPage(visiblePage+1)}>→</button></div>}
    <small className="bank-stock">Banco · {stock.houses} casas · {stock.hotels} hoteles disponibles</small>
  </>;
}
