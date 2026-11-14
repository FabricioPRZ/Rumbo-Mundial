import Image from "next/image";
import { COUNTRY_ART } from "@/lib/game/art";
import type { CSSProperties } from "react";

/** Original vector artwork: no downloaded illustration or reference photograph. */
export function Globe({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 360 240" fill="none" aria-hidden="true">
    <ellipse cx="180" cy="218" rx="94" ry="12" fill="currentColor" opacity=".08" />
    <circle cx="180" cy="112" r="94" fill="#d7efeb" stroke="#217b7b" strokeWidth="2" />
    <ellipse cx="180" cy="112" rx="48" ry="94" stroke="#8bc3b7" />
    <ellipse cx="180" cy="112" rx="82" ry="94" stroke="#8bc3b7" />
    <path d="M86 112h188M100 64h160M100 160h160M180 18v188" stroke="#8bc3b7" />
    <path d="m115 46 22-10 15 8 9 23-8 12-13 2 3 17-10 13-18-7-3-14-13-9 4-18zm28 69 24 5 14 17-8 27-17 25-8-8-1-23-11-18zm51-71 18-9 25 13-3 12 20 13 8 21-14 10-23-6-9 12-10-8 4-19-18-10zm1 61 21 4 14 24-10 27-12 5-14-23-8-23zm43 54 22 4 8 15-18 8-19-8z" fill="#60a695" />
    <path d="M54 151C16 185 53 210 151 183s180-95 153-119c-10-8-26-8-42-4" stroke="#e5914c" strokeWidth="3" strokeDasharray="6 6" />
    <g transform="translate(290 65) rotate(-35)"><path d="m0-18 5 13 18 10v5L5 6l-1 13 7 6v4L0 25l-11 4v-4l7-6-1-13-18 4V5L-5-5z" fill="#203f59" stroke="#fff" strokeWidth="2" /></g>
    <circle cx="130" cy="101" r="5" fill="#e77753" stroke="white" strokeWidth="2" />
    <circle cx="227" cy="69" r="5" fill="#e77753" stroke="white" strokeWidth="2" />
  </svg>;
}
export function Building({ hotel = false }: { hotel?: boolean }) {
  return <svg className={`building-piece ${hotel ? "hotel" : "house"}`} viewBox="0 0 32 32" aria-label={hotel ? "Hotel" : "Casa"} role="img">
    {hotel ? <><path d="M7 6h19v23H7z" fill="#c66646"/><path d="M3 10 7 6v23l-4-3z" fill="#91442e"/><path d="M5 4h23v4H5z" fill="#edab70"/><path d="M11 11h4v4h-4zm7 0h4v4h-4zm-7 7h4v4h-4zm7 0h4v4h-4z" fill="#ffedbc"/><path d="M14 24h5v5h-5z" fill="#723c37"/></> : <><path d="M5 15 17 5l12 10v14H5z" fill="#5db6a2"/><path d="M2 15 16 3l15 12-3 3L16 8 5 18z" fill="#216c68"/><path d="M10 20h6v9h-6zm10-3h5v6h-5z" fill="#fff0b8"/></>}
  </svg>;
}
export function Banknote({ value, compact = false }: { value: number; compact?: boolean }) {
  const palette: Record<number, string> = {50000:"#a883c7",10000:"#75a99d",5000:"#77a8c7",2000:"#d5a16a",1000:"#d58e99",500:"#afad71"};
  return <span className={`note-art ${compact ? "compact" : ""}`} style={{ "--note-color": palette[value] ?? "#9aa7ab" } as CSSProperties}>
    <span className="note-label">BANCO DEL VIAJERO</span><span className="note-orbit" aria-hidden="true">✈</span>
    <strong>${value.toLocaleString("es-MX")}</strong><span className="note-serial">RM · CRÉDITOS DE VIAJE</span>
  </span>;
}

export function CountryArt({ id }: { id: number }) {
  const art = COUNTRY_ART[id];
  if (!art) return null;
  return <Image className="country-art" src={art.src} alt={`Ilustración de ${art.name}`} width={960} height={640} sizes="(max-width: 780px) 90vw, 430px" />;
}
