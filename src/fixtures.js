export const TOKENS = [
  {
    symbol: "SOL",
    name: "Wrapped SOL",
    mint: "So11111111111111111111111111111111111111112",
    logo: "◎",
    tags: ["verified", "blue-chip"],
    organicScore: 99,
    dailyVolume: 924000000,
    holders: 1820000,
    usdPrice: 145.47
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logo: "$",
    tags: ["verified", "stablecoin"],
    organicScore: 98,
    dailyVolume: 612000000,
    holders: 2480000,
    usdPrice: 1
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    logo: "J",
    tags: ["verified", "governance"],
    organicScore: 94,
    dailyVolume: 81000000,
    holders: 742000,
    usdPrice: 0.72
  },
  {
    symbol: "JitoSOL",
    name: "Jito Staked SOL",
    mint: "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn",
    logo: "JS",
    tags: ["verified", "lst"],
    organicScore: 91,
    dailyVolume: 39000000,
    holders: 184000,
    usdPrice: 169.22
  },
  {
    symbol: "BONK",
    name: "Bonk",
    mint: "DezXAZ8z7PnrnRJjz3ByzNu9jrBqJ9zjt2f4F9pPZn",
    logo: "B",
    tags: ["verified", "meme"],
    organicScore: 86,
    dailyVolume: 72000000,
    holders: 913000,
    usdPrice: 0.000019
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY7zJF5vZP4uN4k",
    logo: "T",
    tags: ["verified", "stablecoin"],
    organicScore: 93,
    dailyVolume: 94000000,
    holders: 551000,
    usdPrice: 1
  }
];

export const ROUTE_FIXTURES = [
  { market: "JupiterZ RFQ", percent: 62, expectedBps: 4, landing: "managed" },
  { market: "Metis route", percent: 31, expectedBps: 8, landing: "managed" },
  { market: "Dflow fallback", percent: 7, expectedBps: 11, landing: "managed" }
];
