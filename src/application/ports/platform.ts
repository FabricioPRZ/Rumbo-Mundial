export interface Platform {
  now(): number;
  uuid(): string;
  digest(token: string): string;
  randomInt(max: number): number;
}
