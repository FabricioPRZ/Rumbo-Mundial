import type { CSSProperties } from "react";
export function Banknote({ value, compact = false }: { value: number; compact?: boolean }) {
  const palette: Record<number, string> = {50000:"#a883c7",10000:"#75a99d",5000:"#77a8c7",2000:"#d5a16a",1000:"#d58e99",500:"#afad71"};
  return <span className={`note-art ${compact ? "compact" : ""}`} style={{ "--note-color": palette[value] ?? "#9aa7ab" } as CSSProperties}>
    <span className="note-label">BANCO DEL VIAJERO</span><span className="note-orbit" aria-hidden="true">✈</span>
    <strong>${value.toLocaleString("es-MX")}</strong><span className="note-serial">RM · CRÉDITOS DE VIAJE</span>
  </span>;
}

