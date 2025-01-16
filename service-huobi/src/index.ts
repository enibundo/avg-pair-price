import Redis from "ioredis";
import { getMidPrice } from "./huobiApi";

require("dotenv").config();

const exchangeName = process.env.EXCHANGE_NAME;

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

const updatePrice = async () => {
  const pair = "BTCUSDT";

  const newPrice = await getMidPrice(pair);

  await redis.set(`${exchangeName}/${pair}`, newPrice);

  // TTL 2 seconds, we don't want to keep stale data
  await redis.expire(`${exchangeName}/${pair}`, 2);

  console.log(`Updated price for ${exchangeName}/${pair} to ${newPrice}`);
};

// update price every 100 milli-seconds
setInterval(updatePrice, 100);
