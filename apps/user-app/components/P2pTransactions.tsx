// "use client";
import { Card2 } from "@repo/ui/card2";
export const P2pTransactionCard = ({
  p2p,
}: {
  p2p?: {
    id: number;
    amount: number;
    timestamp: Date;
    fromUserId: number;
    toUserId: number;
  }[];
}) => {
  if (!p2p) {
    return (
      <Card2 title={"Recent p2p Transactions"}>
        <div className="text-center pb-8 pt-8">No Recent transaction</div>
      </Card2>
    );
  }
  return (
    <Card2 title="Recent p2p Transactions">
      <div className="pt-2">
        {p2p.map((t) => (
          <div className="flex justify-between pt-2 pb-2 border-b">
            <div>
              <div className="text-sm flex">
                <div> Received INR </div>
              </div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
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
