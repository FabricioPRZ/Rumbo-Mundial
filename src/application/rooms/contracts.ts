import type { Action } from "@/domain/game/types";
import type { Platform } from "../ports/platform";
import type { RoomRepository } from "../ports/room-repository";
export interface RoomDependencies { rooms: RoomRepository; platform: Platform; }
export interface CreateRoomInput { name: string; color?: string; duration: 0 | 30 | 60 | 90; }
export interface JoinRoomInput { name: string; color?: string; token?: string; }
export interface RoomActionInput { token: string; action: Action; version: number; requestId: string; }
