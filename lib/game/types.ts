export type SquareKind =
  | "start"
  | "country"
  | "airline"
  | "utility"
  | "email"
  | "sms"
  | "tax"
  | "oceania"
  | "rest"
  | "go-oceania";
export interface Square {
  id: number;
  name: string;
  kind: SquareKind;
  price: number;
  mortgage: number;
  flag?: string;
  group?: string;
  color?: string;
  rents: number[];
  buildCost: number;
  tax?: number;
}
export interface Property {
  owner: string | null;
  buildings: number;
  mortgaged: boolean;
  inheritanceTurn?: number;
}
export interface Player {
  id: string;
  name: string;
  color: string;
  money: number;
  position: number;
  jailed: number;
  bankrupt: boolean;
  passes: ("email" | "sms")[];
  bills?: Record<string, number>;
  detention?: "prison" | "oceania";
  eliminatedAt?: number;
  salary?: number;
  skipTurns?: number;
  rentBonus?: boolean;
  acquisitionCard?: boolean;
  lastBought?: number;

}
export interface Trade {
  id: string;
  from: string;
  to: string;
  give: number[];
  take: number[];
  giveMoney: number;
  takeMoney: number;
}
export interface GameEvent {
  id: number;
  type: "log" | "roll" | "card" | "purchase" | "move" | "payment";
  text: string;
  player?: string;
  dice?: [number, number];
  square?: number;
  deck?: "email" | "sms";
  path?: number[];
  from?: number;
  teleport?: boolean;
}
export interface Game {
  id: string;
  version: number;
  rulesVersion?: number;
  host: string;
  status: "lobby" | "playing" | "finished";
  players: Player[];
  properties: Record<number, Property>;
  turn: number;
  turnNumber?: number;
  phase: "roll" | "buy" | "end";
  doubles: number;
  extra: boolean;
  dice: [number, number];
  debt: Debt | null;
  debts?: Debt[];
  auction?: Auction | null;
  auctionQueue?: number[];
  choice?: { player: string; kind: "collect"; amount: number } | null;
  opening?: { candidates: string[]; rolls: Record<string, number>; round: number } | null;
  trades: Trade[];
  decks: { email: number[]; sms: number[] };
  log: string[];
  duration: number;
  endsAt: number | null;
  turnAt: number;
  winner: string[];
  motion: { serial: number; player: string; path: number[] } | null;
  lastCard: string | null;
  events?: GameEvent[];
  eventSerial?: number;
  eliminated?: string[];
}
export type Action = (
  | {
      type:
        | "start"
        | "roll"
        | "buy"
        | "decline"
        | "end"
        | "settle"
        | "bankrupt"
        | "pass"
        | "wait"
        | "bail"
        | "salary"
        | "opening-roll"
        | "fold"
        | "auction-expire";
    }
  | {
      type: "build" | "sell" | "sell-group" | "mortgage" | "redeem" | "return";
      square: number;
    }
  | { type: "color"; color: string }
  | {
      type: "trade";
      to: string;
      give: number[];
      take: number[];
      giveMoney: number;
      takeMoney: number;
    }
  | { type: "accept" | "reject"; trade: string }
  | { type: "skip" | "expel" }
  | { type: "change"; denomination: number }
  | { type: "bid"; amount: number; square?: number }
  | { type: "collect"; target: string }
  | { type: "acquire"; square: number }
) & { bills?: Record<string, number> };
export interface Context {
  now: number;
  dice: [number, number];
  shuffled: { email: number[]; sms: number[] };
  inactive?: boolean;
}
export const COLORS = [
  "#d84b38",
  "#2779bd",
  "#dfa51b",
  "#8a56aa",
  "#218a65",
  "#d3508c",
];

export interface Debt {
  amount: number;
  creditor: string | null;
  payer?: string;
  reason?: "bail" | "purchase" | "inheritance";
  square?: number;
}
export interface Auction {
  buildingOptions?: Record<string, number[]>;
  square: number;
  amount: number;
  bidder: string | null;
  passed: string[];
  endsAt: number;
}
