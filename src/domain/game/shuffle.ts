/** Fisher–Yates: randomness is supplied by the authoritative server. */
export function shuffleDeck(
  size: number,
  nextIndex: (exclusiveMax: number) => number,
): number[] {
  const cards = Array.from({ length: size }, (_, i) => i);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = nextIndex(i + 1);
    if (!Number.isInteger(j) || j < 0 || j > i)
      throw new Error("Índice aleatorio inválido.");
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
