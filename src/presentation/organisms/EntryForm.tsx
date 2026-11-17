"use client";
import { COLORS } from "@/domain/game/types";
import Button from "../atoms/Button";
import { useEntryForm } from "../hooks/useEntryForm";
import TextField from "../molecules/TextField";
export default function EntryForm({ room }: { room?: string }) {
  const { mode, setMode, name, setName, id, setId, color, setColor, duration, setDuration, error, busy, submit } = useEntryForm(room);
  return (
    <form onSubmit={submit} className="entry panel">
      {!room && (
        <div className="tabs">
          <Button
            type="button"
            aria-pressed={mode === "create"}
            onClick={() => setMode("create")}
          >
            Crear sala
          </Button>
          <Button
            type="button"
            aria-pressed={mode === "join"}
            onClick={() => setMode("join")}
          >
            Unirse a sala
          </Button>
        </div>
      )}
      <h2>
        {mode === "create" ? "Tu próxima gran aventura" : "Tu lugar en la mesa"}
      </h2>
      <TextField label="Tu nombre"
          required
          maxLength={24}
          autoComplete="nickname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="¿Cómo te llamas?" />
      {mode === "join" ? (
        <TextField label="ID de sala"
            required
            pattern="[A-HJ-NP-Z2-9]{6}"
            maxLength={6}
            value={id}
            onChange={(e) => setId(e.target.value.toUpperCase())}
            placeholder="ABC234" />
      ) : (
        <>
          <fieldset>
            <legend>Elige tu avión</legend>
            <div className="colors">
              {COLORS.map((c, i) => (
                <Button
                  type="button"
                  key={c}
                  style={{ background: c }}
                  aria-label={`Color ${i + 1}`}
                  aria-pressed={color === c}
                  onClick={() => setColor(c)}
                >
                  ✈
                </Button>
              ))}
            </div>
          </fieldset>
          <label>
            Duración
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value) as 0 | 30 | 60 | 90)}
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
      <Button type="submit" className="primary" disabled={busy}>
        {busy
          ? "Preparando el viaje…"
          : mode === "create"
            ? "Crear mi sala ↗"
            : "Entrar a la sala ↗"}
      </Button>
      <small>De 2 a 6 amigos. Una sala, todo el mundo.</small>
    </form>
  );
}
