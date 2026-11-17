import { OperationError, type FailureCode } from "@/domain/shared/errors";
const status: Record<FailureCode, number> = { invalid: 400, unauthorized: 401, forbidden: 403, not_found: 404, conflict: 409, gone: 410, unavailable: 503 };
export class HttpError extends Error { constructor(readonly status: number, message: string) { super(message); } }
export async function httpCall<T>(operation: () => Promise<T>): Promise<T> {
  try { return await operation(); } catch (error) {
    if (error instanceof OperationError) throw new HttpError(status[error.code], error.message);
    throw error;
  }
}
