import type { Game } from "@/domain/game/types";
export interface StoredRoom { game: Game; tokens: Record<string, string>; receipts: Record<string, number>; }
export interface RoomRepository {
  load(id: string): Promise<StoredRoom | null>;
  create(id: string, room: StoredRoom): Promise<boolean>;
  save(id: string, expectedVersion: number, room: StoredRoom): Promise<void>;
  markSeen(id: string, playerId: string, now: number): Promise<void>;
  lastSeen(id: string, playerId: string): Promise<number | null>;
}
