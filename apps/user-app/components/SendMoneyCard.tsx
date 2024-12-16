"use client";
import { Button } from "@repo/ui/button";
import { Card2 } from "@repo/ui/card2";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendMoneyCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh] w-96 ">
      <>
        <Card2 title="Send">
          <div className="">
            <TextInput
              placeholder="User"
              label="Phone number"
              onchange={(e) => {
                setNumber(e);
              }}
            ></TextInput>
            <TextInput
              placeholder="200"
              label="Amount"
              onchange={(e) => {
                setAmount(e);
              }}
            ></TextInput>
            <div className="flex justify-center p-5">
              <Button
                onClick={async () => {
                  await p2pTransfer(Number(amount) * 100), number;
                }}
              >
                Send Money
              </Button>
            </div>
          </div>
        </Card2>
      </>
    </div>
  );
}
