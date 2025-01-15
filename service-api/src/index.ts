import express, { Request, Response } from "express";
import { handleAveragePairPriceRequest } from "./handleAveragePairPriceRequest";

require("dotenv").config();

const enabledPairs = process.env.ENABLED_PAIRS?.split(",") ?? [];

const app = express();
app.use(express.json());
app.get(
  "/getAveragePairPrice/:pair",
  async (req: Request<{ pair: string }, {}, {}>, res: Response) => {
    const { pair } = req.params;

    console.log(`Received request for: ${pair}`);

    if (enabledPairs.includes(pair)) {
      const averagePrice = await handleAveragePairPriceRequest(pair);

      res.send({
        status: "success",
        data: {
          price: averagePrice,
        },
      });
    } else {
      res.send({
        status: "error",
        error: {
          message: `Invalid pair ${pair}`,
        },
      });
    }
  }
);

const PORT = 3000;
app.listen(PORT, () => console.log(`Service One listening on port ${PORT}`));
