import { describe, expect, it } from "vitest";
import { engine, finishByTime } from "../lib/game/engine";
import { BOARD, INITIAL_MONEY, SALARY } from "../lib/game/board";
import { CARDS } from "../lib/game/cards";
import { assetError, bankStock, rent, redemptionCost } from "../lib/game/rules";
import { totalBills, wallet } from "../lib/game/money";
import { game, go, ctx } from "./helpers";

describe("Tablero de referencia y reglas", () => {
  it("conserva 40 posiciones, 24 países y dos mazos originales de 16 cartas", () => {
    expect(BOARD).toHaveLength(40);
    expect(BOARD.filter((b)=>b.kind==="country")).toHaveLength(24);
    expect(BOARD.map((b)=>b.id)).toEqual(Array.from({length:40},(_,i)=>i));
    expect(BOARD.filter((b)=>b.kind==="country").map((b)=>b.name)).toEqual(["Marruecos","Egipto","Sudáfrica","Rusia","China","Japón","Canadá","Estados Unidos","México","Guatemala","Costa Rica","Panamá","Colombia","Venezuela","Perú","Brasil","Chile","Argentina","España","Francia","Inglaterra","Italia","Suiza","Alemania"]);
    expect(CARDS.email).toHaveLength(16);expect(CARDS.sms).toHaveLength(16);
    expect(BOARD[29].rents[2]).toBe(27500);
    expect(BOARD.filter((b)=>b.price).every((b)=>b.mortgage===b.price/2)).toBe(true);
  });
  it("entrega $134,500 y la distribución de billetes de referencia", () => {
    const p=game().players[0];expect(p.money).toBe(INITIAL_MONEY);
    expect(totalBills(wallet(p))).toBe(134500);expect(p.bills).toEqual({50000:2,10000:2,5000:2,2000:1,1000:2,500:1});
  });
  it("cobra salida solo al reclamar, una vez y sin mutar el estado original", () => {
    const s=game();s.players[0].position=38;
    let next=go(s,{type:"roll"},[1,2]);expect(next.players[0].position).toBe(1);
    expect(next.players[0].money).toBe(INITIAL_MONEY);expect(next.players[0].salary).toBe(SALARY);
    next=go(next,{type:"salary"});expect(next.players[0].money).toBe(INITIAL_MONEY+SALARY);
    expect(()=>go(next,{type:"salary"})).toThrow();expect(s.players[0].position).toBe(38);
    expect(go(s,{type:"roll"},[1,1]).players[0].salary).toBe(SALARY);
  });
  it("pierde el sueldo no reclamado al ceder el turno",()=>{
    let s=game();s.players[0].salary=20000;s.phase="end";
    s=go(s,{type:"end"});expect(s.players[0].salary).toBe(0);
    expect(()=>go(s,{type:"salary"})).toThrow();
  });
  it("dobla renta de bloque y no cobra hipotecas ni desde cárcel",()=>{
    const s=game();for(const id of [1,2,4])s.properties[id].owner="a";
    expect(rent(s,1,7)).toBe(3000);s.properties[2].mortgaged=true;
    expect(rent(s,1,7)).toBe(3000);s.properties[1].mortgaged=true;
    expect(rent(s,1,7)).toBe(0);s.properties[1].mortgaged=false;
    s.players[0].jailed=3;s.players[0].detention="prison";expect(rent(s,1,7)).toBe(0);
  });
  it("construye de forma pareja hasta hotel incluso fuera de turno",()=>{
    let s=game();s.players[1].money=500000;for(const id of [16,17,19])s.properties[id].owner="b";
    s=go(s,{type:"build",square:16},[1,2],"b");
    expect(()=>go(s,{type:"build",square:16},[1,2],"b")).toThrow(/menos edificios/);
    for(const id of [17,19])s=go(s,{type:"build",square:id},[1,2],"b");
    for(let level=2;level<=5;level++)for(const id of [16,17,19])s=go(s,{type:"build",square:id},[1,2],"b");
    expect(s.properties[16].buildings).toBe(5);expect(s.players[1].money).toBe(425000);
    expect(bankStock(s)).toEqual({houses:36,hotels:9});
    s=go(s,{type:"sell",square:16},[1,2],"b");expect(s.players[1].money).toBe(427500);
    expect(()=>go(s,{type:"sell",square:16},[1,2],"b")).toThrow(/más edificios/);
  });
  it("exige bloque completo sin hipotecas y suficientes piezas",()=>{
    const s=game();s.properties[1].owner="a";
    expect(assetError(s,s.players[0],1,"build")).toMatch(/grupo/);
    for(const id of [2,4])s.properties[id].owner="a";s.properties[2].mortgaged=true;
    expect(()=>go(s,{type:"build",square:1})).toThrow(/hipotecas/);
    s.properties[2].mortgaged=false;
    for(const b of BOARD.filter((b)=>b.kind==="country"&&b.group!=="África").slice(0,9))s.properties[b.id].buildings=4;
    expect(()=>go(s,{type:"build",square:1})).toThrow(/casas disponibles/);
  });
  it("hipoteca fuera de turno y redime con diez por ciento",()=>{
    let s=game();s.properties[1].owner="b";
    s=go(s,{type:"mortgage",square:1},[1,2],"b");expect(s.players[1].money).toBe(140500);
    s=go(s,{type:"redeem",square:1},[1,2],"b");expect(s.players[1].money).toBe(133900);
    expect(s.properties[1].mortgaged).toBe(false);
  });
  it("no duplica dinero al devolver una propiedad hipotecada",()=>{
    let s=game();s.properties[1].owner="a";
    s=go(s,{type:"mortgage",square:1});s=go(s,{type:"return",square:1});
    expect(s.players[0].money).toBe(140500);expect(s.properties[1].owner).toBeNull();
    expect(()=>go(s,{type:"return",square:1})).toThrow();
  });
  it("Australia y visita a Deportado no penalizan",()=>{
    for(const [from,to] of [[17,20],[7,10]]){const s=game();s.players[0].position=from;
      const next=go(s,{type:"roll"});expect(next.players[0].position).toBe(to);expect(next.players[0].jailed).toBe(0);}
  });
  it("Cárcel cobra fianza y pierde exactamente tres turnos; dobles no liberan",()=>{
    let s=game();s.players[0].position=27;s=go(s,{type:"roll"});
    expect(s.players[0].jailed).toBe(3);expect(s.debt?.amount).toBe(10000);
    s=go(s,{type:"settle"});expect(s.players[0].money).toBe(124500);
    for(let remaining=2;remaining>=0;remaining--){s.phase="roll";s=go(s,{type:"roll"},[2,2]);
      expect(s.players[0].position).toBe(30);expect(s.players[0].jailed).toBe(remaining);expect(s.phase).toBe("end");}
    s.phase="roll";s=go(s,{type:"roll"},[1,3]);expect(s.players[0].position).toBe(34);
  });
  it("tercer doble deporta; la multa devuelve a Salida sin sueldo",()=>{
    let s=game();s.doubles=2;s.players[0].position=39;
    s=go(s,{type:"roll"},[2,2]);expect(s.players[0].position).toBe(10);expect(s.players[0].jailed).toBe(3);
    expect(s.players[0].money).toBe(INITIAL_MONEY);expect(s.extra).toBe(false);
    s=go(s,{type:"bail"});expect(s.players[0].position).toBe(0);expect(s.players[0].money).toBe(129500);expect(s.players[0].salary).toBe(0);
  });
  it("deportación admite esperar tres turnos y no salir al segundo",()=>{
    let s=game();s.doubles=2;s=go(s,{type:"roll"},[2,2]);
    for(let remaining=2;remaining>=0;remaining--){s.phase="roll";s=go(s,{type:"wait"});expect(s.players[0].jailed).toBe(remaining);
      expect(s.players[0].position).toBe(remaining ? 10 : 0);expect(s.phase).toBe("end");}
  });
  it("renta de aerolíneas y diplomacia usa factores de referencia",()=>{
    const s=game();s.properties[5].owner="b";s.properties[15].owner="b";expect(rent(s,5,7)).toBe(5000);
    s.properties[3].owner="b";expect(rent(s,3,7)).toBe(3500);s.properties[22].owner="b";expect(rent(s,3,7)).toBe(7000);
  });
  it("deuda exige pago y admite hipoteca para reunir el importe",()=>{
    let s=game();s.players[0].money=100;s.properties[3].owner="b";s.properties[1].owner="a";
    s=go(s,{type:"roll"});expect(s.debt?.amount).toBe(1500);expect(()=>go(s,{type:"end"})).toThrow(/deuda/);
    s=go(s,{type:"mortgage",square:1});s=go(s,{type:"settle"});expect(s.players[0].money).toBe(4600);expect(s.players[1].money).toBe(136000);
  });
  it("quiebra transfiere hipotecas, cobra intereses al heredero y después declara ganador",()=>{
    let s=game();s.players[0].money=0;s.properties[1].owner="a";s.properties[1].mortgaged=true;
    s.debt={amount:200000,creditor:"b",payer:"a"};s=go(s,{type:"bankrupt"});
    expect(s.properties[1].owner).toBe("b");expect(s.debt).toMatchObject({payer:"b",amount:1200});expect(s.status).toBe("playing");
    expect(redemptionCost(s,1)).toBe(6000);
    s=go(s,{type:"settle"},[1,2],"b");expect(s.players[1].money).toBe(133300);expect(s.winner).toEqual(["b"]);
  });
  it("quiebra al Banco subasta bienes cuando quedan otros dos jugadores",()=>{
    let s=game(3);s.players[0].money=0;s.properties[1].owner="a";s.debt={amount:100000,creditor:null,payer:"a"};
    s=go(s,{type:"bankrupt"});expect(s.properties[1].owner).toBeNull();expect(s.auction?.square).toBe(1);
    s=go(s,{type:"bid",amount:500},[1,2],"b");s=go(s,{type:"fold"},[1,2],"c");expect(s.properties[1].owner).toBe("b");expect(s.auction).toBeNull();
  });
  it("no permite quiebra mientras los bienes cubran la deuda",()=>{
    const s=game();s.debt={amount:100,creditor:null,payer:"a"};expect(()=>go(s,{type:"bankrupt"})).toThrow(/cubrir/);
  });
  it("rechazar compra abre subasta; el mismo jugador puede ganarla",()=>{
    let s=game();s=go(s,{type:"roll"});s=go(s,{type:"decline"});expect(s.auction?.square).toBe(3);
    s=go(s,{type:"bid",amount:500});s=go(s,{type:"fold"},[1,2],"b");
    expect(s.properties[3].owner).toBe("a");expect(s.players[0].money).toBe(134000);expect(()=>go(s,{type:"buy"})).toThrow();
  });
  it("subasta vence durante polling sin temporizador residente",()=>{
    let s=game();s=go(go(s,{type:"roll"}),{type:"decline"});s=go(s,{type:"bid",amount:1000});
    expect(finishByTime(s,20999)).toBe(s);s=finishByTime(s,21000);expect(s.auction).toBeNull();expect(s.properties[3].owner).toBe("a");
  });
  it("tratos fuera de turno revalidan propiedad y saldo",()=>{
    let s=game();s.properties[1].owner="b";
    s=go(s,{type:"trade",to:"a",give:[1],take:[],giveMoney:0,takeMoney:10000},[1,2],"b");
    const id=s.trades[0].id;s=go(s,{type:"accept",trade:id});expect(s.properties[1].owner).toBe("a");
    expect(s.players[0].money).toBe(124500);expect(s.players[1].money).toBe(144500);expect(()=>go(s,{type:"accept",trade:id})).toThrow();
  });
  it("prisión impide administrar propiedades pero permite liquidar para pagar fianza",()=>{
    const s=game();s.players[0].jailed=3;s.players[0].detention="prison";s.properties[1].owner="a";
    expect(()=>go(s,{type:"mortgage",square:1})).toThrow(/cárcel/);s.debt={payer:"a",creditor:null,amount:10000,reason:"bail"};
    expect(go(s,{type:"mortgage",square:1}).properties[1].mortgaged).toBe(true);
  });
  it("pase diplomático cancela la fianza pendiente y regresa al mazo",()=>{
    let s=game();s.players[0].position=5;s.decks.sms=[0,...s.decks.sms.filter((i)=>i!==0)];
    s=go(s,{type:"roll"});expect(s.players[0].passes).toEqual(["sms"]);expect(s.decks.sms).not.toContain(0);
    s.phase="roll";s.players[0].position=27;s=go(s,{type:"roll"});s=go(s,{type:"pass"});
    expect(s.debt).toBeNull();expect(s.players[0].jailed).toBe(0);expect(s.decks.sms.at(-1)).toBe(0);expect(s.players[0].money).toBe(INITIAL_MONEY);
  });
  it("termina por tiempo con empate y patrimonio neto",()=>{
    const s=game();s.endsAt=2000;expect(finishByTime(s,1999)).toBe(s);expect(finishByTime(s,2000).winner).toEqual(["a","b"]);
    s.properties[1].owner="a";expect(finishByTime(s,2000).winner).toEqual(["a"]);
  });
  it("moderación exige host e inactividad comprobada",()=>{
    const s=game();expect(()=>go(s,{type:"skip"})).toThrow(/90/);
    expect(engine(s,{type:"skip"},"a",{...ctx,inactive:true}).turn).toBe(1);
  });
});
