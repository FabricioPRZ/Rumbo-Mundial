import { BOARD, INITIAL_MONEY, RULES_VERSION } from "./board";
import { INITIAL_BILLS } from "./money";
import type { Game, Player } from "./types";

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
