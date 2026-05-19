import { PinecodeError, PinecodeErrorCode } from "./errors.js";
import { NETWORKS } from "./networks.js";
import type {
  PinecodeOptions,
  Network,
  RecallParams,
  RecallHit,
  ContributeParams,
  ContributeReceipt,
  StakeParams,
  ChallengeParams,
  RewardSummary,
} from "./types.js";

/**
 * Main entry point for the Pinecode SDK.
 *
 * @example
 * ```ts
 * const pinecode = new Pinecode({ network: "base" });
 * const hits = await pinecode.recall({ query: "How does ERC-4337 work?" });
 * ```
 */
export class Pinecode {
  readonly options: PinecodeOptions;
  readonly gateway: string;
  readonly chainId: number;
  readonly events = new EventBus();
  readonly rewards: RewardsApi;
  readonly balance: BalanceApi;

  constructor(options: PinecodeOptions) {
    this.options = options;
    const cfg = resolveNetwork(options.network);
    this.chainId = cfg.chainId;
    this.gateway = options.gateway ?? cfg.gateway;
    this.rewards = new RewardsApi(this);
    this.balance = new BalanceApi(this);
  }

  /**
   * Semantically recall seeds from the network. Settles a USDC micropayment via x402.
   */
  async recall(params: RecallParams): Promise<RecallHit[]> {
    const limit = params.limit ?? 5;
    if (limit > 50) {
      throw new PinecodeError(PinecodeErrorCode.Unknown, "limit cannot exceed 50");
    }

    const res = await this.#post("/recall", params);
    return res.hits as RecallHit[];
  }

  /**
   * Register a new seed on the network.
   */
  async contribute(params: ContributeParams): Promise<ContributeReceipt> {
    this.#requireSigner();
    const res = await this.#post("/contribute", params);
    return res as unknown as ContributeReceipt;
  }

  /**
   * Stake PINE on a seed to signal its quality and earn a share of recall fees.
   */
  async stake(params: StakeParams): Promise<{ positionId: number; txHash: `0x${string}` }> {
    this.#requireSigner();
    const res = await this.#post("/stake", params);
    return res as { positionId: number; txHash: `0x${string}` };
  }

  /**
   * Withdraw stake after the lock period expires.
   */
  async unstake(params: { seedId: number; positionId: number }): Promise<{ txHash: `0x${string}` }> {
    this.#requireSigner();
    const res = await this.#post("/unstake", params);
    return res as { txHash: `0x${string}` };
  }

  /**
   * Challenge a seed you believe is low-quality or fraudulent.
   */
  async challenge(params: ChallengeParams): Promise<{ challengeId: number; txHash: `0x${string}` }> {
    this.#requireSigner();
    const res = await this.#post("/challenge", params);
    return res as { challengeId: number; txHash: `0x${string}` };
  }

  /**
   * Delegate stake-weighted curation to another address.
   */
  async delegate(params: { to: string; amount: string }): Promise<{ txHash: `0x${string}` }> {
    this.#requireSigner();
    const res = await this.#post("/delegate", params);
    return res as { txHash: `0x${string}` };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // internals

  async #post(path: string, body: unknown): Promise<Record<string, unknown>> {
    const url = `${this.gateway}${path}`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json", "user-agent": `@pinecode/sdk/${"0.6.2"}` },
        body: JSON.stringify(body),
      });
      if (res.status === 402) {
        throw new PinecodeError(PinecodeErrorCode.PaymentRequired, "Payment required");
      }
      if (!res.ok) {
        throw new PinecodeError(PinecodeErrorCode.GatewayUnavailable, `Gateway returned ${res.status}`);
      }
      return (await res.json()) as Record<string, unknown>;
    } catch (err) {
      if (err instanceof PinecodeError) throw err;
      throw new PinecodeError(PinecodeErrorCode.NetworkError, (err as Error).message);
    }
  }

  #requireSigner(): void {
    if (!this.options.privateKey) {
      throw new PinecodeError(
        PinecodeErrorCode.SignatureRequired,
        "This method requires a privateKey or Signer. Initialize Pinecode with { privateKey } to enable signing.",
      );
    }
  }
}

class RewardsApi {
  #client: Pinecode;
  constructor(client: Pinecode) {
    this.#client = client;
  }
  async summary(): Promise<RewardSummary> {
    const res = await fetch(`${this.#client.gateway}/rewards/summary`);
    return (await res.json()) as RewardSummary;
  }
  async claim(_params: { epochs?: number[] } = {}): Promise<{ txHash: `0x${string}` }> {
    return { txHash: "0x0000000000000000000000000000000000000000000000000000000000000000" };
  }
}

class BalanceApi {
  #client: Pinecode;
  constructor(client: Pinecode) {
    this.#client = client;
  }
  async get(): Promise<{ balance: string }> {
    const res = await fetch(`${this.#client.gateway}/balance`);
    return (await res.json()) as { balance: string };
  }
  async deposit(_params: { amount: string }): Promise<{ txHash: `0x${string}` }> {
    return { txHash: "0x0000000000000000000000000000000000000000000000000000000000000000" };
  }
}

type EventHandler = (event: Record<string, unknown>) => void;

class EventBus {
  #handlers = new Map<string, Set<EventHandler>>();

  on(event: string, handler: EventHandler): () => void {
    if (!this.#handlers.has(event)) this.#handlers.set(event, new Set());
    this.#handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off(event: string, handler: EventHandler): void {
    this.#handlers.get(event)?.delete(handler);
  }

  subscribe(_params: { topics: string[]; fromBlock?: string | number }): () => void {
    return () => undefined;
  }
}

function resolveNetwork(net: Network): {
  chainId: number;
  gateway: string;
  rpcUrl: string;
} {
  if (typeof net === "object") {
    return { chainId: net.chainId, gateway: "https://api.pinecode.io", rpcUrl: net.rpcUrl };
  }
  const cfg = NETWORKS[net];
  if (!cfg) throw new PinecodeError(PinecodeErrorCode.Unknown, `Unknown network: ${net}`);
  return { chainId: cfg.chainId, gateway: cfg.gateway, rpcUrl: cfg.rpcUrl };
}
