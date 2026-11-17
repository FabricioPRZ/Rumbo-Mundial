import type { CreateRoomInput, JoinRoomInput, RoomActionInput } from "@/application/rooms/contracts";
import type { Game } from "@/domain/game/types";

export class RoomApiError extends Error {
  constructor(readonly status: number, message: string) { super(message); this.name = "RoomApiError"; }
}
interface RoomView { game?: Game; playerId: string | null; inactiveFor: number; changed?: false }
interface EntryResponse { id?: string; playerToken: string; playerId: string; game: Game }
async function request<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new RoomApiError(response.status, data.error ?? "No se pudo conectar con la sala.");
  return data as T;
}
const post = <T>(url: string, body: unknown) => request<T>(url, {
  method: "POST", headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body), signal: AbortSignal.timeout(15000),
});
export const roomApi = {
  get: (id: string, version: number, token: string | null, heartbeat: boolean) => request<RoomView>(`/api/rooms/${encodeURIComponent(id)}?since=${version}`, {
    headers: token ? { Authorization: `Bearer ${token}`, "x-heartbeat": heartbeat ? "1" : "0" } : {},
    signal: AbortSignal.timeout(12000),
  }),
  act: (id: string, input: RoomActionInput) => post<{ game: Game }>(`/api/rooms/${encodeURIComponent(id)}/action`, input),
  create: (input: CreateRoomInput) => post<EntryResponse>("/api/rooms", input),
  join: (id: string, input: JoinRoomInput) => post<EntryResponse>(`/api/rooms/${encodeURIComponent(id)}/join`, input),
};
