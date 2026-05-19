export enum PinecodeErrorCode {
  PaymentRequired = "PAYMENT_REQUIRED",
  PaymentExceedsCeiling = "PAYMENT_EXCEEDS_CEILING",
  InsufficientBalance = "INSUFFICIENT_BALANCE",
  GatewayUnavailable = "GATEWAY_UNAVAILABLE",
  IndexerStale = "INDEXER_STALE",
  SignatureRequired = "SIGNATURE_REQUIRED",
  InvalidSignature = "INVALID_SIGNATURE",
  BondInsufficient = "BOND_INSUFFICIENT",
  PinecodeNotFound = "PINE_NOT_FOUND",
  PinecodeDecommissioned = "PINE_DECOMMISSIONED",
  ChallengeOpen = "CHALLENGE_OPEN",
  StakeLocked = "STAKE_LOCKED",
  RateLimited = "RATE_LIMITED",
  NetworkError = "NETWORK_ERROR",
  Unknown = "UNKNOWN",
}

export class PinecodeError extends Error {
  readonly code: PinecodeErrorCode;
  readonly details?: Record<string, unknown>;

  constructor(code: PinecodeErrorCode, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "PinecodeError";
    this.code = code;
    this.details = details;
  }
}

export function isPinecodeError(err: unknown): err is PinecodeError {
  return err instanceof PinecodeError;
}
