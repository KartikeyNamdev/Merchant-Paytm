"use server";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function p2pTransfer(amount: string, to: string) {
  const session = await getServerSession(authOptions);
  const from = Number(session.user.id);

  if (!from) {
    return {
      msg: "User not logged in !",
    };
  }

  const fromUserBalance = await prisma.balance.findFirst({
    where: { userId: from },
  });

  const toUser = await prisma.user.findFirst({
    where: {
      number: to,
    },
  });

  await prisma.$transaction(async (txn: any) => {
    await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
    //@ts-ignore
    if (fromUserBalance.amount > Number(amount)) {
      await txn.balance.update({
        where: {
          userId: Number(toUser?.id),
        },
        data: {
          amount: { increment: Number(amount) },
        },
      });
      // find user by number

      await txn.balance.update({
        where: {
          userId: from,
        },
        data: {
          amount: { decrement: Number(amount) },
        },
      });
      return {
        message: "Money Sent",
      };
    } else {
      return {
        msg: "Insufficient Balance !",
      };
    }
  });
}
