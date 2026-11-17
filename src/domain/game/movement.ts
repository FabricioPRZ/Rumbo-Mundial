import { BOARD, PRISON_BAIL, SALARY } from "./board";
import { addLog } from "./events";
import { charge } from "./settlement";
import type { Game, Player } from "./types";

export function jail(
  s: Game,
  p: Player,
  detention: "prison" | "oceania" = "prison",
  turns = 3,
) {
  const from = p.position;
  p.position = detention === "prison" ? 30 : 10;
  p.detention = detention;
  p.jailed = turns;
  if (detention === "oceania") s.detentionDecision = p.id;
  p.salary = 0;
  if (detention === "prison") {
    charge(s, p, PRISON_BAIL, null);
    const debt = (s.debts?.length ? s.debts[s.debts.length - 1] : s.debt)!;
    debt.reason = "bail";
  }
  s.extra = false;
  s.doubles = 0;
  s.phase = "end";
  s.motion = {
    serial: (s.motion?.serial ?? 0) + 1,
    player: p.id,
    path: [p.position],
  };
  addLog(
    s,
    `${p.name} va a ${detention === "prison" ? "Cárcel" : "Deportado"} por ${turns} turnos.`,
    { type: "move", player: p.id, path: [p.position], from, teleport: true },
  );
}

export function move(s: Game, p: Player, steps: number) {
  const from = p.position;
  const path: number[] = [];
  for (let i = 0; i < steps; i++) {
    p.position = (p.position + 1) % 40;
    path.push(p.position);
    if (p.position === 0) {
      p.salary = (p.salary ?? 0) + SALARY;
      addLog(s, `${p.name} pasó por Salida: puede cobrar $${SALARY} antes de terminar su turno.`);
    }
  }
  s.motion = { serial: (s.motion?.serial ?? 0) + 1, player: p.id, path };
  if (path.length)
    addLog(
      s,
      `${p.name} avanza ${steps} casillas hasta ${BOARD[p.position].name}.`,
      { type: "move", player: p.id, path, from },
    );
}
