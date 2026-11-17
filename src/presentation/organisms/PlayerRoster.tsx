"use client";
import { BOARD } from "@/domain/game/board";
import type { Game } from "@/domain/game/types";
import { useState } from "react";
import Button from "../atoms/Button";
export default function PlayerRoster({ game, selectProperty, onClose }: { game: Game; selectProperty: (id: number) => void; onClose: () => void }) {
  const [rosterIndex, setRosterIndex] = useState(0);
  const [rosterPage, setRosterPage] = useState(0);
  return (
              <div className="players-strip" aria-label="Propiedades de los viajeros"><Button className="panel-close" onClick={()=>onClose()}>Cerrar ×</Button><label>Viajero<select value={rosterIndex} onChange={(e)=>{setRosterIndex(Number(e.target.value));setRosterPage(0);}}>{game.players.map((p,i)=><option value={i} key={p.id}>{p.name}</option>)}</select></label>
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
                          <Button key={b.id} onClick={() => selectProperty(b.id)}>
                            {b.name}
                            {game.properties[b.id].mortgaged ? " · H" : ""}
                          </Button>
                        ))}
                      </div>
                      <div className="row"><Button disabled={!rosterPage} onClick={()=>setRosterPage(rosterPage-1)}>←</Button><span>Página {rosterPage+1}</span><Button disabled={(rosterPage+1)*4>=Object.values(game.properties).filter((a)=>a.owner===p.id).length} onClick={()=>setRosterPage(rosterPage+1)}>→</Button></div>
                    </details>
                  </div>
                ))}
              </div>
  );
}
