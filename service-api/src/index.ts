import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

interface MessageRequestParams {
  pair: string;
}

app.get(
  "/getAveragePairPrice/:pair",
  async (req: Request<MessageRequestParams, {}, {}>, res: Response) => {
    const HARDCODED_PRICE = 1.42;

    const { pair } = req.params;
    console.log(`Received request for: ${pair}`);
    if (pair === "BTCUSD") {
      res.send({
        status: "success",
        data: {
          price: HARDCODED_PRICE,
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
