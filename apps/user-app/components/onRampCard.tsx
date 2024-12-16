// "use client";
import { Card2 } from "@repo/ui/card2";
export const OnrampCard = ({
  transactions,
}: {
  transactions?: {
    startTime: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions) {
    return (
      <Card2 title={"Recent Transactions"}>
        <div className="text-center pb-8 pt-8">No Recent transaction</div>
      </Card2>
    );
  }
  return (
    <Card2 title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t) => (
          <div className="flex justify-between pt-2 pb-2 border-b">
            <div>
              <div className="text-sm flex">
                <div> Received INR </div>
                <div className="text-slate-500 pl-6"> {t.status}</div>
              </div>
              <div className="text-slate-600 text-xs">
                {t.startTime.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card2>
  );
};
