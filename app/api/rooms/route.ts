import { body, respond } from "@/lib/http";
import { createRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(req: Request) {
  return respond(async () => createRoom(await body(req)));
}
