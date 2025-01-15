export const getMidPrice = async (symbol: string): Promise<number> => {
  const response = await fetch(
    `https://api.kraken.com/0/public/Depth?pair=${symbol}`
  );

  const data = await response.json();

  // the asked ticker/pair is not necessarily in the respons.
  // example: if we ask BTCUSDT we receive result with XBTUSDT.
  const ticker = Object.keys(data.result)[0];

  const bestAsk = data["result"][ticker]["asks"][0][0];
  const bestBid = data["result"][ticker]["bids"][0][0];

  console.log(`Best ask: ${bestAsk}, Best bid: ${bestBid}`);
  const midPrice = (parseFloat(bestAsk) + parseFloat(bestBid)) / 2;

  return midPrice;
};
