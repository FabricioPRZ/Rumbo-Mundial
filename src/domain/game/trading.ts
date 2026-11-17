import { requireRule } from "./assertions";
import { group } from "./rules";
import type { Game, Player } from "./types";

export function validateTrade(
  s: Game,
  from: Player,
  to: Player,
  give: number[],
  take: number[],
  gm: number,
  tm: number,
) {
  requireRule(!(from.jailed && from.detention === "prison") && !(to.jailed && to.detention === "prison"), "No se puede negociar con jugadores en la cárcel.");
  requireRule(
    Number.isSafeInteger(gm) &&
      Number.isSafeInteger(tm) &&
      gm >= 0 &&
      tm >= 0 &&
      from.money >= gm &&
      to.money >= tm,
    "Dinero del trato inválido.",
  );
  requireRule(give.length + take.length + gm + tm > 0, "El trato está vacío.");
  requireRule(
    new Set([...give, ...take]).size === give.length + take.length,
    "Propiedad repetida.",
  );
  for (const [ids, owner] of [
    [give, from.id],
    [take, to.id],
  ] as const)
    for (const id of ids) {
      const a = s.properties[id];
      requireRule(
        a &&
          a.owner === owner &&
          !a.buildings &&
          !group(id).some((b) => s.properties[b.id].buildings),
        "Las propiedades del trato deben pertenecer al jugador y tener todo su grupo sin edificios.",
      );
    }
}
