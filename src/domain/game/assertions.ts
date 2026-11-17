

export function requireRule(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error(message);
}
