import { body, respond } from "@/lib/http";
import { HttpError } from "@/lib/store";
import { getVoice, updateVoice } from "@/lib/voice/store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
function token(request: Request) {
  const value = request.headers.get("authorization");
  if (!value?.startsWith("Bearer ")) throw new HttpError(401, "Entra a la sala para usar la voz.");
  return value.slice(7);
}
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return respond(async () => getVoice((await params).id, token(request), new URL(request.url).searchParams.get("session") ?? ""));
}
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return respond(async () => updateVoice((await params).id, token(request), await body(request)));
}
