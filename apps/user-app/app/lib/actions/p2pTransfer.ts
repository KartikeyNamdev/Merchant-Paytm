"use server";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function p2pTransfer(amount: string, to: string) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.id) {
    return {
      msg: "User not logged in !",
    };
  }

  const from = Number(session.user.id);
  const transferAmount = Number(amount);

  if (isNaN(transferAmount) || transferAmount <= 0) {
    return {
      msg: "Invalid amount !",
    };
  }

  try {
    const result = await prisma.$transaction(async (txn: any) => {
      // 1. Lock sender's balance row with SELECT FOR UPDATE
      const senderBalances: any[] = await txn.$queryRaw`
        SELECT * FROM "Balance" WHERE "userId" = ${from} FOR UPDATE
      `;
      const senderBalance = senderBalances[0];

      if (!senderBalance || senderBalance.amount < transferAmount) {
        throw new Error("Insufficient Balance !");
      }

      // 2. Find and verify destination user
      const toUser = await txn.user.findFirst({
        where: {
          number: to,
        },
      });

      if (!toUser) {
        throw new Error("Recipient user not found !");
      }

      if (toUser.id === from) {
        throw new Error("Cannot send money to yourself !");
      }

      // Ensure recipient balance row exists
      await txn.balance.upsert({
        where: { userId: toUser.id },
        update: {},
        create: {
          userId: toUser.id,
          amount: 0,
          locked: 0
        }
      });

      // 3. Increment receiver's balance
      await txn.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: { increment: transferAmount },
        },
      });

      // 4. Decrement sender's balance
      await txn.balance.update({
        where: {
          userId: from,
        },
        data: {
          amount: { decrement: transferAmount },
        },
      });

      // 5. Log transaction
      await txn.p2pTransfer.create({
        data: {
          fromUserId: from,
          toUserId: toUser.id,
          amount: transferAmount,
          timestamp: new Date(),
        },
      });

      return {
        message: "Money Sent",
      };
    });

    return result;
  } catch (e: any) {
    console.error("p2pTransfer Error:", e.message || e);
    return {
      msg: e.message || "Transaction failed",
    };
  }
}
