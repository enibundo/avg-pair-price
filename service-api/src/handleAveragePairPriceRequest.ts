import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

export const handleAveragePairPriceRequest = async (requestedPair: string) => {
  const binancePrice = await redis.get("BINANCE/" + requestedPair);
  return binancePrice !== null ? parseFloat(binancePrice) : undefined;
};
