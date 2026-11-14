import { expect, it } from "vitest";
import { game, go, ctx } from "./helpers";
import { engine, newGame, newPlayer, finishByTime } from "../lib/game/engine";
import { BOARD } from "../lib/game/board";
import { assetError, ranking } from "../lib/game/rules";
import { exchange, pay, totalBills, wallet } from "../lib/game/money";
import { shuffleDeck } from "../lib/game/shuffle";
import type { Action } from "../lib/game/types";

it("una tirada de 12 avanza doce pasos, no cuarenta",()=>{
  const s=go(game(),{type:"roll"},[6,6]);expect(s.motion?.path).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
});
it("separación de movimiento por dado y carta evita vueltas fantasma",()=>{
  let s=game();s.players[0].position=10;s.decks.email=[13,...s.decks.email.filter((i)=>i!==13)];
  s=go(s,{type:"roll"});const moves=s.events?.filter((e)=>e.type==="move");
  expect(moves?.map((e)=>e.path?.length)).toEqual([3,26]);expect(s.players[0].position).toBe(39);
});
it("cada tirada incluso idéntica tiene un evento distinto compartido",()=>{
  let s=game();s=go(s,{type:"roll"});s=go(s,{type:"buy"});s=go(s,{type:"end"});s=go(s,{type:"roll"},[1,2],"b");
  const rolls=s.events?.filter((e)=>e.type==="roll" && e.dice?.[1]!==0)??[];
  expect(rolls).toHaveLength(2);expect(rolls[0].id).not.toBe(rolls[1].id);expect(rolls[1].player).toBe("b");
});
it("compras producen aviso público y pago con billetes valida pertenencia",()=>{
  let s=go(game(),{type:"roll"});expect(()=>go(s,{type:"buy",bills:{10000:50}})).toThrow(/billetes/);
  s=go(s,{type:"buy",bills:{10000:2}});expect(s.players[0].money).toBe(114500);expect(s.events?.at(-1)?.type).toBe("purchase");
});
it("billetes y cambio conservan valor, incluso importes pequeños",()=>{
  const p=game().players[0];exchange(p,50000);expect(totalBills(wallet(p))).toBe(134500);
  pay(p,6600,{10000:1});expect(totalBills(wallet(p))).toBe(127900);expect(wallet(p)[100]).toBeGreaterThan(0);
  expect(()=>pay(p,100,{500:999})).toThrow();expect(()=>pay(p,100,{"100.0":1})).toThrow();
});
it("barajado Fisher–Yates utiliza entropía inyectada y conserva todas las cartas",()=>{
  const a=shuffleDeck(16,()=>0),b=shuffleDeck(16,(max)=>max-1);expect(a).not.toEqual(b);
  expect([...a].sort((x,y)=>x-y)).toEqual(Array.from({length:16},(_,i)=>i));
});
it("selección inicial resuelve empate sin favorecer al anfitrión",()=>{
  let s=newGame("ABC234",newPlayer("a","Ana","red"),0);s.players.push(newPlayer("b","Luis","blue"));
  s=go(s,{type:"start"});s=go(s,{type:"opening-roll"},[4,1]);s=go(s,{type:"opening-roll"},[4,2],"b");expect(s.opening?.round).toBe(2);
  s=go(s,{type:"opening-roll"},[1,1]);s=go(s,{type:"opening-roll"},[5,2],"b");expect(s.turn).toBe(1);expect(s.opening).toBeNull();
});
it("pago colectivo se procesa por jugador y no pierde deudas",()=>{
  let s=game(3);s.players[0].position=10;s.decks.email=[11];s=go(s,{type:"roll"});
  expect(s.debt?.payer).toBe("a");expect(s.debts).toHaveLength(2);
  for(const id of ["a","b","c"])s=go(s,{type:"settle"},[1,2],id);
  expect(s.players.map((p)=>p.money)).toEqual([129500,129500,129500]);expect(s.debt).toBeNull();
});
it("carta de adquisición solo permite completar un bloque y no se reutiliza",()=>{
  let s=game();s.players[0].acquisitionCard=true;s.properties[1].owner="a";
  expect(()=>go(s,{type:"acquire",square:2})).toThrow(/último país/);
  s.properties[4].owner="a";s.properties[2].owner="b";s=go(s,{type:"acquire",square:2});
  expect(s.properties[2].owner).toBe("a");expect(s.players[0].money).toBe(132500);expect(s.players[1].money).toBe(136500);
  expect(()=>go(s,{type:"acquire",square:2})).toThrow();
});
it("ranking coloca supervivientes por patrimonio y quebrados en orden inverso de eliminación",()=>{
  const s=game(4);s.players[0].money=100;s.players[1].money=200;s.players[2].bankrupt=true;s.players[3].bankrupt=true;s.eliminated=["c","d"];
  expect(ranking(s).map((x)=>x.player.id)).toEqual(["b","a","d","c"]);
});
it.each([1234567,8459,9234])("completa una partida con cartas, subastas, pagos y quiebras, semilla %i",(initialSeed)=>{
  let s=game(3),seed=initialSeed;
  const die=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return (seed%6)+1;};
  for(let step=0;step<30000&&s.status==="playing";step++){
    const now=1000+step*100;
    if(s.auction){s=finishByTime(s,s.auction.endsAt);continue;}
    let p=s.players[s.turn];let action:Action;
    if(s.debt){p=s.players.find((x)=>x.id===(s.debt?.payer??p.id))!;
      if(p.money>=s.debt.amount)action={type:"settle"};else{
        const own=BOARD.filter((b)=>s.properties[b.id]?.owner===p.id);
        const sell=own.find((b)=>!assetError(s,p,b.id,"sell"));const mortgage=own.find((b)=>!assetError(s,p,b.id,"mortgage"));
        action=sell?{type:"sell",square:sell.id}:mortgage?{type:"mortgage",square:mortgage.id}:{type:"bankrupt"};
      }
    }else if(s.choice){p=s.players.find((x)=>x.id===s.choice?.player)!;action={type:"collect",target:s.players.find((x)=>x.id!==p.id&&!x.bankrupt)!.id};}
    else if(p.salary)action={type:"salary"};
    else if(s.phase==="roll")action={type:p.jailed||p.skipTurns?"wait":"roll"};
    else if(s.phase==="buy")action={type:p.money>=BOARD[p.position].price?"buy":"decline"};
    else{const build=BOARD.find((b)=>s.properties[b.id]?.owner===p.id&&p.money>50000&&!assetError(s,p,b.id,"build"));action=build?{type:"build",square:build.id}:{type:"end"};}
    s=engine(s,action,p.id,{...ctx,now,dice:[die(),die()]});
    expect(s.players.every((p)=>p.money>=0)).toBe(true);
  }
  expect(s.status).toBe("finished");expect(s.winner).toHaveLength(1);
});

