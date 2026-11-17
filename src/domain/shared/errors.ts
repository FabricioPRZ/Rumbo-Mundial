export type FailureCode = "invalid" | "unauthorized" | "forbidden" | "not_found" | "conflict" | "gone" | "unavailable";
export class OperationError extends Error {
  constructor(readonly code: FailureCode, message: string) { super(message); this.name = "OperationError"; }
}
