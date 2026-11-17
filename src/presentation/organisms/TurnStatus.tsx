import type { Game } from "@/domain/game/types";
import PlayerMarker from "../atoms/PlayerMarker";
export default function TurnStatus({ game, now }: { game: Game; now: number }) {
  const seconds = game.endsAt
    ? Math.max(0, Math.ceil((game.endsAt - now) / 1000))
    : null;
  const rollSeconds = game.status === "playing" && (game.opening || game.phase === "roll") && !game.debt && !game.auction && !game.choice && !game.detentionDecision
    ? Math.min(20, Math.max(0, Math.ceil(((game.rollDeadline ?? game.turnAt + 20000) - now) / 1000))) : null;
  return (
          <div className="status-strip">
            <span>
              <PlayerMarker color={game.players[game.turn].color} className="" />
              Turno de <b>{game.players[game.turn].name}</b>
            </span>
            {seconds !== null && (
              <span>
                Tiempo: {Math.floor(seconds / 60)}:
                {String(seconds % 60).padStart(2, "0")}
              </span>
            )}
            {rollSeconds !== null && <span className={`roll-countdown ${rollSeconds <= 5 ? "urgent" : ""}`} role="timer">{rollSeconds ? `${rollSeconds} s para tirar` : "Cambiando turno…"}</span>}
            <span>Viaje compartido · {game.players.filter((p) => !p.bankrupt).length} en juego</span>
          </div>
  );
}
