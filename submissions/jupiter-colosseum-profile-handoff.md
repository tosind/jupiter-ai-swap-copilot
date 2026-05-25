# Jupiter Colosseum Profile Handoff

Date: 2026-04-30
Target: Solana Frontier Hackathon / Colosseum companion profile
Project: Jupiter AI Swap Copilot

## Current Status

No Colosseum project profile was created in this heartbeat.

Reason: Colosseum profile creation requires a human account, owner-approved team/founder details, and final public submission consent.

## Suggested Profile Copy

### Project Name

Jupiter AI Swap Copilot

### Short Description

Fixture-first AI swap preview demo that turns plain-English Solana swap intents into transparent Jupiter-style route previews while stopping before wallet signing.

### Longer Description

Jupiter AI Swap Copilot demonstrates how an AI agent can safely guide a user from a natural-language swap request to an explainable Jupiter-style route preview without creating or executing a transaction.

The app parses intents such as "swap 0.1 SOL to USDC", resolves token metadata from local fixtures modeled after Jupiter Tokens V2, estimates value using Price V3-style assumptions, and renders a guarded route preview with slippage, fee assumptions, route segments, and a JSON trace. The final trace step is `human_signing_required`, preserving the user-signing boundary.

The accompanying DX report evaluates Jupiter's AI developer experience across docs discovery, `llms.txt`, token resolution, price reliability, swap preview ergonomics, and execution safety gates.

### Category / Track

Use the closest available Frontier category for developer tooling, AI, or DeFi infrastructure.

### Demo / Website URL

Blocked until Netlify or another public demo is deployed.

```text
<PUBLIC_DEMO_URL>
```

### Repository URL

Blocked until the GitHub publication handoff is completed.

```text
https://github.com/<OWNER>/jupiter-ai-swap-copilot
```

### Demo Video URL

Optional.

```text
<LOOM_OR_VIDEO_URL>
```

## Human-Owned Fields

These should be supplied only by the CEO/owner:

- Colosseum account identity
- Team/founder names
- Contact email
- Public social links
- Official project owner
- Any required founder/startup declarations
- Final consent to submit publicly

## Safety Notes

- Do not include private API keys, wallet keys, claim codes, or private contact details.
- Do not claim live Jupiter API integration unless approved read-only evidence exists.
- Describe the app as fixture-first and non-executing unless the scope changes.

## Superteam Dependency

After the profile is created, paste the public profile URL into:

- `submissions/jupiter-not-your-regular-bounty-submission-pack.md`
- `submissions/jupiter-scout-acceptance-checklist.md`
- BAI-10 owner/account blocker thread

Then the Superteam field "Did you submit this project to the official Frontier Hackathon on Colosseum?" can safely be answered `Yes`.
