import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { HttpError } from "./store";
export async function body(req: Request): Promise<unknown> {
  const text = await req.text();
  if (text.length > 16000)
    throw new HttpError(413, "Solicitud demasiado grande.");
  try {
    return JSON.parse(text);
  } catch {
    throw new HttpError(400, "JSON inválido.");
  }
}
export async function respond(fn: () => Promise<unknown>) {
  try {
    return NextResponse.json(await fn(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    const status =
      e instanceof HttpError ? e.status : e instanceof ZodError ? 400 : 500;
    const message =
      e instanceof HttpError
        ? e.message
        : e instanceof ZodError
          ? "Revisa los datos enviados."
          : "No pudimos conectar con Redis. Intenta nuevamente.";
    if (status === 500)
      console.error(
        "Redis request failed",
        e instanceof Error ? e.name : "unknown",
      );
    return NextResponse.json(
      { error: message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}
