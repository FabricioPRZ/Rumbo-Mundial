import { expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { checkArchitecture } from "../scripts/check-architecture.mjs";

it("mantiene las capas, la jerarquía atómica y un grafo sin ciclos", () => {
  expect(checkArchitecture().errors).toEqual([]);
});
it("detecta fugas de Redis, efectos externos y dependencias inversas", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "rumbo-boundaries-"));
  const files = {
    "domain/rules.ts": 'import { Redis } from "@upstash/redis"; export const now = Date.now();',
    "application/example.ts": 'import "@/infrastructure/redis/client";',
    "infrastructure/redis/client.ts": 'export const client = {};',
    "presentation/atoms/Button.tsx": 'import "../organisms/Board";',
    "presentation/organisms/Board.tsx": 'import "../atoms/Button";',
  };
  try {
    for (const [file, content] of Object.entries(files)) {
      const target = path.join(dir, "src", file);
      mkdirSync(path.dirname(target), { recursive: true }); writeFileSync(target, content);
    }
    const errors = checkArchitecture(dir).errors.join("\n");
    expect(errors).toContain("dependencia externa @upstash/redis");
    expect(errors).toContain("el reloj y la aleatoriedad deben inyectarse");
    expect(errors).toContain("application → infrastructure");
    expect(errors).toContain("jerarquía atómica invertida atoms → organisms");
    expect(errors).toContain("ciclo");
  } finally { rmSync(dir, { recursive: true, force: true }); }
});
