"use client";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import Button from "../atoms/Button";
export default function RoomHeader({ id, controls }: { id: string; controls: ReactNode }) {
  const [notice, setNotice] = useState("");
  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setNotice("Copiado. Ya puedes invitar a tus amigos.");
    } catch {
      setNotice(`Copia este dato: ${value}`);
    }
  };
  return <>
      <header className="room-header">
        <Link href="/" className="brand">
          ✈ RUMBO MUNDIAL
        </Link>
        <div className="room-code">
          <span>
            SALA <b>{id}</b>
          </span>
          <Button onClick={() => void copy(id)}>Copiar ID</Button>
          <Button
            onClick={() => void copy(`${window.location.origin}/sala/${id}`)}
          >
            Copiar link
          </Button>
        </div>
        <div className="room-audio-controls">
          {controls}
        </div>
      </header>
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
  </>;
}
