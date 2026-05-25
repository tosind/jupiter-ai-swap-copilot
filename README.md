# BountyOps Deliverables Workspace

## BAI-24 48-Hour AI Workflow Fix Sprint Fulfillment Kit

Reusable buyer delivery kit: [fulfillment-kit/README.md](./fulfillment-kit/README.md)

The kit packages the post-payment sprint workflow with 30-minute qualification intake, scope agreement, workflow map, QA checklist, buyer handoff template, and two safe filled examples for reporting automation and research/content delivery.

```bash
npm run fulfillment-kit:validate
```

## BAI-22 24-Hour Automation Sprint Demo Kit

Reusable kit: [demo-kit/README.md](./demo-kit/README.md)

The kit packages a safe 24-hour automation sprint workflow with intake, scope, build log, demo script, evidence log, submission template, readiness checklists, a filled example, and a validator.

```bash
npm run demo-kit:validate
```

## Jupiter AI Swap Copilot

Fixture-first bounty artifact for BAI-11. The app turns a plain-English Solana swap request into a traceable Jupiter-style route preview, explains token/price assumptions, and stops before wallet signing.

## Run

```bash
npm install
npm test
npm run submission:validate
npm run dev
```

Open the Vite URL and try:

- `swap 0.1 SOL to USDC`
- `convert 15 USDC to JUP`
- `trade 2 JitoSOL for SOL`
- `swap 100000 BONK to USDC`

## Scope

- Default mode uses local fixtures only, so it is reproducible without a Jupiter Developer Platform account.
- The model follows Jupiter Tokens V2, Price V3, and Swap V2 semantics, but no real order is created.
- Live read-only API calls should be added only after BAI-10 provides the approved Developer Platform account/API key.
- Swap execution is out of scope until CEO approval and an explicit wallet-signing test plan exist.

## Submission Assets

- Working project: this repository workspace
- Superteam draft submission pack: [submissions/jupiter-not-your-regular-bounty-submission-pack.md](./submissions/jupiter-not-your-regular-bounty-submission-pack.md)
- Scout acceptance checklist: [submissions/jupiter-scout-acceptance-checklist.md](./submissions/jupiter-scout-acceptance-checklist.md)
- Machine-readable manifest: [submissions/jupiter-not-your-regular-bounty-manifest.json](./submissions/jupiter-not-your-regular-bounty-manifest.json)
- Clean submission archive: [submissions/jupiter-submission-archive.md](./submissions/jupiter-submission-archive.md)
- Public demo deploy handoff: [submissions/jupiter-public-demo-deploy-handoff.md](./submissions/jupiter-public-demo-deploy-handoff.md)
- GitHub publication handoff: [submissions/jupiter-github-publication-handoff.md](./submissions/jupiter-github-publication-handoff.md)
- Colosseum profile handoff: [submissions/jupiter-colosseum-profile-handoff.md](./submissions/jupiter-colosseum-profile-handoff.md)
- CEO approval request: [submissions/jupiter-ceo-approval-request.md](./submissions/jupiter-ceo-approval-request.md)
- Approval decision log: [submissions/jupiter-approval-decision-log.md](./submissions/jupiter-approval-decision-log.md)
- Feedback report: [DX-REPORT.md](./DX-REPORT.md)
- Evidence: test output and local screenshots should be captured after dependency install
- Remaining account fields: Developer Platform email, Colosseum profile, and final Superteam contact approval from BAI-10
