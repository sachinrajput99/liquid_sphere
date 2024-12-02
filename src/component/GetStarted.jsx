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
  const [amount  , setAmount] = useState(null)
  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = LEASECONTRACTADDRESS;

  const buyToken = async (proposalid, collateraltoken) => {
    try {
    // take the Input from the User as in ETH :->



      await toast.promise(
        (async () => {
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "buyCollateralTokens",
            args: [],
            value : amount
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
    <div
      className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient cursor-pointer p-[2px]  active:scale-90`}
    >
      <div
        className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
      >
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23px] mr-2 ">
            <span className="text-gradient">Buy </span>
          </p>
          <img
            src={arrowUp}
            alt="arrow"
            className="w-[23px] h-[23px] object-contain"
          />
        </div>
        <p className="font-poppins font-medium text-[18px] leading-[23px] ">
          <span className="text-gradient">Collateral Token </span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
