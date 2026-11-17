import { engine } from "../src/domain/game/engine";
import { newGame } from "../src/domain/game/factory";
import { newPlayer } from "../src/domain/game/factory";
import { CARDS } from "../src/domain/game/cards";
import type { Action, Context, Game } from "../src/domain/game/types";
export const ctx: Context = {now:1000,dice:[1,2],shuffled:{email:CARDS.email.map((_,i)=>i),sms:CARDS.sms.map((_,i)=>i)}};
export const go = (s:Game,a:Action,dice:[number,number]=[1,2],who="a")=>engine(s,a,who,{...ctx,dice});
export function game(count=2) {
  const s = newGame("ABC234",newPlayer("a","Ana","#a00"),0);
  for (let i=1;i<count;i++) s.players.push(newPlayer(String.fromCharCode(97+i),["Ana","Luis","Sol","Luz"][i],`#00${i}`));
  let started=go(s,{type:"start"});
  for (let i=0;i<count;i++) started=go(started,{type:"opening-roll"},[6-i,1],String.fromCharCode(97+i));
  return started;
}
