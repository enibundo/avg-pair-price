import Redis from "ioredis";
require("dotenv").config();

const exchangeName = process.env.EXCHANGE_NAME;

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

const updatePrice = async () => {
  const newPrice = Math.random() * 1000;
  console.log(`Updating price for ${exchangeName}/BTCUSDT to ${newPrice}`);
  await redis.set(`${exchangeName}/BTCUSDT`, Math.random() * 1000);
};

// update price every 0.1 seconds
setInterval(updatePrice, 100);
