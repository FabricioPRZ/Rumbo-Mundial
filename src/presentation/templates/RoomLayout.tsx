import type { ReactNode } from "react";
export default function RoomLayout({ playing, sideOpen, rosterOpen, presenting, children }: { playing: boolean; sideOpen: boolean; rosterOpen: boolean; presenting: boolean; children: ReactNode }) {
  return <main className={`room ${playing ? "table-viewport" : ""} ${sideOpen ? "side-open" : ""} ${rosterOpen ? "roster-open" : ""} ${presenting ? "presentation-playing" : ""}`}>{children}<footer>Reglas y valores adaptados · Selecciona una casilla para conocer sus detalles.</footer></main>;
}
