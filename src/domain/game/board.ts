import type { Square, SquareKind } from "./types";

// Datos transcritos de las referencias del usuario. El arte se dibuja en código.
// Los índices siguen el recorrido: Salida → Marruecos, en sentido antihorario.
const special = (id: number, name: string, kind: SquareKind): Square =>
  ({ id, name, kind, price: 0, mortgage: 0, rents: [], buildCost: 0 });
const colors: Record<string, string> = {
  África: "#df9a43", Asia: "#df6475", Norteamérica: "#459ed2",
  Centroamérica: "#e5c348", "Andes y Caribe": "#8eb95a",
  "Cono Sur": "#b08759", "Europa occidental": "#a985d4", "Europa central": "#50b39d",
};
const country = (id: number, name: string, group: string, flag: string,
  price: number, rents: number[], buildCost: number): Square => ({
  id, name, kind: "country", group, color: colors[group], flag, price,
  mortgage: price / 2, rents, buildCost,
});
const airline = (id: number, name: string): Square => ({
  ...special(id, name, "airline"), price: 20000, mortgage: 10000,
  rents: [2500, 5000, 10000, 20000],
});
const utility = (id: number, name: string): Square => ({
  ...special(id, name, "utility"), price: 20000, mortgage: 10000, rents: [500, 1000],
});
export const BOARD: Square[] = [
  special(0, "Salida", "start"),
  country(1, "Marruecos", "África", "🇲🇦", 12000, [1500,5000,13000,36000,48000,60000], 5000),
  country(2, "Egipto", "África", "🇪🇬", 15000, [2000,6000,17000,45000,60000,75000], 10000),
  utility(3, "Embajada"),
  country(4, "Sudáfrica", "África", "🇿🇦", 23000, [2500,9500,25000,69000,92000,115000], 10000),
  airline(5, "Aerolínea Afroasiática"),
  country(6, "Rusia", "Asia", "🇷🇺", 24000, [3000,9500,26000,72000,96000,120000], 15000),
  country(7, "China", "Asia", "🇨🇳", 28000, [3000,11500,30500,84000,112000,140000], 15000),
  special(8, "Mensaje", "sms"),
  // La tarjeta fotografiada imprime 144,000 con tres casas: se conserva ese valor.
  country(9, "Japón", "Asia", "🇯🇵", 38000, [4500,15500,41500,144000,152000,190000], 20000),
  special(10, "Deportado", "oceania"),
  country(11, "Canadá", "Norteamérica", "🇨🇦", 30000, [4000,12000,33000,90000,120000,150000], 20000),
  country(12, "Estados Unidos", "Norteamérica", "🇺🇸", 40000, [5000,16000,44000,120000,160000,200000], 20000),
  special(13, "Correo", "email"),
  // La hipoteca del reverso de México difiere: prevalece el precio del tablero / 2.
  country(14, "México", "Norteamérica", "🇲🇽", 26000, [3000,11000,29000,78000,104000,130000], 15000),
  airline(15, "Aerolínea Americana"),
  country(16, "Guatemala", "Centroamérica", "🇬🇹", 10000, [1500,4000,11000,30000,40000,50000], 5000),
  country(17, "Costa Rica", "Centroamérica", "🇨🇷", 10000, [1500,4000,11000,30000,40000,50000], 5000),
  special(18, "Mensaje", "sms"),
  country(19, "Panamá", "Centroamérica", "🇵🇦", 8000, [1000,3500,8000,24000,32000,40000], 5000),
  special(20, "Australia", "rest"),
  // Bloques según los títulos: Perú/Colombia/Venezuela y Brasil/Chile/Argentina.
  country(21, "Colombia", "Andes y Caribe", "🇨🇴", 20000, [2500,8000,22000,60000,80000,100000], 10000),
  utility(22, "Consulado"),
  country(23, "Venezuela", "Andes y Caribe", "🇻🇪", 22000, [2500,8000,24000,66000,88000,110000], 10000),
  country(24, "Perú", "Andes y Caribe", "🇵🇪", 18000, [2000,7500,19500,54000,72000,90000], 10000),
  airline(25, "Aerolínea Sudamericana"),
  country(26, "Brasil", "Cono Sur", "🇧🇷", 26000, [3000,11000,29000,78000,112000,130000], 15000),
  special(27, "Correo", "email"),
  country(28, "Chile", "Cono Sur", "🇨🇱", 18000, [2000,7500,19500,54000,72000,90000], 10000),
  country(29, "Argentina", "Cono Sur", "🇦🇷", 25000, [3000,10000,27500,75000,100000,125000], 15000),
  special(30, "Cárcel", "go-oceania"),
  country(31, "España", "Europa occidental", "🇪🇸", 28000, [3500,11500,30500,84000,112000,140000], 15000),
  country(32, "Francia", "Europa occidental", "🇫🇷", 36000, [4500,15000,39500,108000,144000,180000], 20000),
  special(33, "Correo", "email"),
  country(34, "Inglaterra", "Europa occidental", "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 32000, [4000,13000,35000,96000,128000,160000], 20000),
  airline(35, "Aerolínea Europea"),
  country(36, "Italia", "Europa central", "🇮🇹", 35000, [4000,14000,39000,105000,140000,175000], 20000),
  special(37, "Mensaje", "sms"),
  country(38, "Suiza", "Europa central", "🇨🇭", 36000, [4500,14500,39500,108000,144000,180000], 15000),
  country(39, "Alemania", "Europa central", "🇩🇪", 37000, [4500,15000,40000,111000,148000,185000], 20000),
];
export const RULES_VERSION = 2;
export const GAME_NAME = "Rumbo Mundial";
export const SALARY = 20000;
export const INITIAL_MONEY = 134500;
export const DEPORTATION_FINE = 5000;
export const PRISON_BAIL = 10000;
// Regla de esta adaptación: subastas al 80% del valor, redondeadas a $500.
export const AUCTION_PRICE_RATIO = 0.8;
export const AUCTION_INCREMENT = 500;
// VERIFICAR: la transcripción no especifica inventario; configuración de esta adaptación.
export const HOUSE_SUPPLY = 36;
export const HOTEL_SUPPLY = 12;
export const cash = (amount: number) => `$${amount.toLocaleString("es-MX")}`;
