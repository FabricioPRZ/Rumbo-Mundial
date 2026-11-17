import { body, respond } from "@/server/http/responses";
import { createRoom } from "@/server/http/room-controller";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: Request) {
  return respond(async () => createRoom(await body(req)));
}
