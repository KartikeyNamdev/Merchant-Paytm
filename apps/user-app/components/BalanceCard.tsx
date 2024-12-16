import { Card2 } from "@repo/ui/card2";
export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card2 title="Wallet Balance">
      <div className="flex p-3 justify-between border-gray-300 border-b pb-2">
        <div className="">Unlocked Balance</div>
        <div className=""> {amount} INR </div>
      </div>
      <div className="flex justify-between border-gray-300 border-b pb-2 p-3">
        <div>Total Locked Balance</div>
        <div> {locked} INR </div>
      </div>
      <div className="flex justify-between border-gray-300 border-b pb-2 p-3">
        <div>Total Balance</div>
        <div> {amount + locked} INR </div>
      </div>
    </Card2>
  );
};
