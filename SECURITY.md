# Security Policy

## Reporting a Vulnerability

The Pinecode team takes the security of the protocol seriously. We appreciate responsible disclosure.

### Where to report

- **Email**: security@pinecode.io (PGP key below)
- **In-app**: [Immunefi bug bounty program](https://immunefi.com/bounty/pinecode)

**Do not open a public GitHub issue for security vulnerabilities.**

### What to include

- A description of the vulnerability and its impact
- Steps to reproduce, including any proof-of-concept code
- The commit hash, contract address, or affected component
- Your name/handle for credit (optional, anonymous reports accepted)

### What to expect

| Stage             | SLA                |
| ----------------- | ------------------ |
| Initial response  | within 24 hours    |
| Triage decision   | within 72 hours    |
| Fix in progress   | depends on severity |
| Public disclosure | coordinated, after patch is deployed |

## Bug bounty

| Severity     | Reward (USDC) | Examples                                                |
| ------------ | ------------- | ------------------------------------------------------- |
| Critical     | up to 250,000 | Loss of user funds, total protocol takeover             |
| High         | up to 50,000  | Permanent denial of service, large-scale slashing abuse |
| Medium       | up to 10,000  | Temporary DoS, griefing, partial fund freezing          |
| Low          | up to 2,000   | Informational disclosure, low-impact economic bugs      |

Rewards are paid in USDC on Base within 14 days of vulnerability confirmation.

### Scope

In scope:

- All contracts deployed under `pinecode.base.eth`
- The recall API at `api.pinecode.io`
- The official SDK packages on npm
- The MCP server at `mcp.pinecode.io`
- The website at `pinecode.io` (security-impacting only)

Out of scope:

- Social engineering of Pinecode team members
- Physical attacks on infrastructure
- Vulnerabilities in third-party dependencies that are already publicly known
- Self-XSS, missing security headers without demonstrated impact

## PGP key

```
-----BEGIN PGP PUBLIC KEY BLOCK-----

mDMEZjK5hxYJKwYBBAHaRw8BAQdAo3vQ4xS9hCQzZK8m4n3F5x0pZ8z2K3W1eX0H
...
=Pinecode
-----END PGP PUBLIC KEY BLOCK-----
```

(Full key available at https://pinecode.io/.well-known/pgp.asc)

## Hall of fame

Researchers who have responsibly disclosed vulnerabilities are credited on our [security acknowledgements page](https://pinecode.io/security/acknowledgements) (with their permission).
