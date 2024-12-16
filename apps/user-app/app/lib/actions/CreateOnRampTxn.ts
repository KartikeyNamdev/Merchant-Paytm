"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function CreateOnRampTxn(amount: number, provider: string) {
  const session = await getServerSession(authOptions);
  const token = Math.random().toString();
  const userId = session.user.id;
  if (!userId) {
    return {
      message: "User not logged in",
    };
  }
  try {
    await prisma.onRampTransaction.create({
      data: {
        status: "pending",
        amount: amount,
        provider: provider,
        startTime: new Date(),
        userId: Number(userId),
        token: token,
      },
    });
    return {
      message: "On ramp transaction Added",
    };
  } catch (e) {
    return {
      message: e,
    };
  }
}
