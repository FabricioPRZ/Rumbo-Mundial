import { NextResponse } from "next/server";
import { respond } from "@/lib/http";
import { getRoom } from "@/lib/store";
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const url = new URL(req.url);
  const response = await respond(() =>
    getRoom(
      id,
      req.headers.get("authorization")?.replace(/^Bearer /, "") ?? null,
      req.headers.get("x-heartbeat") === "1",
    ),
  );
  if (response.ok) {
    const data = await response.clone().json();
    if (url.searchParams.get("since") === String(data.game.version))
      return NextResponse.json(
        {
          changed: false,
          inactiveFor: data.inactiveFor,
          playerId: data.playerId,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
  }
  return response;
}
