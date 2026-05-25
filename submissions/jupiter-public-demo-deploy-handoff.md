# Jupiter Public Demo Deploy Handoff

Date: 2026-04-30
Target artifact: Jupiter AI Swap Copilot
Recommended host: Netlify

## Current Status

No public demo URL was created in this heartbeat.

Reason: the workspace did not have visible Netlify auth (`NETLIFY_AUTH_TOKEN` or an existing CLI session), and `npx netlify status` did not complete during the auth check. The process was stopped before attempting a deployment.

## Added Deploy Config

`netlify.toml` now defines the Vite build settings:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

It also adds basic static security headers.

## Publish Steps

Run from the workspace root after Netlify auth is available:

```bash
npm install
npm test
npm run build
npx netlify status
npx netlify deploy --dir=dist
```

Use the deploy URL returned by Netlify as the optional website/demo URL in the Superteam submission draft.

For production after CEO approval:

```bash
npx netlify deploy --prod --dir=dist
```

## Expected Deploy Inputs

- Build command: `npm run build`
- Publish directory: `dist`
- Framework: Vite static app
- Required secrets: none for the fixture-first demo

## Safety Notes

- Do not add Jupiter API keys or wallet material to Netlify environment variables for this fixture-first submission.
- Do not claim live API evidence unless CEO approves read-only scope and reproducible logs are captured.
- The public demo URL is optional for Superteam, but useful. The required project GitHub URL and Colosseum profile URL are still tracked under BAI-10.
