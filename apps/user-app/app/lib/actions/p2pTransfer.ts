import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";

export async function p2pTransfer(amount: number to: string) {
  const session = await getServerSession(authOptions);
  console.log("Working");
  const from = await session?.user?.id;
  if (!from) {
    return {
      msg: "User not logged in !",
    };
  }
  const user = await prisma.user.findFirst({ where: { number: to } });
  if (!user) {
    return {
      msg: "User not found !",
    };
  }

  await prisma.$transaction(async (txn: any) => {
    if (from.balance.amount > Number(amount)) {
      await txn.balance.update({
        where: {
          userId: Number(to),
        },
        data: {
          amount: { increment: Number(amount) },
        },
      });
      // find user by number

      await txn.balance.update({
        where: {
          userId: Number(from),
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
