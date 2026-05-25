# DX Report: Jupiter AI Swap Copilot

Date: 2026-04-29  
Artifact: Jupiter AI Swap Copilot  
Mode tested: fixture-first local build, live API access pending BAI-10

## Summary

Jupiter is a strong fit for AI-assisted development because its current docs emphasize REST APIs, clean JSON, no mandatory RPC node, and AI-specific discovery surfaces such as `llms.txt`, Skills, Docs MCP, and CLI. This artifact tests that claim through a practical workflow: an agent receives a plain-English swap request, resolves token metadata, derives price expectations, previews route behavior, and stops before transaction signing.

## APIs Evaluated

- Tokens V2: token search, mint resolution, verification tags, organic score, holder and trading metadata.
- Price V3: single-source USD pricing with explicit null/unavailable behavior for unreliable tokens.
- Swap V2: `/swap/v2/order` route-preview concept and `/swap/v2/execute` as the intentionally blocked signing/execution boundary.

Sources checked:

- https://developers.jup.ag/docs/get-started
- https://developers.jup.ag/docs/ai
- https://developers.jup.ag/docs/tokens/token-information
- https://developers.jup.ag/docs/price
- https://developers.jup.ag/docs/swap
- https://developers.jup.ag/blog/building-ai-friendly-docs

## What Worked Well

- The AI entry page is unusually direct: it tells agents which discovery and execution surfaces to use for local versus hosted contexts.
- `llms.txt` and raw markdown export reduce stale-context risk and make it easier for agents to cite current endpoint families.
- Tokens V2 gives enough metadata to build safer token disambiguation instead of relying on symbol-only matching.
- Price V3 documents why some assets return no reliable price, which is useful for fail-closed agent behavior.
- Swap V2 cleanly separates order construction from execution, which maps well to a human-signature safety gate.

## Friction Observed

- Some docs still mix keyless/read-only expectations with API-key-required examples; a single endpoint capability matrix would help agents choose safe prototype paths faster.
- Swap terminology across Ultra, Swap V2 Meta-Aggregator, and Router can be confusing for an agent building a minimal demo.
- More sample responses for Tokens V2 and Price V3 would improve fixture generation and test coverage.
- The docs explain agent tooling, but a complete "intent to signed transaction" reference app would reduce ambiguity around where human approval belongs.

## Safety Boundary

This build does not call live Jupiter endpoints by default and does not produce, sign, submit, or execute a transaction. The route preview is fixture-backed and marks `human_signing_required` as the final trace step.

Before enabling live mode:

- BAI-10 must provide the approved Developer Platform account email and API key.
- CEO must approve read-only API testing scope.
- Any execution test must use a local/test wallet with bounded funds and a written rollback/no-destruction plan.

## Reproduction

```bash
npm install
npm test
npm run dev
```

Expected behavior:

- `swap 0.1 SOL to USDC` resolves SOL and USDC fixture metadata.
- The app displays input/output USD references, organic score, route segments, slippage cap, fee assumptions, and JSON trace.
- The preview stops at the signing boundary.

## Recommended Jupiter Improvements

1. Add a one-page API capability matrix with endpoint, auth requirement, rate limit, read/write risk, and signing requirement.
2. Publish a minimal agent-safe swap preview reference that stops before signing.
3. Add canonical mock responses for Tokens V2, Price V3, and Swap V2 so bounty builders can produce reproducible tests without live credentials.
4. Include explicit examples of how agents should handle null Price V3 responses and ambiguous token search results.

## Submission Readiness

The local artifact is ready for initial CEO QA as a fixture-first demo. It is not ready for Superteam submission until BAI-10 supplies:

- Developer Platform account email
- Colosseum profile link
- Contact/submission approval
- Decision on whether live read-only API evidence is required
