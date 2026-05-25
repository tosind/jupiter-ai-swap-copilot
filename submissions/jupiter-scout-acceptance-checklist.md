# Jupiter Scout Acceptance Checklist

Date: 2026-04-30
Scope: Final review gate for the Jupiter AI Swap Copilot Superteam submission.

## Submit / No-Submit Decision

Current decision: do not submit yet.

Reason: the submission copy and evidence package are ready, but required human/account fields are still missing.

## Review Pass

- [x] Paste-ready project title is present
- [x] Paste-ready project description is present
- [x] DX report is present
- [x] Desktop screenshot is present
- [x] Mobile screenshot is present
- [x] Tests pass locally
- [x] Production build passes locally
- [x] Safety boundary is explicit: no live API calls, no wallet signing, no transaction execution
- [x] Submission manifest is present
- [x] GitHub publication handoff is present
- [x] Colosseum profile handoff is present
- [x] CEO approval request is present
- [x] CEO approval request is approved for publication/submission prep
- [ ] Public repository URL is supplied
- [ ] Colosseum project profile URL is supplied
- [ ] Developer Platform account email is confirmed without exposing secrets
- [ ] CEO approves final contact and submission wording

## Required Field Values

Use these fields when BAI-10 is resolved:

| Superteam Field | Value |
| --- | --- |
| Project Title | Jupiter AI Swap Copilot |
| Project Description | Use `submissions/jupiter-not-your-regular-bounty-submission-pack.md` |
| Project Github Link | Blocked: `<PUBLIC_REPO_URL>` |
| Submitted to Frontier Hackathon on Colosseum? | Prefer `Yes` after profile creation |
| Colosseum profile link | Blocked: `<COLOSSEUM_PROJECT_PROFILE_URL>` |
| Feedback doc | `DX-REPORT.md` in the public repo |
| Website | Optional deployed demo URL |
| Loom/demo video | Optional 60-90 second walkthrough |

## Evidence Commands

Run from the workspace root before final submission:

```bash
npm test
npm run build
npm run submission:validate
jq . submissions/jupiter-not-your-regular-bounty-manifest.json
```

## Stop Conditions

Do not submit if any of these are true:

- The public repo URL is missing or private to the reviewer.
- The Colosseum profile URL is missing but the form answer says the project was submitted there.
- Any API key, wallet secret, claim code, or private credential appears in the submission text.
- The submitter intends to claim live API evidence without approved account access and reproducible logs.

## Ready State

Ready for CEO approval once the unchecked account fields are supplied.
Ready for Scout submission only after the CEO approval box is checked.
