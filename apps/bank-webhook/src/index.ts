import express from "express";
import db from "@repo/db/client";
const app = express();
app.use(express.json());

app.post("/hdfc", async (req, res) => {
  try {
    console.log(req.body);
    const payment: {
      token: string;
      userId: string;
      amount: string;
    } = {
      token: req.body.token,
      userId: req.body.userId,
      amount: req.body.amount,
    };
    await db.balance.update({
      where: { userId: Number(payment.userId) },
      data: {
        amount: {
          increment: Number(payment.amount),
        },
      },
    });
    await db.onRampTransaction.update({
      where: {
        token: payment.token,
      },
      data: {
        status: "success",
      },
    });

    res.status(200).json({
      msg: "Captured",
    });
  } catch (e) {
    res.json({
      msg: e,
    });
  }
});
app.get("/", (req, res) => {
  res.send("Get end point of webhook");
});
app.listen(3003);