it("la última casa se subasta entre quienes pueden construir, sin duplicar la pieza",()=>{
  let s=game(3);
  for(const id of [1,2,4])s.properties[id].owner="a";
  for(const id of [16,17,19])s.properties[id].owner="b";
  for(const id of [6,7,9,11,12,14,21,23,24])s.properties[id]={owner:"c",buildings:id===24?3:4,mortgaged:false};
  s=go(s,{type:"build",square:1});expect(s.auction?.buildingOptions?.b).toContain(16);
  s=go(s,{type:"bid",amount:5000,square:16},[1,2],"b");
  s=go(s,{type:"fold"});s=go(s,{type:"fold"},[1,2],"c");
  expect(s.properties[16].buildings).toBe(1);expect(s.properties[1].buildings).toBe(0);
  expect(s.players[1].money).toBe(129500);expect(s.auction).toBeNull();
});
it("vender edificios del bloque permite liquidar hoteles cuando faltan casas",()=>{
  let s=game();for(const id of [1,2,4])s.properties[id]={owner:"a",buildings:5,mortgaged:false};
  for(const b of BOARD.filter((b)=>b.kind==="country"&&b.group!=="África").slice(0,9))s.properties[b.id].buildings=4;
  expect(()=>go(s,{type:"sell",square:1})).toThrow(/cuatro casas/);
  s=go(s,{type:"sell-group",square:1});expect([1,2,4].every((id)=>s.properties[id].buildings===0)).toBe(true);
  expect(s.players[0].money).toBe(197000);
});
it("el host puede saltar a quien no responde durante la elección de salida",()=>{
  let s=newGame("ABC234",newPlayer("a","Ana","red"),0);s.players.push(newPlayer("b","Luis","blue"));s=go(s,{type:"start"});
  s=engine(s,{type:"skip"},"a",{...ctx,inactive:true});expect(s.opening?.rolls.a).toBe(0);
  s=go(s,{type:"opening-roll"},[2,2],"b");expect(s.turn).toBe(1);
});
it("el permiso de adquisición y la carta de bono no permiten cobrar desde la cárcel",()=>{
  const s=game();s.players[0].jailed=3;s.players[0].detention="prison";s.players[0].acquisitionCard=true;
  for(const id of [1,4])s.properties[id].owner="a";
  expect(()=>go(s,{type:"acquire",square:2})).toThrow();
});
