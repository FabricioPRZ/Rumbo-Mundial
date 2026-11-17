import { body, respond } from "@/server/http/responses";
import { act } from "@/server/http/room-controller";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return respond(async () => act((await params).id, await body(req)));
}
