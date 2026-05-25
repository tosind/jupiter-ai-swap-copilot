import { ROUTE_FIXTURES, TOKENS } from "./fixtures.js";

const TOKEN_SYNONYMS = new Map([
  ["solana", "SOL"],
  ["sol", "SOL"],
  ["usdc", "USDC"],
  ["usd coin", "USDC"],
  ["jupiter", "JUP"],
  ["jup", "JUP"],
  ["jitosol", "JitoSOL"],
  ["jito sol", "JitoSOL"],
  ["bonk", "BONK"],
  ["usdt", "USDT"]
]);

export function parseSwapIntent(input) {
  const normalized = input.trim().replace(/\s+/g, " ");
  const amountMatch = normalized.match(/(?:swap|trade|convert)?\s*([0-9]+(?:\.[0-9]+)?)/i);
  const pairMatch = normalized.match(/(?:swap|trade|convert)?\s*[0-9]+(?:\.[0-9]+)?\s+(.+?)\s+(?:to|for|into)\s+(.+?)(?:$| with | at | using )/i);

  if (!amountMatch || !pairMatch) {
    return {
      ok: false,
      error: "Try: swap 0.1 SOL to USDC"
    };
  }

  return {
    ok: true,
    amount: Number(amountMatch[1]),
    inputSymbol: normalizeSymbol(pairMatch[1]),
    outputSymbol: normalizeSymbol(pairMatch[2])
  };
}

export function normalizeSymbol(value) {
  const cleaned = value.trim().toLowerCase();
  return TOKEN_SYNONYMS.get(cleaned) || value.trim().replace(/\s+/g, "");
}

export function resolveToken(query, tokens = TOKENS) {
  const needle = query.toLowerCase();
  const exact = tokens.find((token) => token.symbol.toLowerCase() === needle || token.mint.toLowerCase() === needle);
  if (exact) return { token: exact, alternatives: [] };

  const matches = tokens.filter((token) => {
    return token.symbol.toLowerCase().includes(needle) || token.name.toLowerCase().includes(needle);
  });

  return { token: matches[0] || null, alternatives: matches.slice(1, 4) };
}

export function buildMockRoute(intent, inputToken, outputToken) {
  const inputUsd = intent.amount * inputToken.usdPrice;
  const platformFeeBps = 5;
  const slippageBps = 50;
  const routeDragBps = 7;
  const estimatedOutput = (inputUsd / outputToken.usdPrice) * (1 - (platformFeeBps + routeDragBps) / 10000);

  return {
    mode: "fixture",
    inputMint: inputToken.mint,
    outputMint: outputToken.mint,
    inAmount: intent.amount,
    outAmount: estimatedOutput,
    inputUsd,
    outputUsd: estimatedOutput * outputToken.usdPrice,
    slippageBps,
    platformFeeBps,
    routeDragBps,
    segments: ROUTE_FIXTURES,
    trace: [
      "parse_intent",
      "resolve_input_token",
      "resolve_output_token",
      "price_reference",
      "order_preview",
      "human_signing_required"
    ]
  };
}

export function formatNumber(value, maximumFractionDigits = 6) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: value < 1 && value > 0 ? 6 : 0
  }).format(value);
}

export async function fetchTokenSearch(query, apiKey) {
  const response = await fetch(`https://api.jup.ag/tokens/v2/search?query=${encodeURIComponent(query)}`, {
    headers: apiKey ? { "x-api-key": apiKey } : {}
  });
  if (!response.ok) throw new Error(`Tokens API failed with ${response.status}`);
  return response.json();
}

export async function fetchPrice(ids, apiKey) {
  const response = await fetch(`https://api.jup.ag/price/v3?ids=${encodeURIComponent(ids.join(","))}`, {
    headers: apiKey ? { "x-api-key": apiKey } : {}
  });
  if (!response.ok) throw new Error(`Price API failed with ${response.status}`);
  return response.json();
}
