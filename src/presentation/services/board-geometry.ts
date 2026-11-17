export function coordinates(id: number): [number, number] {
  if (id <= 10) return [0, id];
  if (id <= 20) return [id - 10, 10];
  if (id <= 30) return [10, 30 - id];
  return [40 - id, 0];
}
