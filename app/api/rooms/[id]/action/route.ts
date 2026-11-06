import { body, respond } from "@/lib/http";
import { act } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  return respond(async () => act((await params).id, await body(req)));
}
