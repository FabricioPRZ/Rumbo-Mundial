export type Card = { text: string } & (
  | { kind: "money"; amount: number }
  | { kind: "move"; target: number }
  | { kind: "jail" | "pass" }
  | { kind: "repairs"; restaurant: number; hotel: number }
);
export const CARDS: Record<"email" | "sms", Card[]> = {
  email: [
    { text: "La tanda sí pagó. Cobra $200.", kind: "money", amount: 200 },
    {
      text: "Tu maleta decidió viajar aparte. Paga $50.",
      kind: "money",
      amount: -50,
    },
    {
      text: "Regresa a México por unos tacos. Cobra la salida.",
      kind: "move",
      target: 0,
    },
    { text: "Escala de tres turnos en Oceanía. Ni modo.", kind: "jail" },
    {
      text: "Tu prima conoce al piloto. Guarda una salida de Oceanía.",
      kind: "pass",
    },
    {
      text: "Mantenimiento: $25 por restaurante y $100 por hotel.",
      kind: "repairs",
      restaurant: 25,
      hotel: 100,
    },
    { text: "Reembolso del vuelo. Cobra $100.", kind: "money", amount: 100 },
    {
      text: "Te tocó pagar el mariachi. Paga $80.",
      kind: "money",
      amount: -80,
    },
    {
      text: "Tu reseña de chilaquiles se hizo viral. Cobra $150.",
      kind: "money",
      amount: 150,
    },
    {
      text: "Visita Francia. Si pasas México, cobra $200.",
      kind: "move",
      target: 27,
    },
    {
      text: "Promo de Aeroméxico. Avanza a su casilla.",
      kind: "move",
      target: 5,
    },
    { text: "Vendiste tus millas. Cobra $50.", kind: "money", amount: 50 },
    { text: "El roaming no perdona. Paga $100.", kind: "money", amount: -100 },
    {
      text: "Premio al mejor anfitrión. Cobra $75.",
      kind: "money",
      amount: 75,
    },
    { text: "Renovación de pasaporte. Paga $60.", kind: "money", amount: -60 },
    {
      text: "Tu tía te mandó para el viaje. Cobra $120.",
      kind: "money",
      amount: 120,
    },
  ],
  sms: [
    {
      text: "Depósito recibido: la quincena. Cobra $150.",
      kind: "money",
      amount: 150,
    },
    {
      text: "Invitaste las quesadillas. Paga $40.",
      kind: "money",
      amount: -40,
    },
    {
      text: "México te extraña. Regresa y cobra la salida.",
      kind: "move",
      target: 0,
    },
    { text: "Vuelo equivocado: destino Oceanía.", kind: "jail" },
    {
      text: "Pase de salida de Oceanía. Guárdalo para la escala.",
      kind: "pass",
    },
    {
      text: "Fumigación: $40 por restaurante y $115 por hotel.",
      kind: "repairs",
      restaurant: 40,
      hotel: 115,
    },
    {
      text: "Bono de viajero frecuente. Cobra $100.",
      kind: "money",
      amount: 100,
    },
    { text: "Se rompió la pantalla. Paga $120.", kind: "money", amount: -120 },
    { text: "Visita Japón por un ramen.", kind: "move", target: 32 },
    {
      text: "Escápate a España. Cobra si pasas México.",
      kind: "move",
      target: 11,
    },
    {
      text: "Ganaste la rifa de la oficina. Cobra $200.",
      kind: "money",
      amount: 200,
    },
    {
      text: "Exceso de equipaje: llevabas el molcajete. Paga $75.",
      kind: "money",
      amount: -75,
    },
    { text: "Te devolvieron el cambio. Cobra $25.", kind: "money", amount: 25 },
    { text: "Propina para el guía. Paga $30.", kind: "money", amount: -30 },
    { text: "Vendiste las postales. Cobra $60.", kind: "money", amount: 60 },
    { text: "Reservación cancelada. Paga $150.", kind: "money", amount: -150 },
  ],
};
