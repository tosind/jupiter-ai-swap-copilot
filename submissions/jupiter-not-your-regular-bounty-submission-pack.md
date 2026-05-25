# Jupiter Not Your Regular Bounty - Submission Pack

Date: 2026-04-30
Prepared for: BountyOps AI / BAI-41
Listing: https://superteam.fun/earn/listing/not-your-regular-bounty
Status: Draft-ready; blocked only on human account fields

## Listing Snapshot

- Sponsor: Jupiter
- Platform: Superteam Earn / Frontier Hackathon track
- Listing status: Open on public listing check, 2026-04-30
- Prize pool: 3,000 jupUSD
- Winner announcement: 2026-05-26
- Skills shown: Content, Backend, Frontend, Mobile
- Current public submissions count observed: 103

## Paste-Ready Submission Fields

### Project Title

Jupiter AI Swap Copilot

### Project Description

Jupiter AI Swap Copilot is a fixture-first web demo that shows how an AI agent can convert a plain-English swap request into a transparent Jupiter-style route preview while stopping before wallet signing.

The app parses intents such as "swap 0.1 SOL to USDC", resolves token metadata from local fixtures modeled after Jupiter Tokens V2, estimates input and output value using Price V3-style assumptions, and displays a guarded route preview with slippage, route segments, fee assumptions, and a JSON trace. The final trace step is `human_signing_required`, so the artifact demonstrates the agent workflow without creating, signing, or submitting a transaction.

The submission includes a DX report focused on Jupiter's AI developer experience: docs discoverability, `llms.txt`, token resolution, price reliability, swap preview ergonomics, and the signing boundary an agent should preserve before execution.

### Project GitHub Link

Published repository:

```text
https://github.com/tosind/jupiter-ai-swap-copilot
```

### Submitted to Frontier Hackathon on Colosseum?

Blocked: answer depends on CEO/owner account action.

Suggested value after Colosseum profile is created:

```text
Yes
```

Use `No` only if the Superteam submission is intentionally sent before the official Colosseum project profile exists.

### Colosseum Project Profile Link

Blocked by BAI-10.

```text
<COLOSSEUM_PROJECT_PROFILE_URL>
```

### Optional Feedback Doc

Use the public repo link to:

```text
DX-REPORT.md
```

### Optional Website

Use a deployed Vite demo URL if available. If no public deploy exists, leave blank rather than submitting a local-only URL.

```text
<PUBLIC_DEMO_URL>
```

### Optional Loom / Demo Video

Optional. A 60-90 second video should show:

1. Running `npm test`
2. Opening the app
3. Previewing `swap 0.1 SOL to USDC`
4. Opening the JSON trace and pointing to `human_signing_required`

```text
<LOOM_OR_VIDEO_URL>
```

## Artifact Map

- App entry: `index.html`
- App source: `src/main.js`, `src/jupiter.js`, `src/fixtures.js`, `src/styles.css`
- Tests: `test/jupiter.test.js`
- DX report: `DX-REPORT.md`
- Existing screenshots: `artifacts/jupiter-copilot-desktop.png`, `artifacts/jupiter-copilot-mobile.png`
- Build output: `dist/`
- Opportunity scan context: `opportunity-scans/2026-04-30-bai-37.md`

## Evidence Checklist

- `npm test` passes
- `npm run build` passes
- Desktop screenshot exists
- Mobile screenshot exists
- DX report exists
- Safety boundary is documented in both app copy and report
- Public repo URL is provided: https://github.com/tosind/jupiter-ai-swap-copilot
- Colosseum project profile URL is provided
- CEO approves final submission/contact details

## Submission Risks

- The app is fixture-first, not live API-backed. This is intentional for safety and reproducibility, but the submission should explain that live read-only API mode is pending approved Developer Platform account access.
- Public GitHub URL is now available. Final submission still needs the owner-controlled Colosseum/profile/account fields below.
- No Colosseum profile link is present. The Superteam listing asks whether the project was also submitted to the official Frontier Hackathon, so the owner should create or confirm that profile before final submission.
- Do not add private API keys, wallet addresses, seed phrases, or contact claim codes to this file.

## Final Submit Gate

Ready for Scout submission after these BAI-10 fields are supplied:

- Public GitHub/project URL: https://github.com/tosind/jupiter-ai-swap-copilot
- Colosseum project profile URL
- Developer Platform account email confirmation, without secrets
- Optional public demo/video URL
- CEO approval for final contact and submission wording
