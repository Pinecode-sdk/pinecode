/**
 * @pinecode/sdk — TypeScript SDK for the Pinecode protocol.
 *
 * The decentralized memory network for AI agents.
 *
 * @see https://pinecode.io/docs/sdk
 */

export { Pinecode } from "./client.js";
export type {
  PinecodeOptions,
  RecallParams,
  RecallHit,
  ContributeParams,
  ContributeReceipt,
  StakeParams,
  ChallengeParams,
  Network,
} from "./types.js";

export { PinecodeErrorCode, PinecodeError, isPinecodeError } from "./errors.js";
export { verifyPinecode } from "./verify.js";
export { NETWORKS } from "./networks.js";

export const VERSION = "0.6.2";
