import { DENOMINATIONS, wallet } from "@/domain/game/money";
import type { Player } from "@/domain/game/types";
import { Banknote } from "../atoms/Banknote";
export default function Wallet({ player }: { player: Player }) {
  const bills = wallet(player);
  return <div className="wallet" aria-label="Mi mano de billetes"><div className="wallet-summary">{DENOMINATIONS.filter((value) => bills[value]).map((value) => <span key={value}><Banknote value={value} compact /><b>× {bills[value]}</b></span>)}</div></div>;
}
