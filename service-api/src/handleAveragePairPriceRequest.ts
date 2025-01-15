import Redis from "ioredis";
require("dotenv").config();

const enabledExchanges = process.env.ENABLED_EXCHANGES?.split(",") ?? [];
console.log("enabledExchanges", enabledExchanges);

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
});

export const handleAveragePairPriceRequest = async (requestedPair: string) => {
  const allPrices = await Promise.all(
    enabledExchanges.map(async (exchangeName) => {
      const keyName = `${exchangeName}/${requestedPair}`;
      console.log("going to fetch keyName", keyName);
      const res = await redis.get(keyName);
      console.log("res", res);
      return res;
    })
  );

  const nonNullPrices = allPrices.filter((price) => price !== null);
  const sumOfPrices = nonNullPrices.reduce(
    (acc, price) => acc + parseFloat(price!),
    0
  );

  const averagePrice = sumOfPrices / nonNullPrices.length;

  console.log(
    `Average price for ${requestedPair} is ${averagePrice} (${sumOfPrices} / ${nonNullPrices.length} sources)`
  );

  return averagePrice;
};
