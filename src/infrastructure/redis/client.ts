import { OperationError } from "@/domain/shared/errors";
import { Redis } from "@upstash/redis";
export function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new OperationError("unavailable", "Configura las variables de Upstash Redis para jugar.");
  return new Redis({ url, token });
}
