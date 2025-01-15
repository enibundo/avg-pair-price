import WebSocket from "ws";

export const getMidPrice = async (
  symbol: string,
  onNewMidPrice: (newMidPrice: number) => Promise<void>
) => {
  const ws = new WebSocket(
    `wss://fstream.binance.com/ws/${symbol.toLowerCase()}@depth`
  );

  ws.on("open", () => {
    console.log("Connected to server");
  });

  ws.on("message", (message: string) => {
    const data = JSON.parse(message);

    const bids = data.b;
    const asks = data.a;

    const bestAsk = asks[0][0];
    const bestBid = bids[bids.length - 1][0];

    console.log(`Best ask: ${bestAsk}, Best bid: ${bestBid}`);
    const midPrice = (parseFloat(bestAsk) + parseFloat(bestBid)) / 2;

    onNewMidPrice(midPrice);
  });

  ws.on("close", () => {
    console.log("Disconnected from server");
  });
};
