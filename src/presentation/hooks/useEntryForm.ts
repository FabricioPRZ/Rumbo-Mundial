"use client";
import { COLORS } from "@/domain/game/types";
import { roomApi } from "@/infrastructure/browser/room-api";
import { roomStorage } from "@/infrastructure/browser/room-storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function useEntryForm(room?: string) {
  const router = useRouter();
  const [mode, setMode] = useState<"create" | "join">(room ? "join" : "create");
  const [name, setName] = useState("");
  const [id, setId] = useState(room ?? "");
  const [color, setColor] = useState(COLORS[0]);
  const [duration, setDuration] = useState<0 | 30 | 60 | 90>(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const roomId = id.trim().toUpperCase();
      const data = mode === "create"
        ? await roomApi.create({ name, color, duration })
        : await roomApi.join(roomId, { name, token: roomStorage.read(roomId) ?? undefined });
      const target = data.id ?? roomId;
      roomStorage.write(target, data.playerToken);
      if (room) window.location.reload();
      else router.push(`/sala/${target}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo conectar.");
    } finally {
      setBusy(false);
    }
  }
  return { mode, setMode, name, setName, id, setId, color, setColor, duration, setDuration, error, busy, submit };
}
