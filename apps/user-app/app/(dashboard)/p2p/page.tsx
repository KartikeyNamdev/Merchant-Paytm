import { SendMoneyCard } from "../../../components/SendMoneyCard";

export default function Home() {
  return (
    <div className="w-screen ">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Wallet transfer
      </div>
      <div className="pt-5 flex justify-center">
        <SendMoneyCard />
      </div>
    </div>
  );
}
