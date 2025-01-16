export const getMidPrice = async (symbol: string): Promise<number> => {
  const response = await fetch(
    `https://api.huobi.pro/market/depth?symbol=${symbol.toLowerCase()}&depth=5&type=step0`
  );

  const data = await response.json();
  const asks = data.tick.asks;
  const bids = data.tick.bids;

  const bestAsk = asks[asks.length - 1][0];
  const bestBid = bids[bids.length - 1][0];

  console.log(`Best ask: ${bestAsk}, Best bid: ${bestBid}`);
  const midPrice = (parseFloat(bestAsk) + parseFloat(bestBid)) / 2;

  return midPrice;
};
