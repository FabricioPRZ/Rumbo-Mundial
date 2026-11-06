import { INITIAL_BILLS, pay, exchange } from "./money";
import type { GameEvent } from "./types";
import { BOARD } from "./board";
import { CARDS } from "./cards";
import { assetError, group, liquidationValue, netWorth, rent } from "./rules";
import {
  COLORS,
  type Action,
  type Context,
  type Game,
  type Player,
} from "./types";
function requireRule(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error(message);
}
export function addLog(
  s: Game,
  text: string,
  event: Omit<GameEvent, "id" | "text"> = { type: "log" },
) {
  s.log = [...s.log, text].slice(-50);
  s.eventSerial = (s.eventSerial ?? 0) + 1;
  s.events = [...(s.events ?? []), { ...event, id: s.eventSerial, text }].slice(
    -100,
  );
}
export function newGame(id: string, host: Player, duration: number): Game {
  return {
    id,
    version: 1,
    host: host.id,
    status: "lobby",
    players: [host],
    properties: Object.fromEntries(
      BOARD.filter((b) => b.price).map((b) => [
        b.id,
        { owner: null, buildings: 0, mortgaged: false },
      ]),
    ),
    turn: 0,
    phase: "roll",
    doubles: 0,
    extra: false,
    dice: [1, 1],
    debt: null,
    trades: [],
    decks: { email: [], sms: [] },
    log: [`${host.name} creó la sala.`],
    duration,
    endsAt: null,
    turnAt: 0,
    winner: [],
    motion: null,
    lastCard: null,
    events: [],
    eventSerial: 0,
    eliminated: [],
  };
}
export function newPlayer(id: string, name: string, color: string): Player {
  return {
    id,
    name,
    color,
    money: 1500,
    position: 0,
    jailed: 0,
    bankrupt: false,
    passes: [],
    bills: { ...INITIAL_BILLS },
  };
}
function nextTurn(s: Game, now: number) {
  s.debt = null;
  s.doubles = 0;
  s.extra = false;
  s.phase = "roll";
  s.turnAt = now;
  for (let i = 0; i < s.players.length; i++) {
    s.turn = (s.turn + 1) % s.players.length;
    if (!s.players[s.turn].bankrupt) break;
  }
}
export function finishByTime(state: Game, now: number): Game {
  if (state.status !== "playing" || !state.endsAt || now < state.endsAt)
    return state;
  const s = structuredClone(state),
    active = s.players.filter((p) => !p.bankrupt);
  const score = (p: Player) =>
    netWorth(s, p) -
    (s.debt && s.players[s.turn].id === p.id ? s.debt.amount : 0);
  const best = Math.max(...active.map(score));
  s.winner = active.filter((p) => score(p) === best).map((p) => p.id);
  s.status = "finished";
  s.trades = [];
  addLog(s, "Terminó el tiempo. Se compara el patrimonio neto.");
  return s;
}
function winner(s: Game) {
  const alive = s.players.filter((p) => !p.bankrupt);
  if (alive.length === 1) {
    s.status = "finished";
    s.winner = [alive[0].id];
    s.trades = [];
    addLog(s, `${alive[0].name} ganó la partida.`);
  }
}
function charge(s: Game, p: Player, amount: number, creditor: string | null) {
  if (amount <= 0) return;
  s.debt = { amount, creditor };
  addLog(
    s,
    `${p.name} debe pagar $${amount} a ${s.players.find((x) => x.id === creditor)?.name ?? "el Banco"}.`,
    { type: "payment", player: p.id },
  );
}
function jail(
  s: Game,
  p: Player,
  detention: "prison" | "oceania" = "prison",
) {
  const from = p.position;
  p.position = detention === "prison" ? 10 : 20;
  p.detention = detention;
  p.jailed = 3;
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
    `${p.name} va a ${detention === "prison" ? "Groenlandia" : "Oceanía"} por tres turnos.`,
    { type: "move", player: p.id, path: [p.position], from, teleport: true },
  );
}
function move(s: Game, p: Player, steps: number) {
  const from = p.position;
  const path: number[] = [];
  for (let i = 0; i < steps; i++) {
    p.position = (p.position + 1) % 40;
    path.push(p.position);
    if (p.position === 0) {
      p.money += 200;
      addLog(s, `${p.name} pasó por México y cobró $200.`);
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
function land(s: Game, p: Player) {
  const b = BOARD[p.position];
  s.phase = "end";
  if (b.kind === "go-oceania") {
    jail(s, p);
    return;
  }
  if (b.kind === "rest") {
    jail(s, p, "oceania");
    return;
  }
  if (b.kind === "tax") {
    charge(s, p, b.tax ?? 0, null);
    return;
  }
  if (b.price) {
    const a = s.properties[b.id];
    if (!a.owner) s.phase = "buy";
    else if (a.owner !== p.id)
      charge(s, p, rent(s, b.id, s.dice[0] + s.dice[1]), a.owner);
    return;
  }
  if (b.kind === "email" || b.kind === "sms") {
    const deck = s.decks[b.kind];
    const index = deck.shift();
    requireRule(index !== undefined, "Mazo vacío.");
    const c = CARDS[b.kind][index];
    s.lastCard = c.text;
    addLog(s, `${p.name} · ${b.name}: ${c.text}`, {
      type: "card",
      player: p.id,
      deck: b.kind,
    });
    if (c.kind === "pass") {
      p.passes.push(b.kind);
      return;
    }
    deck.push(index);
    if (c.kind === "money") {
      if (c.amount >= 0) p.money += c.amount;
      else charge(s, p, -c.amount, null);
    }
    if (c.kind === "jail") jail(s, p);
    if (c.kind === "repairs") {
      const amount = Object.values(s.properties)
        .filter((a) => a.owner === p.id)
        .reduce(
          (v, a) =>
            v + (a.buildings === 5 ? c.hotel : a.buildings * c.restaurant),
          0,
        );
      charge(s, p, amount, null);
    }
    if (c.kind === "move") {
      const steps = (c.target - p.position + BOARD.length) % BOARD.length;
      if (steps > 0) {
        move(s, p, steps);
        land(s, p);
      }
    }
  }
}
function eliminate(s: Game, p: Player, creditor: string | null) {
  const recipient = s.players.find((x) => x.id === creditor && !x.bankrupt);
  if (recipient) recipient.money += p.money;
  p.money = 0;
  p.bankrupt = true;
  p.eliminatedAt = s.version;
  s.eliminated = [...(s.eliminated ?? []), p.id];
  s.trades = s.trades.filter((t) => t.from !== p.id && t.to !== p.id);
  for (const a of Object.values(s.properties))
    if (a.owner === p.id) {
      a.owner = recipient?.id ?? null;
      if (!recipient) {
        a.buildings = 0;
        a.mortgaged = false;
      }
    }
  for (const deck of p.passes)
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
  p.passes = [];
  s.debt = null;
  addLog(s, `${p.name} se declaró en quiebra.`);
  winner(s);
}
export function engine(
  state: Game,
  action: Action,
  playerId: string,
  ctx: Context,
): Game {
  const timed = finishByTime(state, ctx.now);
  if (timed !== state) return timed;
  const s = structuredClone(state),
    p = s.players.find((x) => x.id === playerId);
  requireRule(
    p &&
      (!p.bankrupt ||
        (p.id === s.host &&
          (action.type === "skip" || action.type === "expel"))),
    "Jugador no disponible.",
  );
  if (action.type === "color") {
    requireRule(s.status === "lobby", "La partida ya inició.");
    requireRule(
      COLORS.includes(action.color) &&
        !s.players.some((x) => x.id !== p.id && x.color === action.color),
      "Color no disponible.",
    );
    p.color = action.color;
    return s;
  }
  if (action.type === "start") {
    requireRule(
      s.status === "lobby" && p.id === s.host,
      "Solo el anfitrión puede iniciar.",
    );
    requireRule(s.players.length >= 2, "Se necesitan al menos dos jugadores.");
    s.status = "playing";
    s.decks = structuredClone(ctx.shuffled);
    s.turnAt = ctx.now;
    s.endsAt = s.duration ? ctx.now + s.duration * 60000 : null;
    addLog(s, "Despegamos. Comienza la partida.");
    return s;
  }
  requireRule(s.status === "playing", "La partida no está activa.");
  if (action.type === "skip" || action.type === "expel") {
    requireRule(
      p.id === s.host && ctx.inactive,
      "Solo el anfitrión puede actuar tras 90 segundos de inactividad.",
    );
    const absent = s.players[s.turn];
    if (action.type === "expel") {
      eliminate(s, absent, s.debt?.creditor ?? null);
      if (s.status === "playing") nextTurn(s, ctx.now);
    } else {
      requireRule(
        !s.debt,
        "Hay una deuda pendiente; solo se puede declarar la quiebra.",
      );
      addLog(s, `Se saltó el turno de ${absent.name}.`);
      nextTurn(s, ctx.now);
    }
    return s;
  }
  if (action.type === "reject") {
    const t = s.trades.find((x) => x.id === action.trade);
    requireRule(
      t && (t.from === p.id || t.to === p.id),
      "Trato no disponible.",
    );
    s.trades = s.trades.filter((x) => x.id !== action.trade);
    return s;
  }
  if (action.type === "accept") {
    const t = s.trades.find((x) => x.id === action.trade);
    requireRule(t && t.to === p.id && !s.debt, "No puedes aceptar este trato.");
    const from = s.players.find((x) => x.id === t.from);
    requireRule(from && !from.bankrupt, "El oferente ya no está disponible.");
    validateTrade(s, from, p, t.give, t.take, t.giveMoney, t.takeMoney);
    from.money += t.takeMoney - t.giveMoney;
    p.money += t.giveMoney - t.takeMoney;
    for (const id of t.give) s.properties[id].owner = p.id;
    for (const id of t.take) s.properties[id].owner = from.id;
    s.trades = [];
    addLog(s, `${p.name} aceptó el trato de ${from.name}.`);
    return s;
  }
  if (action.type === "change") {
    exchange(p, action.denomination);
    return s;
  }
  if (action.type === "trade") {
    const to = s.players.find((x) => x.id === action.to);
    requireRule(
      to && !to.bankrupt && to.id !== p.id && !s.debt,
      "No puedes ofrecer este trato.",
    );
    validateTrade(
      s,
      p,
      to,
      action.give,
      action.take,
      action.giveMoney,
      action.takeMoney,
    );
    s.trades = [
      ...s.trades.filter((t) => t.from !== p.id),
      { ...action, id: `${s.version}-${p.id}`, from: p.id },
    ];
    addLog(s, `${p.name} propuso un trato a ${to.name}.`);
    return s;
  }
  requireRule(s.players[s.turn].id === p.id, "Espera tu turno.");
  if ("square" in action) {
    const err = assetError(s, p, action.square, action.type);
    requireRule(!err, err ?? "Acción ilegal.");
    const a = s.properties[action.square],
      b = BOARD[action.square];
    if (action.type === "build") {
      a.buildings++;
      pay(p, b.buildCost, action.bills);
    }
    if (action.type === "sell") {
      a.buildings--;
      p.money += b.buildCost / 2;
    }
    if (action.type === "mortgage") {
      a.mortgaged = true;
      p.money += b.mortgage;
    }
    if (action.type === "redeem") {
      a.mortgaged = false;
      pay(p, Math.ceil(b.mortgage * 1.1), action.bills);
    }
    if (action.type === "return") {
      p.money += a.mortgaged ? 0 : b.price / 2;
      a.owner = null;
      a.mortgaged = false;
    }
    const labels = {
      build: "construyó en",
      sell: "vendió un edificio de",
      mortgage: "hipotecó",
      redeem: "deshipotecó",
      return: "devolvió al Banco",
    };
    addLog(s, `${p.name} ${labels[action.type]} ${b.name}.`);
    return s;
  }
  if (action.type === "settle") {
    requireRule(
      s.debt && p.money >= s.debt.amount,
      "No tienes saldo para liquidar la deuda.",
    );
    const d = s.debt;
    s.debt = null;
    pay(p, d.amount, action.bills);
    const recipient = s.players.find((x) => x.id === d.creditor);
    if (recipient) recipient.money += d.amount;
    addLog(
      s,
      `${p.name} pagó $${d.amount} a ${recipient?.name ?? "el Banco"}.`,
      { type: "payment", player: p.id },
    );
    return s;
  }
  if (action.type === "bankrupt") {
    requireRule(s.debt, "No tienes una deuda pendiente.");
    requireRule(
      liquidationValue(s, p) < s.debt.amount,
      "Puedes cubrir la deuda vendiendo o hipotecando.",
    );
    requireRule(
      !Object.values(s.properties).some(
        (a) => a.owner === p.id && (a.buildings > 0 || !a.mortgaged),
      ),
      "Primero vende edificios e hipoteca o devuelve tus propiedades.",
    );
    eliminate(s, p, s.debt.creditor);
    if (s.status === "playing") nextTurn(s, ctx.now);
    return s;
  }
  requireRule(!s.debt, "Liquida tu deuda antes de continuar.");
  if (action.type === "bail") {
    requireRule(
      s.phase === "roll" && p.jailed > 0 && p.detention !== "oceania",
      "La multa solo permite salir de Groenlandia antes de tirar.",
    );
    pay(p, 50, action.bills);
    p.jailed = 0;
    addLog(s, `${p.name} pagó $50 y salió de Groenlandia.`);
    return s;
  }
  if (action.type === "wait") {
    requireRule(
      s.phase === "roll" && p.jailed > 0,
      "No tienes un turno de castigo pendiente.",
    );
    p.jailed--;
    s.phase = "end";
    s.extra = false;
    addLog(s, `${p.name} cumple un turno de castigo; quedan ${p.jailed}.`);
    return s;
  }
  if (action.type === "pass") {
    requireRule(
      s.phase === "roll" &&
        p.jailed > 0 &&
        p.passes.length &&
        p.detention !== "oceania",
      "No puedes usar una salida ahora.",
    );
    const deck = p.passes.shift()!;
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
    p.jailed = 0;
    addLog(s, `${p.name} usó una salida de Groenlandia.`);
    return s;
  }
  if (action.type === "roll") {
    requireRule(s.phase === "roll", "Ya tiraste los dados.");
    s.dice = ctx.dice;
    s.lastCard = null;
    const double = ctx.dice[0] === ctx.dice[1];
    addLog(
      s,
      `${p.name} tiró ${ctx.dice.join(" + ")} = ${ctx.dice[0] + ctx.dice[1]}.`,
      { type: "roll", player: p.id, dice: ctx.dice },
    );
    if (p.jailed) {
      s.extra = false;
      if (double && p.detention === "oceania") {
        p.jailed = 0;
        move(s, p, ctx.dice[0] + ctx.dice[1]);
        land(s, p);
      } else {
        p.jailed--;
        s.phase = "end";
        addLog(
          s,
          `${p.name} cumple un turno en ${p.detention === "oceania" ? "Oceanía" : "Groenlandia"}; quedan ${p.jailed}.`,
        );
      }
      return s;
    }
    s.doubles = double ? s.doubles + 1 : 0;
    s.extra = double;
    if (s.doubles === 3) {
      jail(s, p);
      return s;
    }
    move(s, p, ctx.dice[0] + ctx.dice[1]);
    land(s, p);
    return s;
  }
  if (action.type === "buy" || action.type === "decline") {
    requireRule(s.phase === "buy", "No hay compra pendiente.");
    if (action.type === "buy") {
      const b = BOARD[p.position],
        a = s.properties[b.id];
      requireRule(
        a && !a.owner && p.money >= b.price,
        "La propiedad no está disponible o falta saldo.",
      );
      pay(p, b.price, action.bills);
      a.owner = p.id;
      addLog(s, `${p.name} compró ${b.name} por $${b.price}.`, {
        type: "purchase",
        player: p.id,
        square: b.id,
      });
    }
    s.phase = "end";
    return s;
  }
  if (action.type === "end") {
    requireRule(s.phase === "end", "Resuelve la tirada o la compra primero.");
    if (s.extra) {
      s.phase = "roll";
      s.extra = false;
      s.turnAt = ctx.now;
    } else nextTurn(s, ctx.now);
    return s;
  }
  throw new Error("Acción desconocida.");
}
function validateTrade(
  s: Game,
  from: Player,
  to: Player,
  give: number[],
  take: number[],
  gm: number,
  tm: number,
) {
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
