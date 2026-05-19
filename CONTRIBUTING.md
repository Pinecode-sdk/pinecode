# Contributing to @pinecode/sdk

Thanks for your interest. This repo hosts the official TypeScript SDK for the Pinecode protocol.

## Ways to contribute

- **Bug fixes** — runtime issues, type bugs, edge cases
- **Features** — new helpers, additional network support, ergonomics
- **Docs** — improve clarity, add examples, fix typos
- **Examples** — sample integrations with popular agent frameworks
- **Triage** — reproduce issues, suggest fixes, label

## Workflow

1. **Open an issue first** for anything non-trivial. Describe the problem and the proposed solution.
2. **Fork** the repository and create a topic branch from `main`:
   ```bash
   git checkout -b feat/my-change
   ```
3. **Write the change** with tests where applicable and a clear commit message.
4. **Verify locally** before pushing:
   ```bash
   npm run typecheck
   npm run build
   ```
5. **Open a pull request** against `main`. Fill out the PR template. Link the related issue.
6. A maintainer will review within 72 hours.

## Commit style

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `perf:` — performance improvement
- `test:` — test changes
- `chore:` — tooling, build, dependency bumps

Examples:

```
feat(sdk): add streaming recall via Server-Sent Events
fix(types): correct optional fields on RecallHit
docs: clarify x402 payment header format
```

## Coding standards

- **TypeScript strict mode** — no `any` without justification
- **Public types are stable** — breaking changes go in a major version
- **Zero runtime dependencies** — keep the install footprint tiny
- **No browser-incompatible Node APIs** in the main entry point

## Security

If you find a security vulnerability, **do not open a public issue**. Follow the responsible disclosure process in [SECURITY.md](./SECURITY.md).

## Code of Conduct

By participating, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).
