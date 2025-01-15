import Redis from "ioredis";
import { getMidPrice } from "./krakenApi";
require("dotenv").config();

const exchangeName = process.env.EXCHANGE_NAME;

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

const updatePrice = async () => {
  const pair = "BTCUSDT";
  const newPrice = await getMidPrice(pair);
  await redis.set(`${exchangeName}/${pair}`, newPrice);
  await redis.expire(`${exchangeName}/${pair}`, 2); // TTL 2 seconds

  console.log(`Updated price for ${exchangeName}/${pair} to ${newPrice}`);
};

// update price every 1 seconds
setInterval(updatePrice, 2000);
