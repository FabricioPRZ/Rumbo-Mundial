import { INITIAL_BILLS, pay, exchange, credit } from "./money";
import type { GameEvent } from "./types";
import { BOARD, RULES_VERSION, INITIAL_MONEY, SALARY, DEPORTATION_FINE, PRISON_BAIL } from "./board";
import { CARDS } from "./cards";
import { assetError, group, liquidationValue, netWorth, rent, redemptionCost, buildingBidders } from "./rules";
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
    rulesVersion: RULES_VERSION,
    turnNumber: 0,
    debts: [],
    auction: null,
    auctionQueue: [],
    choice: null,
    opening: null,
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
    money: INITIAL_MONEY,
    position: 0,
    jailed: 0,
    bankrupt: false,
    passes: [],
    bills: { ...INITIAL_BILLS },
  };
}
function nextTurn(s: Game, now: number) {
  s.players[s.turn].salary = 0;
  s.turnNumber = (s.turnNumber ?? 0) + 1;
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
  if (state.status !== "playing") return state;
  if (state.endsAt && now >= state.endsAt) {
    const s = structuredClone(state), active = s.players.filter((p) => !p.bankrupt);
    const score = (p: Player) => netWorth(s, p) - [s.debt, ...(s.debts ?? [])]
      .reduce((sum, d) => sum + (d && (d.payer ?? s.players[s.turn].id) === p.id ? d.amount : 0), 0);
    const best = Math.max(...active.map(score));
    s.winner = active.filter((p) => score(p) === best).map((p) => p.id);
    s.status = "finished"; s.trades = []; s.auction = null; s.choice = null;
    addLog(s, "Terminó el tiempo. Se compara el patrimonio neto.");
    return s;
  }
  if (state.auction && now >= state.auction.endsAt) {
    const s = structuredClone(state); closeAuction(s, now); return s;
  }
  return state;
}
function winner(s: Game) {
  const alive = s.players.filter((p) => !p.bankrupt);
  if (alive.length <= 1 && !s.debt) {
    s.status = "finished";
    s.winner = alive.map((p) => p.id);
    s.trades = [];
    addLog(s, alive[0] ? `${alive[0].name} ganó la partida.` : "Todos los viajeros quedaron en quiebra.");
  }
}
function charge(s: Game, p: Player, amount: number, creditor: string | null) {
  if (amount <= 0) return;
  const debt = { amount, creditor, payer: p.id };
  if (s.debt) s.debts = [...(s.debts ?? []), debt];
  else s.debt = debt;
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
  turns = 3,
) {
  const from = p.position;
  p.position = detention === "prison" ? 30 : 10;
  p.detention = detention;
  p.jailed = turns;
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
function move(s: Game, p: Player, steps: number) {
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
function land(s: Game, p: Player, now: number) {
  const b = BOARD[p.position];
  addLog(s, `${p.name} llegó a ${b.name}.`, { type: "log", player: p.id, square: b.id });
  s.phase = "end";
  if (b.kind === "go-oceania") {
    jail(s, p);
    return;
  }
  if (b.kind === "rest") {
    return;
  }
  if (b.kind === "tax") {
    charge(s, p, b.tax ?? 0, null);
    return;
  }
  if (b.price) {
    const a = s.properties[b.id];
    if (!a.owner) s.phase = "buy";
    else if (a.owner !== p.id) {
      const owner = s.players.find((x) => x.id === a.owner)!;
      let amount = rent(s, b.id, s.dice[0] + s.dice[1]);
      if (amount && b.kind === "country" && !a.buildings && owner.rentBonus) {
        amount *= 2; owner.rentBonus = false;
      }
      charge(s, p, amount, a.owner);
    }
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
    if (c.kind === "acquisition") { p.acquisitionCard = true; return; }
    if (c.kind === "pass") {
      p.passes.push(b.kind);
      return;
    }
    deck.push(index);
    if (c.kind === "money") {
      if (c.amount >= 0) credit(p, c.amount);
      else charge(s, p, -c.amount, null);
    }
    if (c.kind === "jail") {
      if (c.fine) charge(s, p, c.fine, null);
      jail(s, p, c.detention ?? "prison", c.turns ?? 3);
    }
    if (c.kind === "bonus") p.rentBonus = true;
    if (c.kind === "collect") {
      s.choice = { player: p.id, kind: "collect", amount: c.amount };
      p.skipTurns = (p.skipTurns ?? 0) + (c.skip ?? 0);
      if (c.skip) s.extra = false;
    }
    if (c.kind === "everyone") {
      for (const other of s.players.filter((x) => !x.bankrupt)) {
        if (c.toPlayer === false) charge(s, other, c.amount, null);
        else if (other.id !== p.id) {
          if (c.amount < 0) charge(s, other, -c.amount, p.id);
          else charge(s, p, c.amount, other.id);
        }
      }
    }
    if (c.kind === "refund" || c.kind === "expropriate") {
      const owned = BOARD.filter((x) => s.properties[x.id]?.owner === p.id);
      const target = c.kind === "refund" ? owned.find((x) => x.id === p.lastBought)
        : owned.sort((a, b) => b.price - a.price || a.id - b.id)[0];
      if (target) {
        // Sell the entire block's buildings to preserve even development.
        for (const peer of group(target.id)) {
          const property = s.properties[peer.id];
          if (property.owner === p.id) {
            credit(p, property.buildings * peer.buildCost / 2); property.buildings = 0;
          }
        }
        const property = s.properties[target.id];
        credit(p, c.kind === "refund" ? (property.mortgaged ? 0 : target.price / 2) : target.rents[0]);
        property.owner = null; property.mortgaged = false;
        addLog(s, `${p.name} devuelve ${target.name} al Banco por una carta.`);
        if (c.kind === "expropriate") s.auctionQueue = [...(s.auctionQueue ?? []), target.id];
      }
    }
    if (c.kind === "airline") {
      const target = BOARD.filter((x) => x.kind === "airline" && !s.properties[x.id].owner)
        .sort((a,b) => (a.id - p.position + 40) % 40 - (b.id - p.position + 40) % 40)[0];
      if (target) {
        move(s, p, (target.id - p.position + 40) % 40);
        charge(s, p, target.price + 5000, null);
        const debt = (s.debts?.length ? s.debts[s.debts.length - 1] : s.debt)!;
        debt.reason = "purchase"; debt.square = target.id;
      }
    }
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
        land(s, p, now);
      }
      if (c.fine) charge(s, p, c.fine, null);
      if (c.skip) { p.skipTurns = (p.skipTurns ?? 0) + c.skip; s.extra = false; }
    }
    openNextAuction(s, now);
  }
}
function eliminate(s: Game, p: Player, creditor: string | null) {
  const recipient = s.players.find((x) => x.id === creditor && !x.bankrupt);
  for (const [id, property] of Object.entries(s.properties))
    if (property.owner === p.id) { credit(p, property.buildings * BOARD[Number(id)].buildCost / 2); property.buildings = 0; }
  if (recipient) credit(recipient, p.money);
  p.money = 0;
  p.bankrupt = true;
  p.eliminatedAt = s.version;
  s.eliminated = [...(s.eliminated ?? []), p.id];
  s.trades = s.trades.filter((t) => t.from !== p.id && t.to !== p.id);
  if (s.choice?.player === p.id) s.choice = null;
  for (const [id, a] of Object.entries(s.properties))
    if (a.owner === p.id) {
      a.owner = recipient?.id ?? null;
      if (recipient && a.mortgaged) {
        a.inheritanceTurn = (s.turnNumber ?? 0) + (s.players[s.turn].id === p.id ? 1 : 0);
        s.debts = [...(s.debts ?? []), { payer: recipient.id, amount: BOARD[Number(id)].price * 0.1, creditor: null, reason: "inheritance" }];
      }
      if (!recipient) {
        s.auctionQueue = [...(s.auctionQueue ?? []), Number(id)];
        a.buildings = 0;
        a.mortgaged = false;
      }
    }
  for (const deck of p.passes)
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
  p.passes = [];
  s.debts = (s.debts ?? []).filter((d) => d.payer !== p.id).map((d) => ({ ...d, creditor: d.creditor === p.id ? null : d.creditor }));
  s.debt = s.debts.shift() ?? null;
  if (p.acquisitionCard) { s.decks.email.push(CARDS.email.findIndex((c) => c.kind === "acquisition")); p.acquisitionCard = false; }
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
  if (timed !== state) {
    if (timed.status === "finished" || action.type === "auction-expire") return timed;
    throw new Error("La subasta acaba de terminar. Espera la actualización de la sala.");
  }
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
    s.opening = { candidates: s.players.map((x) => x.id), rolls: {}, round: 1 };
    s.decks = structuredClone(ctx.shuffled);
    s.turnAt = ctx.now;
    s.endsAt = s.duration ? ctx.now + s.duration * 60000 : null;
    addLog(s, "Cada viajero tira un dado: el número mayor inicia. Los empates se repiten.");
    return s;
  }
  requireRule(s.status === "playing", "La partida no está activa.");
  if (s.opening) {
    const opening = s.opening;
    let roller = p;
    let value = ctx.dice[0];
    if (action.type === "skip" || action.type === "expel") {
      requireRule(p.id === s.host && ctx.inactive, "Solo el anfitrión puede actuar tras 90 segundos de inactividad.");
      roller = s.players.find((x) => x.id === waitingPlayer(s))!; value = 0;
      if (action.type === "expel") {
        eliminate(s, roller, null); opening.candidates = opening.candidates.filter((id) => id !== roller.id);
        delete opening.rolls[roller.id];
        if (s.players.filter((x) => !x.bankrupt).length <= 1) { s.opening = null; return s; }
      }
    } else requireRule(action.type === "opening-roll", "Primero se decide quién inicia.");
    if (action.type !== "expel") {
      requireRule(opening.candidates.includes(roller.id) && opening.rolls[roller.id] === undefined, "Ya tiraste o no participas en este desempate.");
      opening.rolls[roller.id] = value;
      addLog(s, `${roller.name} sacó ${value} para elegir la salida.`, { type: "roll", player: roller.id, dice: [value, 0] });
    }
    if (opening.candidates.every((id) => opening.rolls[id] !== undefined)) {
      const max = Math.max(...Object.values(opening.rolls));
      const tied = opening.candidates.filter((id) => opening.rolls[id] === max);
      if (tied.length === 1) {
        s.turn = s.players.findIndex((x) => x.id === tied[0]); s.opening = null; s.turnAt = ctx.now;
        addLog(s, `${s.players[s.turn].name} inicia el viaje.`);
      } else { s.opening = { candidates: tied, rolls: {}, round: opening.round + 1 }; addLog(s, "Empate: vuelven a tirar los finalistas."); }
    }
    return s;
  }
  if (s.auction) {
    requireRule(["bid", "fold", "auction-expire"].includes(action.type), "Resuelve la subasta antes de continuar.");
    const a = s.auction;
    requireRule(!p.jailed || p.detention !== "prison", "En la cárcel no puedes participar en subastas.");
    if (action.type === "bid") {
      if (a.buildingOptions) {
        const square = action.square ?? a.buildingOptions[p.id]?.[0];
        requireRule(square !== undefined && a.buildingOptions[p.id]?.includes(square), "No puedes construir en ese país.");
        requireRule(action.amount >= BOARD[square].buildCost, "La oferta debe cubrir el costo de construcción.");
        a.square = square;
      }
      requireRule(!a.passed.includes(p.id) && Number.isSafeInteger(action.amount) && action.amount >= a.amount + 500 && action.amount <= p.money, "Oferta inválida: aumenta al menos $500 y usa solo tu saldo disponible.");
      a.amount = action.amount; a.bidder = p.id; a.endsAt = ctx.now + 20000;
      addLog(s, `${p.name} ofrece $${action.amount} por ${BOARD[a.square].name}.`);
    } else if (action.type === "fold") {
      requireRule(p.id !== a.bidder && !a.passed.includes(p.id), "No puedes retirarte de tu oferta ganadora.");
      a.passed.push(p.id);
    } else requireRule(ctx.now >= a.endsAt, "La subasta aún no termina.");
    const participants = s.players.filter((x) => !x.bankrupt && !(x.jailed && x.detention === "prison") && (!a.buildingOptions || a.buildingOptions[x.id]?.length));
    if (ctx.now >= a.endsAt || participants.every((x) => a.passed.includes(x.id) || x.id === a.bidder)) closeAuction(s, ctx.now);
    return s;
  }
  if (action.type === "salary") {
    requireRule(s.players[s.turn].id === p.id && (p.salary ?? 0) > 0, "No tienes sueldo pendiente en este turno.");
    credit(p, p.salary!); addLog(s, `${p.name} cobró $${p.salary} de sueldo.`); p.salary = 0; return s;
  }
  if (action.type === "collect") {
    requireRule(s.choice?.player === p.id, "No hay una elección pendiente.");
    const other = s.players.find((x) => x.id === action.target && x.id !== p.id && !x.bankrupt);
    requireRule(other, "Elige a otro viajero activo.");
    charge(s, other, s.choice.amount, p.id); s.choice = null; return s;
  }
  if (action.type === "acquire") {
    requireRule(p.acquisitionCard && !s.debt && !(p.jailed && p.detention === "prison"), "No puedes utilizar el permiso ahora.");
    const b = BOARD[action.square], a = s.properties[action.square];
    requireRule(b?.kind === "country" && a.owner !== p.id && group(b.id).every((x) => x.id === b.id || s.properties[x.id].owner === p.id) && !group(b.id).some((x) => s.properties[x.id].buildings), "Elige el último país que te falte de un bloque sin edificios.");
    const price = a.owner ? b.rents[0] : b.price - 1000;
    pay(p, price, action.bills);
    const oldOwner = s.players.find((x) => x.id === a.owner); if (oldOwner) credit(oldOwner, price);
    a.owner = p.id; delete a.inheritanceTurn; p.acquisitionCard = false; p.lastBought = b.id;
    s.decks.email.push(CARDS.email.findIndex((c) => c.kind === "acquisition"));
    addLog(s, `${p.name} completó su bloque adquiriendo ${b.name} por $${price}.`, { type: "purchase", player: p.id, square: b.id }); return s;
  }
  if (action.type === "skip" || action.type === "expel") {
    requireRule(
      p.id === s.host && ctx.inactive,
      "Solo el anfitrión puede actuar tras 90 segundos de inactividad.",
    );
    const absent = s.players.find((x) => x.id === waitingPlayer(s))!;
    if (action.type === "expel") {
      eliminate(s, absent, s.debt?.creditor ?? null);
      if (s.status === "playing" && absent.id === s.players[s.turn].id) advanceAfterElimination(s, ctx.now);
      openNextAuction(s, ctx.now);
    } else {
      requireRule(
        !s.debt,
        "Hay una deuda pendiente; solo se puede declarar la quiebra.",
      );
      if (s.phase === "roll" && (absent.jailed || absent.skipTurns)) waitTurn(s, absent);
      if (s.phase === "buy") s.auctionQueue = [...(s.auctionQueue ?? []), absent.position];
      s.choice = null;
      addLog(s, `Se saltó el turno de ${absent.name}.`);
      nextTurn(s, ctx.now);
      openNextAuction(s, ctx.now);
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
    pay(from, t.giveMoney); pay(p, t.takeMoney); credit(from, t.takeMoney); credit(p, t.giveMoney);
    for (const id of t.give) { s.properties[id].owner = p.id; delete s.properties[id].inheritanceTurn; }
    for (const id of t.take) { s.properties[id].owner = from.id; delete s.properties[id].inheritanceTurn; }
    if (t.give.length) p.lastBought = t.give[t.give.length - 1];
    if (t.take.length) from.lastBought = t.take[t.take.length - 1];
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
    addLog(s, `${p.name} propone a ${to.name}: ofrece $${action.giveMoney} y ${action.give.map((id) => BOARD[id].name).join(", ") || "ninguna propiedad"}; pide $${action.takeMoney} y ${action.take.map((id) => BOARD[id].name).join(", ") || "ninguna propiedad"}.`);
    return s;
  }
  if ("square" in action && action.type !== "bid") {
    const err = assetError(s, p, action.square, action.type);
    requireRule(!err, err ?? "Acción ilegal.");
    const a = s.properties[action.square],
      b = BOARD[action.square];
    if (action.type === "build") {
      const options = buildingBidders(s, action.square);
      if (Object.keys(options).length > 1) {
        s.auction = { square: action.square, amount: 0, bidder: null, passed: [], endsAt: ctx.now + 30000, buildingOptions: options };
        addLog(s, "Queda una pieza y varios viajeros pueden construir: comienza la subasta del edificio."); return s;
      }
      a.buildings++;
      pay(p, b.buildCost, action.bills);
    }
    if (action.type === "sell") {
      a.buildings--;
      credit(p, b.buildCost / 2);
    }
    if (action.type === "sell-group") {
      for (const peer of group(action.square)) {
        const property = s.properties[peer.id];
        if (property.owner === p.id) { credit(p, property.buildings * peer.buildCost / 2); property.buildings = 0; }
      }
    }
    if (action.type === "mortgage") {
      a.mortgaged = true;
      delete a.inheritanceTurn;
      credit(p, b.mortgage);
    }
    if (action.type === "redeem") {
      a.mortgaged = false;
      pay(p, redemptionCost(s, action.square), action.bills);
    }
    if (action.type === "return") {
      credit(p, a.mortgaged ? 0 : b.price / 2);
      a.owner = null;
      a.mortgaged = false;
      delete a.inheritanceTurn;
    }
    const labels = {
      build: "construyó en",
      sell: "vendió un edificio de",
      "sell-group": "vendió los edificios del bloque de",
      mortgage: "hipotecó",
      redeem: "deshipotecó",
      return: "devolvió al Banco",
    };
    addLog(s, `${p.name} ${labels[action.type]} ${b.name}.`);
    return s;
  }
  const debtor = s.debt?.payer ?? s.players[s.turn].id;
  if (action.type === "settle") {
    requireRule(debtor === p.id, "Este pago le corresponde a otro jugador.");
    requireRule(
      s.debt && p.money >= s.debt.amount,
      "No tienes saldo para liquidar la deuda.",
    );
    const d = s.debt;
    s.debt = (s.debts ?? []).shift() ?? null;
    pay(p, d.amount, action.bills);
    const recipient = s.players.find((x) => x.id === d.creditor);
    if (recipient && !recipient.bankrupt) credit(recipient, d.amount);
    if (d.reason === "purchase" && d.square !== undefined) {
      s.properties[d.square].owner = p.id; p.lastBought = d.square;
      addLog(s, `${p.name} compró ${BOARD[d.square].name} por una carta.`, { type: "purchase", player: p.id, square: d.square });
    }
    openNextAuction(s, ctx.now); winner(s);
    addLog(
      s,
      `${p.name} pagó $${d.amount} a ${recipient?.name ?? "el Banco"}.`,
      { type: "payment", player: p.id },
    );
    return s;
  }
  if (action.type === "bankrupt") {
    requireRule(s.debt && debtor === p.id, "No tienes una deuda pendiente.");
    requireRule(
      liquidationValue(s, p) < s.debt.amount,
      "Puedes cubrir la deuda vendiendo o hipotecando.",
    );
    eliminate(s, p, s.debt.creditor);
    if (s.status === "playing" && s.players[s.turn].id === p.id) advanceAfterElimination(s, ctx.now);
    openNextAuction(s, ctx.now);
    return s;
  }
  if (action.type === "pass") {
    requireRule(p.jailed > 0 && p.passes.length > 0, "No tienes un pase que usar.");
    const deck = p.passes.shift()!;
    s.decks[deck].push(CARDS[deck].findIndex((c) => c.kind === "pass"));
    if (s.debt?.reason === "bail" && s.debt.payer === p.id) s.debt = (s.debts ?? []).shift() ?? null;
    s.debts = (s.debts ?? []).filter((d) => !(d.reason === "bail" && d.payer === p.id));
    release(s, p); addLog(s, `${p.name} utilizó su pase diplomático.`); return s;
  }
  requireRule(s.players[s.turn].id === p.id, "Espera tu turno.");
  requireRule(!s.choice, "Elige primero al viajero indicado en la carta.");
  requireRule(!s.debt, "Liquida tu deuda antes de continuar.");
  if (action.type === "bail") {
    requireRule(p.jailed > 0 && p.detention === "oceania", "La multa solo permite salir de Deportado.");
    pay(p, DEPORTATION_FINE, action.bills); release(s, p);
    addLog(s, `${p.name} pagó $${DEPORTATION_FINE} y regresó a Salida sin sueldo.`); return s;
  }
  if (action.type === "wait") {
    requireRule(s.phase === "roll" && (p.jailed > 0 || (p.skipTurns ?? 0) > 0), "No tienes un turno de castigo pendiente.");
    waitTurn(s, p); return s;
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
    if (p.jailed || p.skipTurns) { waitTurn(s, p); return s; }
    s.doubles = double ? s.doubles + 1 : 0;
    s.extra = double;
    if (s.doubles === 3) {
      jail(s, p, "oceania");
      return s;
    }
    move(s, p, ctx.dice[0] + ctx.dice[1]);
    land(s, p, ctx.now);
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
      p.lastBought = b.id;
      addLog(s, `${p.name} compró ${b.name} por $${b.price}.`, {
        type: "purchase",
        player: p.id,
        square: b.id,
      });
    }
    s.phase = "end";
    if (action.type === "decline") {
      s.auctionQueue = [...(s.auctionQueue ?? []), p.position]; openNextAuction(s, ctx.now);
    }
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

function release(s: Game, p: Player) {
  if (p.detention === "oceania") {
    const from = p.position; p.position = 0;
    addLog(s, `${p.name} regresa a Salida sin cobrar sueldo.`, { type: "move", player: p.id, from, path: [0], teleport: true });
  }
  p.jailed = 0; delete p.detention;
}
function waitTurn(s: Game, p: Player) {
  if (p.jailed) {
    p.jailed--; addLog(s, `${p.name} cumple un turno de castigo; quedan ${p.jailed}.`);
    if (!p.jailed) release(s, p);
  } else { p.skipTurns = Math.max(0, (p.skipTurns ?? 0) - 1); addLog(s, `${p.name} descansa; quedan ${p.skipTurns} turnos.`); }
  s.phase = "end"; s.extra = false; s.doubles = 0;
}
function advanceAfterElimination(s: Game, now: number) {
  const debt = s.debt; nextTurn(s, now); s.debt = debt;
}
function openNextAuction(s: Game, now: number) {
  if (s.auction || s.debt || s.status !== "playing") return;
  const square = (s.auctionQueue ?? []).shift();
  if (square === undefined) return;
  s.auction = { square, amount: 0, bidder: null, passed: [], endsAt: now + 30000 };
  addLog(s, `Subasta de ${BOARD[square].name}: primera oferta desde $500. Todos pueden participar.`);
}
function closeAuction(s: Game, now: number) {
  const auction = s.auction; if (!auction) return;
  if (auction.bidder) {
    const buyer = s.players.find((p) => p.id === auction.bidder)!;
    pay(buyer, auction.amount);
    if (auction.buildingOptions) s.properties[auction.square].buildings++;
    else { s.properties[auction.square].owner = buyer.id; buyer.lastBought = auction.square; }
    addLog(s, `${buyer.name} ganó la subasta ${auction.buildingOptions ? "del edificio en" : "de"} ${BOARD[auction.square].name} por $${auction.amount}.`, { type: "purchase", player: buyer.id, square: auction.square });
  } else addLog(s, `Sin ofertas: ${BOARD[auction.square].name} permanece en el Banco.`);
  s.auction = null; openNextAuction(s, now);
}

export function waitingPlayer(s: Game): string {
  return s.debt?.payer ?? s.choice?.player ?? s.opening?.candidates.find((id) => s.opening?.rolls[id] === undefined) ?? s.players[s.turn].id;
}
