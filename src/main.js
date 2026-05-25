import "./styles.css";
import { TOKENS } from "./fixtures.js";
import { buildMockRoute, formatNumber, parseSwapIntent, resolveToken } from "./jupiter.js";

const state = {
  intent: "swap 0.1 SOL to USDC",
  lastResult: null
};

const app = document.querySelector("#app");

function runPreview() {
  const parsed = parseSwapIntent(state.intent);
  if (!parsed.ok) {
    state.lastResult = { error: parsed.error };
    render();
    return;
  }

  const input = resolveToken(parsed.inputSymbol);
  const output = resolveToken(parsed.outputSymbol);
  if (!input.token || !output.token) {
    state.lastResult = { error: "Could not resolve one or more token symbols from the local fixture set." };
    render();
    return;
  }

  state.lastResult = {
    intent: parsed,
    input,
    output,
    route: buildMockRoute(parsed, input.token, output.token)
  };
  render();
}

function renderToken(token, label) {
  return `
    <section class="token-panel">
      <div class="panel-kicker">${label}</div>
      <div class="token-heading">
        <div class="token-logo">${token.logo}</div>
        <div>
          <h2>${token.symbol}</h2>
          <p>${token.name}</p>
        </div>
      </div>
      <dl class="metrics">
        <div><dt>Price</dt><dd>$${formatNumber(token.usdPrice, 8)}</dd></div>
        <div><dt>Organic</dt><dd>${token.organicScore}/100</dd></div>
        <div><dt>Volume</dt><dd>$${formatNumber(token.dailyVolume, 0)}</dd></div>
        <div><dt>Holders</dt><dd>${formatNumber(token.holders, 0)}</dd></div>
      </dl>
      <div class="tag-row">${token.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </section>
  `;
}

function renderRoute(result) {
  const route = result.route;
  const outputSymbol = result.output.token.symbol;
  return `
    <section class="route-panel">
      <div class="route-header">
        <div>
          <div class="panel-kicker">Guarded Order Preview</div>
          <h2>${formatNumber(route.outAmount)} ${outputSymbol}</h2>
          <p>$${formatNumber(route.outputUsd, 2)} estimated output from $${formatNumber(route.inputUsd, 2)} input value.</p>
        </div>
        <div class="status-pill">Signing blocked</div>
      </div>
      <div class="route-bars">
        ${route.segments.map((segment) => `
          <div class="route-segment">
            <div style="width:${segment.percent}%"></div>
            <span>${segment.market} ${segment.percent}%</span>
          </div>
        `).join("")}
      </div>
      <dl class="explain-grid">
        <div><dt>Slippage cap</dt><dd>${route.slippageBps / 100}%</dd></div>
        <div><dt>Platform fee</dt><dd>${route.platformFeeBps} bps</dd></div>
        <div><dt>Route drag</dt><dd>${route.routeDragBps} bps</dd></div>
        <div><dt>Execution</dt><dd>User signature required</dd></div>
      </dl>
      <details>
        <summary>JSON trace</summary>
        <pre>${JSON.stringify(route, null, 2)}</pre>
      </details>
    </section>
  `;
}

function render() {
  const result = state.lastResult;
  app.innerHTML = `
    <main>
      <header class="topbar">
        <div>
          <div class="brand-mark">J</div>
          <span>AI Swap Copilot</span>
        </div>
        <a href="./DX-REPORT.md">DX report</a>
      </header>

      <section class="workspace">
        <div class="command-panel">
          <div class="panel-kicker">Jupiter Developer Platform Artifact</div>
          <h1>Plain-English swap preview with traceable safety gates.</h1>
          <p class="lede">Fixture-first demo using Jupiter Tokens, Price, and Swap API semantics. It resolves a swap intent, explains token quality and price assumptions, and stops before signing.</p>
          <form id="intent-form">
            <label for="intent">Swap intent</label>
            <div class="intent-row">
              <input id="intent" value="${state.intent}" autocomplete="off" />
              <button type="submit">Preview</button>
            </div>
          </form>
          <div class="samples">
            ${["swap 0.1 SOL to USDC", "convert 15 USDC to JUP", "trade 2 JitoSOL for SOL", "swap 100000 BONK to USDC"].map((sample) => `
              <button type="button" data-sample="${sample}">${sample}</button>
            `).join("")}
          </div>
        </div>

        <aside class="safety-panel">
          <div class="panel-kicker">Execution Boundary</div>
          <h2>No wallet action in this build</h2>
          <ul>
            <li>Token and price paths are reproducible from local fixtures.</li>
            <li>Live read-only API mode is documented, pending BAI-10 account access.</li>
            <li>Swap execution remains blocked until CEO approval and user signing.</li>
          </ul>
        </aside>
      </section>

      ${result?.error ? `<section class="error-panel">${result.error}</section>` : ""}
      ${result && !result.error ? `
        <section class="result-grid">
          ${renderToken(result.input.token, "Input Token")}
          ${renderToken(result.output.token, "Output Token")}
          ${renderRoute(result)}
        </section>
      ` : ""}

      <section class="token-table">
        <div class="panel-kicker">Fixture Coverage</div>
        <table>
          <thead><tr><th>Token</th><th>Mint</th><th>Tags</th><th>Organic</th></tr></thead>
          <tbody>
            ${TOKENS.map((token) => `
              <tr><td>${token.symbol}</td><td>${token.mint}</td><td>${token.tags.join(", ")}</td><td>${token.organicScore}</td></tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    </main>
  `;

  document.querySelector("#intent-form").addEventListener("submit", (event) => {
    event.preventDefault();
    state.intent = document.querySelector("#intent").value;
    runPreview();
  });

  document.querySelectorAll("[data-sample]").forEach((button) => {
    button.addEventListener("click", () => {
      state.intent = button.dataset.sample;
      runPreview();
    });
  });
}

runPreview();
