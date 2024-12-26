import GoogleProvider from "next-auth/providers/google";
import { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import db from "@repo/db/client";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: Profile;
    }) {
      if (!user?.email) {
        return false;
      }

      await db.merchant.upsert({
        select: {
          id: true,
        },
        where: {
          email: user.email,
        },
        create: {
          email: user.email,
          name: user.name || "",
          auth_type: account?.provider === "google" ? "Google" : "Github",
        },
        update: {
          name: user.name || "",
          auth_type: account?.provider === "google" ? "Google" : "Github",
        },
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};
