import assert from "node:assert/strict";
import test from "node:test";
import { buildMockRoute, parseSwapIntent, resolveToken } from "../src/jupiter.js";

test("parses a plain-English swap intent", () => {
  assert.deepEqual(parseSwapIntent("swap 0.1 SOL to USDC"), {
    ok: true,
    amount: 0.1,
    inputSymbol: "SOL",
    outputSymbol: "USDC"
  });
});

test("normalizes common token names", () => {
  const parsed = parseSwapIntent("convert 1 solana into usd coin");
  assert.equal(parsed.inputSymbol, "SOL");
  assert.equal(parsed.outputSymbol, "USDC");
});

test("fails closed on ambiguous malformed input", () => {
  assert.equal(parseSwapIntent("make me rich").ok, false);
});

test("resolves fixture tokens by symbol and name", () => {
  assert.equal(resolveToken("JUP").token.name, "Jupiter");
  assert.equal(resolveToken("usd coin").token.symbol, "USDC");
});

test("builds a guarded route preview without execution fields", () => {
  const intent = parseSwapIntent("swap 2 SOL to USDC");
  const input = resolveToken(intent.inputSymbol).token;
  const output = resolveToken(intent.outputSymbol).token;
  const route = buildMockRoute(intent, input, output);

  assert.equal(route.mode, "fixture");
  assert.equal(route.inputMint, input.mint);
  assert.equal(route.outputMint, output.mint);
  assert.equal(route.trace.at(-1), "human_signing_required");
  assert.ok(route.outAmount > 0);
});
