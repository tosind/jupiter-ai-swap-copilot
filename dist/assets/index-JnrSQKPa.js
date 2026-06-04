(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=o(i);fetch(i.href,r)}})();const f=[{symbol:"SOL",name:"Wrapped SOL",mint:"So11111111111111111111111111111111111111112",logo:"◎",tags:["verified","blue-chip"],organicScore:99,dailyVolume:924e6,holders:182e4,usdPrice:145.47},{symbol:"USDC",name:"USD Coin",mint:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",logo:"$",tags:["verified","stablecoin"],organicScore:98,dailyVolume:612e6,holders:248e4,usdPrice:1},{symbol:"JUP",name:"Jupiter",mint:"JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",logo:"J",tags:["verified","governance"],organicScore:94,dailyVolume:81e6,holders:742e3,usdPrice:.72},{symbol:"JitoSOL",name:"Jito Staked SOL",mint:"J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",logo:"JS",tags:["verified","lst"],organicScore:91,dailyVolume:39e6,holders:184e3,usdPrice:169.22},{symbol:"BONK",name:"Bonk",mint:"DezXAZ8z7PnrnRJjz3ByzNu9jrBqJ9zjt2f4F9pPZn",logo:"B",tags:["verified","meme"],organicScore:86,dailyVolume:72e6,holders:913e3,usdPrice:19e-6},{symbol:"USDT",name:"Tether USD",mint:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY7zJF5vZP4uN4k",logo:"T",tags:["verified","stablecoin"],organicScore:93,dailyVolume:94e6,holders:551e3,usdPrice:1}],g=[{market:"JupiterZ RFQ",percent:62,expectedBps:4,landing:"managed"},{market:"Metis route",percent:31,expectedBps:8,landing:"managed"},{market:"Dflow fallback",percent:7,expectedBps:11,landing:"managed"}],S=new Map([["solana","SOL"],["sol","SOL"],["usdc","USDC"],["usd coin","USDC"],["jupiter","JUP"],["jup","JUP"],["jitosol","JitoSOL"],["jito sol","JitoSOL"],["bonk","BONK"],["usdt","USDT"]]);function y(t){const e=t.trim().replace(/\s+/g," "),o=e.match(/(?:swap|trade|convert)?\s*([0-9]+(?:\.[0-9]+)?)/i),n=e.match(/(?:swap|trade|convert)?\s*[0-9]+(?:\.[0-9]+)?\s+(.+?)\s+(?:to|for|into)\s+(.+?)(?:$| with | at | using )/i);return!o||!n?{ok:!1,error:"Try: swap 0.1 SOL to USDC"}:{ok:!0,amount:Number(o[1]),inputSymbol:p(n[1]),outputSymbol:p(n[2])}}function p(t){const e=t.trim().toLowerCase();return S.get(e)||t.trim().replace(/\s+/g,"")}function m(t,e=f){const o=t.toLowerCase(),n=e.find(r=>r.symbol.toLowerCase()===o||r.mint.toLowerCase()===o);if(n)return{token:n,alternatives:[]};const i=e.filter(r=>r.symbol.toLowerCase().includes(o)||r.name.toLowerCase().includes(o));return{token:i[0]||null,alternatives:i.slice(1,4)}}function b(t,e,o){const n=t.amount*e.usdPrice,i=5,r=50,a=7,u=n/o.usdPrice*(1-(i+a)/1e4);return{mode:"fixture",inputMint:e.mint,outputMint:o.mint,inAmount:t.amount,outAmount:u,inputUsd:n,outputUsd:u*o.usdPrice,slippageBps:r,platformFeeBps:i,routeDragBps:a,segments:g,trace:["parse_intent","resolve_input_token","resolve_output_token","price_reference","order_preview","human_signing_required"]}}function d(t,e=6){return new Intl.NumberFormat("en-US",{maximumFractionDigits:e,minimumFractionDigits:t<1&&t>0?6:0}).format(t)}const s={intent:"swap 0.1 SOL to USDC",lastResult:null},h=document.querySelector("#app");function c(){const t=y(s.intent);if(!t.ok){s.lastResult={error:t.error},l();return}const e=m(t.inputSymbol),o=m(t.outputSymbol);if(!e.token||!o.token){s.lastResult={error:"Could not resolve one or more token symbols from the local fixture set."},l();return}s.lastResult={intent:t,input:e,output:o,route:b(t,e.token,o.token)},l()}function v(t,e){return`
    <section class="token-panel">
      <div class="panel-kicker">${e}</div>
      <div class="token-heading">
        <div class="token-logo">${t.logo}</div>
        <div>
          <h2>${t.symbol}</h2>
          <p>${t.name}</p>
        </div>
      </div>
      <dl class="metrics">
        <div><dt>Price</dt><dd>$${d(t.usdPrice,8)}</dd></div>
        <div><dt>Organic</dt><dd>${t.organicScore}/100</dd></div>
        <div><dt>Volume</dt><dd>$${d(t.dailyVolume,0)}</dd></div>
        <div><dt>Holders</dt><dd>${d(t.holders,0)}</dd></div>
      </dl>
      <div class="tag-row">${t.tags.map(o=>`<span>${o}</span>`).join("")}</div>
    </section>
  `}function $(t){const e=t.route,o=t.output.token.symbol;return`
    <section class="route-panel">
      <div class="route-header">
        <div>
          <div class="panel-kicker">Guarded Order Preview</div>
          <h2>${d(e.outAmount)} ${o}</h2>
          <p>$${d(e.outputUsd,2)} estimated output from $${d(e.inputUsd,2)} input value.</p>
        </div>
        <div class="status-pill">Signing blocked</div>
      </div>
      <div class="route-bars">
        ${e.segments.map(n=>`
          <div class="route-segment">
            <div style="width:${n.percent}%"></div>
            <span>${n.market} ${n.percent}%</span>
          </div>
        `).join("")}
      </div>
      <dl class="explain-grid">
        <div><dt>Slippage cap</dt><dd>${e.slippageBps/100}%</dd></div>
        <div><dt>Platform fee</dt><dd>${e.platformFeeBps} bps</dd></div>
        <div><dt>Route drag</dt><dd>${e.routeDragBps} bps</dd></div>
        <div><dt>Execution</dt><dd>User signature required</dd></div>
      </dl>
      <details>
        <summary>JSON trace</summary>
        <pre>${JSON.stringify(e,null,2)}</pre>
      </details>
    </section>
  `}function l(){const t=s.lastResult;h.innerHTML=`
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
              <input id="intent" value="${s.intent}" autocomplete="off" />
              <button type="submit">Preview</button>
            </div>
          </form>
          <div class="samples">
            ${["swap 0.1 SOL to USDC","convert 15 USDC to JUP","trade 2 JitoSOL for SOL","swap 100000 BONK to USDC"].map(e=>`
              <button type="button" data-sample="${e}">${e}</button>
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

      ${t?.error?`<section class="error-panel">${t.error}</section>`:""}
      ${t&&!t.error?`
        <section class="result-grid">
          ${v(t.input.token,"Input Token")}
          ${v(t.output.token,"Output Token")}
          ${$(t)}
        </section>
      `:""}

      <section class="token-table">
        <div class="panel-kicker">Fixture Coverage</div>
        <table>
          <thead><tr><th>Token</th><th>Mint</th><th>Tags</th><th>Organic</th></tr></thead>
          <tbody>
            ${f.map(e=>`
              <tr><td>${e.symbol}</td><td>${e.mint}</td><td>${e.tags.join(", ")}</td><td>${e.organicScore}</td></tr>
            `).join("")}
          </tbody>
        </table>
      </section>
    </main>
  `,document.querySelector("#intent-form").addEventListener("submit",e=>{e.preventDefault(),s.intent=document.querySelector("#intent").value,c()}),document.querySelectorAll("[data-sample]").forEach(e=>{e.addEventListener("click",()=>{s.intent=e.dataset.sample,c()})})}c();
