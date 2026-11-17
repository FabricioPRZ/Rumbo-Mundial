import { requireRule } from "./assertions";
import { closeAuction, openNextAuction } from "./auctions";
import { eliminate } from "./bankruptcy";
import { BOARD, DEPORTATION_FINE } from "./board";
import { CARDS } from "./cards";
import { addLog } from "./events";
import { land } from "./landing";
import { credit, exchange, pay } from "./money";
import { jail, move } from "./movement";
import { assetError, auctionMinimum, buildingBidders, group, liquidationValue, redemptionCost } from "./rules";
import { charge, winner } from "./settlement";
import { finishByTime, resolveOpening, scheduleAutomatic } from "./timing";
import { validateTrade } from "./trading";
import { advanceAfterElimination, nextTurn, release, waitTurn, waitingPlayer } from "./turns";
import type { Action, Context, Game } from "./types";
import { COLORS } from "./types";

export function reduceAction(
  state: Game,
  action: Action,
  playerId: string,
  ctx: Context,
): Game {
  const timed = finishByTime(state, ctx.now);
  if (timed !== state) {
    if (timed.status === "finished" || action.type === "auction-expire") return timed;
    throw new Error("El turno o la subasta cambió automáticamente. Espera la actualización de la sala.");
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
    resolveOpening(s, ctx.now);
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
      const minimum = auctionMinimum(a.square, a.amount, !!a.buildingOptions);
      requireRule(!a.passed.includes(p.id) && Number.isSafeInteger(action.amount) && action.amount >= minimum && action.amount <= p.money, `Oferta inválida: el mínimo es $${minimum}; usa solo tu saldo disponible y no participes si ya rechazaste.`);
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
  if (action.type === "stay") {
    requireRule(s.detentionDecision === p.id && p.detention === "oceania" && p.jailed > 0, "No tienes una decisión de deportación pendiente.");
    s.detentionDecision = null;
    addLog(s, `${p.name} decidió quedarse en Deportado durante tres turnos completos.`);
    return s;
  }
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
      s.auctionQueue = [...(s.auctionQueue ?? []), p.position]; openNextAuction(s, ctx.now, p);
    }
    return s;
  }
  if (action.type === "end") {
    s.detentionDecision = null;
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

export function engine(state: Game, action: Action, playerId: string, ctx: Context): Game {
  const next = reduceAction(state, action, playerId, ctx);
  scheduleAutomatic(next, state, ctx.now);
  return next;
}
