import React, { useState } from "react";
import styles from "../style";
import { arrowUp } from "../assets";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatUnits, parseEther, parseUnits } from "ethers";
import { toast } from "react-hot-toast";
import { LEASECONTRACTADDRESS, LEASEABI, collateralABI } from "../abi/constant";

const GetStarted = () => {
  const [amount, setAmount] = useState(null);
  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = LEASECONTRACTADDRESS;

  const [value, setValue] = useState(null);
  console.log(value);

  const buyToken = async () => {
    try {
      // take the Input from the User as in ETH :->

      await toast.promise(
        (async () => {
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "buyCollateralTokens",
            args: [],
            value: amount,
          });
        })(),
        {
          loading: `Approving token ...`,
          success: () => `Approval successful!`,
          error: (error) => `Approval failed: ${error.message}`,
        }
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  

  return (
    <div className="bgred w-[300px] ml-36 ">
      <div>
        <form action="" onSubmit={buyToken} className="flex flex-col gap-5">
          <input
            className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-gradient px-4 py-2 hover:bg-gradient-to-r hover:from-[rgb(99,232,255)] hover:to-[rgb(59,193,211)] font-poppins font-medium text-[18px] text-primary outline-none active:scale-90 rounded-[10px]"
          >
            Buy Collateral Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
