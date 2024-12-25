import { useRecoilValue } from "recoil";
import { balanceAtom } from "../atoms/balance";

export default function useBalance() {
  const value = useRecoilValue(balanceAtom);
  return value;
}
