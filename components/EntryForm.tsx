"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { COLORS } from "@/lib/game/types";
export default function EntryForm({ room }: { room?: string }) {
  const router = useRouter();
  const [mode, setMode] = useState<"create" | "join">(room ? "join" : "create");
  const [name, setName] = useState("");
  const [id, setId] = useState(room ?? "");
  const [color, setColor] = useState(COLORS[0]);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const roomId = id.trim().toUpperCase();
      const res = await fetch(
        mode === "create" ? "/api/rooms" : `/api/rooms/${roomId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            ...(mode === "create"
              ? { color, duration }
              : {
                  token: localStorage.getItem(`turista:${roomId}`) ?? undefined,
                }),
          }),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const target = data.id ?? roomId;
      localStorage.setItem(`turista:${target}`, data.playerToken);
      if (room) window.location.reload();
      else router.push(`/sala/${target}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo conectar.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="entry panel">
      {!room && (
        <div className="tabs">
          <button
            type="button"
            aria-pressed={mode === "create"}
            onClick={() => setMode("create")}
          >
            Crear sala
          </button>
          <button
            type="button"
            aria-pressed={mode === "join"}
            onClick={() => setMode("join")}
          >
            Unirse a sala
          </button>
        </div>
      )}
      <h2>
        {mode === "create" ? "Tu próxima gran aventura" : "Tu lugar en la mesa"}
      </h2>
      <label>
        Tu nombre
        <input
          required
          maxLength={24}
          autoComplete="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="¿Cómo te llamas?"
        />
      </label>
      {mode === "join" ? (
        <label>
          ID de sala
          <input
            required
            pattern="[A-HJ-NP-Z2-9]{6}"
            maxLength={6}
            value={id}
            onChange={(e) => setId(e.target.value.toUpperCase())}
            placeholder="ABC234"
          />
        </label>
      ) : (
        <>
          <fieldset>
            <legend>Elige tu avión</legend>
            <div className="colors">
              {COLORS.map((c, i) => (
                <button
                  type="button"
                  key={c}
                  style={{ background: c }}
                  aria-label={`Color ${i + 1}`}
                  aria-pressed={color === c}
                  onClick={() => setColor(c)}
                >
                  ✈
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            Duración
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
            >
              <option value={0}>Hasta el último viajero</option>
              {[30, 60, 90].map((n) => (
                <option key={n} value={n}>
                  {n} minutos
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <button className="primary" disabled={busy}>
        {busy
          ? "Preparando el viaje…"
          : mode === "create"
            ? "Crear mi sala ↗"
            : "Entrar a la sala ↗"}
      </button>
      <small>De 2 a 6 amigos. Una sala, todo el mundo.</small>
    </form>
  );
}
