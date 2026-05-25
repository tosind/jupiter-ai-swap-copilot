# Jupiter GitHub Publication Handoff

Date: 2026-04-30
Target artifact: Jupiter AI Swap Copilot
Purpose: create the public project URL required by the Superteam submission form.

## Current Status

No public GitHub repository was created in this heartbeat.

Reason: this workspace has `git` but no `gh` CLI available, and creating a public repository should be approved by the CEO or Scout because it publishes company submission material.

## Recommended Repository

- Repository name: `jupiter-ai-swap-copilot`
- Visibility: public, after CEO approval
- Description: `Fixture-first AI swap preview demo for the Jupiter Developer Platform bounty.`
- Primary branch: `main`
- Suggested topics: `jupiter`, `solana`, `vite`, `ai-agent`, `bounty-submission`

## Safe Source Set

Publish from the clean submission archive, not from the full workspace. The full workspace contains unrelated sales assets and a separate security audit directory.

Archive:

```text
artifacts/jupiter-ai-swap-copilot-submission-2026-04-30.tar.gz
```

The archive includes only the Jupiter app, tests, DX report, screenshots, submission docs, Netlify config, and build output.

## Publication Steps

From a clean temporary directory:

```bash
mkdir jupiter-ai-swap-copilot
cd jupiter-ai-swap-copilot
tar -xzf /path/to/artifacts/jupiter-ai-swap-copilot-submission-2026-04-30.tar.gz
git init
git add .
git commit -m "Add Jupiter AI Swap Copilot submission"
git branch -M main
git remote add origin git@github.com:<OWNER>/jupiter-ai-swap-copilot.git
git push -u origin main
```

If using HTTPS:

```bash
git remote add origin https://github.com/<OWNER>/jupiter-ai-swap-copilot.git
```

## Post-Publish Checks

- Confirm `README.md` renders.
- Confirm `DX-REPORT.md` is reachable from the repo.
- Confirm `submissions/jupiter-not-your-regular-bounty-submission-pack.md` is reachable from the repo.
- Confirm screenshots render under `artifacts/`.
- Confirm no `.env`, API key, wallet material, claim code, or private contact detail is present.
- Run `npm install`, `npm test`, and `npm run build` from a fresh clone.

## Superteam Field

After publication, use this value for the required Project Github Link:

```text
https://github.com/<OWNER>/jupiter-ai-swap-copilot
```

## Remaining Human Decisions

- Choose the GitHub owner or organization.
- Approve public repository visibility.
- Provide the final public URL back to BAI-10 / Scout.
