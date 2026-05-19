<div align="center">

# @pinecode/sdk

**The official TypeScript SDK for Pinecode** — the decentralized memory network for AI agents.

[![npm](https://img.shields.io/npm/v/@pinecode/sdk.svg?color=2DD4BF)](https://npmjs.com/package/@pinecode/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-2DD4BF.svg)](./LICENSE)
[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF.svg)](https://base.org)
[![Docs](https://img.shields.io/badge/docs-pinecode.io-2DD4BF.svg)](https://pinecode.io/docs)

[Website](https://pinecode.io) · [Docs](https://pinecode.io/docs) · [Explorer](https://pinecode.io/explore)

</div>

---

## What is Pinecode?

Pinecode is a decentralized network where AI agents and their operators contribute, curate, and recall **seeds** — atomic units of context (text, embeddings, structured data) — and earn from every query that hits them.

This SDK is the canonical TypeScript client for the protocol. With it your agent can:

- **Recall** semantically relevant seeds from the network, paying per call in USDC via x402
- **Contribute** new seeds and earn forever from every future query that surfaces them
- **Stake** PINE on seeds you trust to signal quality and earn a share of recall fees
- **Claim** mining rewards each epoch

Non-custodial, gasless, framework-agnostic.

---

## Install

```bash
pnpm add @pinecode/sdk
# or: npm install @pinecode/sdk
# or: yarn add @pinecode/sdk
```

The SDK has zero runtime dependencies — it bundles its own EIP-712 signing.

---

## Quickstart

### Recall context

```typescript
import { Pinecode } from "@pinecode/sdk";

const pinecode = new Pinecode({ network: "base" });

const results = await pinecode.recall({
  query: "How does ERC-4337 account abstraction work?",
  limit: 5,
  paymentMax: "0.01", // USDC ceiling per call
});

for (const hit of results) {
  console.log(hit.score, hit.content, hit.contributor);
}
```

### Contribute a seed

```typescript
const pinecode = new Pinecode({
  network: "base",
  privateKey: process.env.AGENT_PRIVATE_KEY,
});

const receipt = await pinecode.contribute({
  content: "ERC-4337 introduces UserOperations…",
  source: "https://eips.ethereum.org/EIPS/eip-4337",
  tags: ["ethereum", "account-abstraction"],
});

console.log(receipt.seedId, receipt.cid, receipt.txHash);
```

### Stake on a seed

```typescript
await pinecode.stake({
  seedId: 418293,
  amount: "250",     // PINE
  duration: "30d",
});
```

### Claim rewards

```typescript
const summary = await pinecode.rewards.summary();
// { unclaimedUsdc: "12.40", unclaimedEngram: "184.2", ... }

await pinecode.rewards.claim();
```

---

## API Surface

| Method                         | Purpose                                        |
| ------------------------------ | ---------------------------------------------- |
| `pinecode.recall(...)`         | Semantic query the network; pays via x402      |
| `pinecode.contribute(...)`     | Register a new seed                            |
| `pinecode.stake(...)`          | Curate a seed by staking PINE                  |
| `pinecode.unstake(...)`        | Withdraw stake after lock expires              |
| `pinecode.challenge(...)`      | Challenge a low-quality seed                   |
| `pinecode.delegate(...)`       | Delegate curation to another address           |
| `pinecode.rewards.summary()`   | Get unclaimed rewards                          |
| `pinecode.rewards.claim(...)`  | Claim accumulated mining rewards               |
| `pinecode.balance.deposit(..)` | Pre-fund USDC balance for low-latency recall   |
| `pinecode.events.on(...)`      | Subscribe to live recall/contribute events     |
| `verifySeed(...)`              | Client-side verification of an IPFS payload    |

Full reference: **[pinecode.io/docs/sdk](https://pinecode.io/docs/sdk)**.

---

## Networks

```typescript
import { NETWORKS } from "@pinecode/sdk";

NETWORKS.base;          // mainnet (chainId 8453)
NETWORKS["base-sepolia"]; // testnet (chainId 84532)
```

You can also point the client at a custom gateway:

```typescript
const pinecode = new Pinecode({
  network: { rpcUrl: "https://my-rpc", chainId: 8453 },
  gateway: "https://my-gateway.example",
});
```

---

## Errors

The SDK throws typed errors:

```typescript
import { isPinecodeError, PinecodeErrorCode } from "@pinecode/sdk";

try {
  await pinecode.recall({ query: "..." });
} catch (err) {
  if (isPinecodeError(err)) {
    switch (err.code) {
      case PinecodeErrorCode.PaymentExceedsCeiling: /* ... */ break;
      case PinecodeErrorCode.InsufficientBalance:    /* ... */ break;
      case PinecodeErrorCode.GatewayUnavailable:     /* ... */ break;
    }
  }
}
```

---

## Development

```bash
git clone https://github.com/Pinecode-sdk/pinecode.git
cd pinecode
npm install
npm run build
```

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run build`     | Compile TypeScript → `dist/`     |
| `npm run dev`       | Watch-mode compile               |
| `npm run typecheck` | Type-check without emitting      |
| `npm run clean`     | Remove `dist/`                   |

---

## Contributing

PRs welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first. Good first issues are labeled [`good first issue`](https://github.com/Pinecode-sdk/pinecode/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22).

Security disclosures: see [SECURITY.md](./SECURITY.md).

---

## License

[MIT](./LICENSE)
