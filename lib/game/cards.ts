// Redacción original. Efectos inspirados en las referencias aportadas por el usuario.
export type Card = { text: string } & (
  | { kind: "money"; amount: number }
  | { kind: "move"; target: number; fine?: number; skip?: number }
  | { kind: "jail"; detention?: "prison" | "oceania"; turns?: number; fine?: number }
  | { kind: "pass" | "acquisition" | "bonus" | "refund" | "expropriate" | "airline" }
  | { kind: "collect"; amount: number; skip?: number }
  | { kind: "everyone"; amount: number; toPlayer?: boolean }
  | { kind: "repairs"; restaurant: number; hotel: number }
);
export const CARDS: Record<"email" | "sms", Card[]> = {
  email: [
    { kind: "acquisition", text: "Última pieza del rompecabezas. Guarda este permiso para adquirir el país que complete uno de tus bloques: paga la renta a su dueño, o el precio menos $1,000 al Banco." },
    { kind: "bonus", text: "Tu ruta se vuelve tendencia. La próxima visita a uno de tus países sin casas ni hotel paga el doble de la renta habitual. Una sola vez." },
    { kind: "collect", amount: 10000, skip: 1, text: "Ganaste el concurso de maletas imposibles. Elige a un viajero para cobrarle $10,000; descansa tu siguiente turno." },
    { kind: "money", amount: -1000, text: "Confundiste la fila del museo con la de las tortillas. Paga $1,000 por reponer tu entrada." },
    { kind: "money", amount: -5000, text: "La clase de baile incluyó una caída espectacular. La consulta cuesta $5,000." },
    { kind: "refund", text: "Tu última compra tenía un trámite pendiente. Devuélvela al Banco: recuperas la mitad del precio y de sus edificios, descontando su hipoteca." },
    { kind: "money", amount: 5000, text: "El autobús se fue con tu sombrero. La compañía te compensa con $5,000." },
    { kind: "money", amount: -2000, text: "La ganga del mercado no pasó la revisión. Paga $2,000 de multa." },
    { kind: "everyone", amount: 1000, text: "La foto grupal salió carísima. Paga $1,000 a cada uno de los demás viajeros." },
    { kind: "money", amount: 5000, text: "Perdiste tu conexión por un error del aeropuerto. Recibe $5,000 de compensación." },
    { kind: "money", amount: 20000, text: "Tu diario de viaje gana un premio. Cobra $20,000 y presume tu mejor anécdota." },
    { kind: "everyone", amount: 5000, toPlayer: false, text: "La excursión terminó con una multa colectiva. Todos pagan $5,000 al Banco." },
    { kind: "money", amount: 5000, text: "Tu reservación incluía sol, pero llegó lluvia. El hotel devuelve $5,000." },
    { kind: "move", target: 39, fine: 2000, text: "Te esperan en Alemania. Avanza hasta allí, resuelve la casilla y paga $2,000 por un trámite pendiente." },
    { kind: "money", amount: 5000, text: "La agencia reconoce su error en tu itinerario. Cobra $5,000." },
    { kind: "repairs", restaurant: 1000, hotel: 5000, text: "Hora de renovar las instalaciones: paga $1,000 por casa y $5,000 por hotel." },
  ],
  sms: [
    { kind: "pass", text: "Pase diplomático. Guárdalo para cancelar una deportación o la cárcel, incluida la fianza pendiente. Se usa una sola vez." },
    { kind: "jail", detention: "prison", turns: 1, text: "Tu pasaporte pasó por la lavadora. Ve a Cárcel, paga $10,000 de fianza y pierde un turno por esta revisión especial." },
    { kind: "money", amount: -5000, text: "La alberca no era el lugar para estrenar tu salsa. Paga $5,000 de limpieza." },
    { kind: "move", target: 0, text: "Conexión exprés. Avanza a Salida y recuerda cobrar tu sueldo de $20,000." },
    { kind: "money", amount: 2000, text: "Reclamación aprobada por el equipaje abollado. Recibe $2,000." },
    { kind: "money", amount: 10000, text: "La cena no fue lo que prometía el menú. El restaurante devuelve $10,000." },
    { kind: "money", amount: 5000, text: "Ganaste un concurso de postales. Cobra $5,000 y manda una al grupo." },
    { kind: "move", target: 20, skip: 2, text: "Escala larga en Australia. Viaja hasta allí y descansa dos turnos por esta carta." },
    { kind: "everyone", amount: -1000, text: "Se organizó la vaquita del viaje. Cada viajero te aporta $1,000." },
    { kind: "expropriate", text: "Nueva ruta ferroviaria. Tu propiedad más cara vuelve al Banco y se subasta. Recibes su renta base y la mitad del valor de sus edificios." },
    { kind: "jail", detention: "oceania", fine: 1000, text: "Tu visa tenía la fecha equivocada. Paga $1,000 y ve a Deportado; después elige entre la multa de salida o tres turnos." },
    { kind: "airline", text: "Compra de último minuto. Ve a la aerolínea libre más cercana y cómprala por su precio más $5,000. Si no queda ninguna, no ocurre nada." },
    { kind: "money", amount: 5000, text: "El aeropuerto recuperó tu maleta y te compensa con $5,000 por la demora." },
    { kind: "money", amount: -5000, text: "El recuerdo gigante necesitó su propio asiento. Paga $5,000 de equipaje extra." },
    { kind: "money", amount: -15000, text: "Corrección urgente de tus documentos de viaje. Paga $15,000 al Banco." },
    { kind: "move", target: 14, text: "Se te antojaron unos tacos. Avanza hasta México y resuelve esa casilla normalmente." },
  ],
};
