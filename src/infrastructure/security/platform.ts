import type { Platform } from "@/application/ports/platform";
import { createHash, randomInt, randomUUID } from "node:crypto";
export const platform: Platform = {
  now: () => Date.now(), uuid: () => randomUUID(),
  digest: (token) => createHash("sha256").update(token).digest("hex"),
  randomInt: (max) => randomInt(max),
};
