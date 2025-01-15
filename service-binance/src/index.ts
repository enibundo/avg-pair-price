import Redis from "ioredis";
import { getMidPrice } from "./binanceApi";
require("dotenv").config();

const exchangeName = process.env.EXCHANGE_NAME;

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

getMidPrice("BTCUSDT", async (newMidPrice: number) => {
  console.log(`Updating price for ${exchangeName}/BTCUSDT to ${newMidPrice}`);
  await redis.set(`${exchangeName}/BTCUSDT`, newMidPrice);
});
