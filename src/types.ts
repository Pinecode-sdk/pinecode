export type Network = "base" | "base-sepolia" | { rpcUrl: string; chainId: number };

export interface PinecodeOptions {
  network: Network;
  gateway?: string;
  privateKey?: string;
  defaultModel?: string;
  timeoutMs?: number;
}

export interface RecallParams {
  query: string;
  limit?: number;
  minScore?: number;
  tags?: string[];
  paymentMax?: string;
  embeddingModel?: string;
  preferIndexer?: string;
}

export interface RecallHit {
  seedId: number;
  cid: string;
  title?: string;
  content: string;
  score: number;
  contributor: `0x${string}`;
  contributorEns?: string;
  tags: string[];
  qualityScore: number;
  feePaid: string;
  signature: `0x${string}`;
}

export interface ContributeParams {
  content: string | Uint8Array;
  title?: string;
  source?: string;
  tags?: string[];
  embeddingModel?: string;
  bond?: string;
}

export interface ContributeReceipt {
  seedId: number;
  cid: string;
  txHash: `0x${string}`;
  bondLocked: string;
  estimatedFirstRecall?: string;
}

export interface StakeParams {
  seedId: number;
  amount: string;
  duration: "7d" | "30d" | "90d" | "365d";
}

export interface ChallengeParams {
  seedId: number;
  bond: string;
  reason: string;
  evidence?: string;
}

export interface RewardSummary {
  unclaimedUsdc: string;
  unclaimedPinecode: string;
  epochs: number[];
  nextEpoch: string;
}
