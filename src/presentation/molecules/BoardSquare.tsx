import { cash } from "@/domain/game/board";
import type { Game, Player, Square } from "@/domain/game/types";
import { Building } from "../atoms/Building";
import Button from "../atoms/Button";
import { CountryArt } from "../atoms/CountryArt";
import { coordinates } from "../services/board-geometry";
export default function BoardSquare({ square: b, property: a, owner, active, onSelect }: {
  square: Square; property?: Game["properties"][number]; owner?: Player; active: boolean; onSelect: (id: number) => void;
}) {
  const icons: Record<string, string> = {
    start: "⚑",
    oceania: "↩",
    rest: "🏝",
    "go-oceania": "▥",
    email: "✉",
    sms: "☏",
    tax: "$",
    airline: "✈",
    utility: "⚖",
  };
  const [x, y] = coordinates(b.id);
  return (
              <Button
                                onClick={() => onSelect(b.id)}
                className={`square ${b.kind} ${active ? "current-square" : ""}`}
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                  borderColor: owner?.color,
                  boxShadow: owner ? `inset 0 -4px ${owner.color}` : undefined,
                }}
                aria-label={`${b.name}${b.group ? `, grupo ${b.group}` : ""}${a?.owner ? `, de ${owner?.name}` : ""}${a?.mortgaged ? ", hipotecada" : ""}`}
              >
                <span
                  className="stripe"
                  style={{ background: b.color ?? "transparent" }}
                />
                <span className="square-icon">{b.kind === "country" ? <CountryArt id={b.id} /> : icons[b.kind]}</span>
                <strong>{b.color && <span className="group-marker" style={{ background: b.color }} aria-hidden="true" />}{b.name}</strong>
                <small>
                  {b.price ? cash(b.price) : b.tax ? cash(b.tax) : ""}
                </small>
                {a?.buildings ? (
                  <span className="buildings">
                    {a.buildings === 5 ? <Building hotel /> : Array.from({ length: a.buildings }, (_, i) => <Building key={i} />)}
                  </span>
                ) : null}
                {a?.mortgaged && <span className="mortgage-badge">H</span>}
              </Button>
  );
}
