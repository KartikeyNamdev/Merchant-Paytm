import { OnrampCard } from "../../../components/onRampCard";
import { getOnRampTrans } from "../transfer/page";

export default async function () {
  const transactions = await getOnRampTrans();
  return (
    <div className="w-full pr-4">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="w-full">
        {" "}
        <OnrampCard transactions={transactions} />{" "}
      </div>
    </div>
  );
}
