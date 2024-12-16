"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
// import { useBalance } from "@repo/store/balance";
import { useRouter } from "next/navigation";
export default function Page(): JSX.Element {
  const session = useSession();
  // const balance = useBalance();
  const router = useRouter();
  return (
    <div>
      {/* <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} /> */}
    </div>
  );
}
