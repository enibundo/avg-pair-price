import Redis from "ioredis";
import { getMidPrice } from "./binanceApi";

require("dotenv").config();

const exchangeName = process.env.EXCHANGE_NAME;
const enabledPairs = process.env.ENABLED_PAIRS?.split(",") ?? [];

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

for (const pair of enabledPairs) {
  getMidPrice(pair, async (newMidPrice: number) => {
    await redis.set(`${exchangeName}/${pair}`, newMidPrice);
    console.log(`Updated price for ${exchangeName}/${pair} to ${newMidPrice}`);
  });
}
