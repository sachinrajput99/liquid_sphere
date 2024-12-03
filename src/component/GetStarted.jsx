import React, { useState } from "react";
import styles from "../style";
import { arrowUp } from "../assets";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { Contract, formatUnits, parseEther, parseUnits } from "ethers";
import { toast } from "react-hot-toast";
import { LEASECONTRACTADDRESS, LEASEABI, collateralABI } from "../abi/constant";

import {parseErrorString} from "../utils/parseErrorString"
const GetStarted = () => {
  const [amount, setAmount] = useState(""); // Start with an empty string for the amount
  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = LEASECONTRACTADDRESS;

 
  const { data: collateralTokenAddress } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: LEASEABI,
    functionName: "collateralToken"
  });

 

  const buyAndApproveTokens = async (e) => {
    try {
      e.preventDefault();
      if (!amount || parseFloat(amount) <= 0) {
        toast.error("Please enter an amount greater than zero");
        return;
      }

      await toast.promise(
        (async () => {
          // Buy Collateral Tokens
          const buyResponse = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "buyCollateralTokens",
            value: parseEther(amount)
          });

        

          // Calculate tokens to approve (you might need to adjust this calculation)
          const tokensToApprove = parseEther(amount.toString()) ; // Example multiplier

          // Approve tokens
          const approveResponse = await writeContractAsync({
            address: collateralTokenAddress,
            abi: collateralABI,
            functionName: "approve",
            args: [CONTRACT_ADDRESS, tokensToApprove]
          });

          return { buyResponse, approveResponse };
        })(),
        {
          loading: "Processing transaction...",
          success: "Tokens bought and approved successfully!",
          error: (err) => {
            const jsonOutput = parseErrorString(err.message);
            return jsonOutput.errorType;
          },
        }
      );
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="bgred w-[300px] ml-36 ">
      <div>
        <form onSubmit={buyAndApproveTokens} className="flex flex-col gap-5">
          <input
            className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
            type="number"
            placeholder="Enter amount in ETH"
            value={amount}
            onChange={(e) => setAmount(e.target.value)} // Update amount state directly
            min="0.01" // Ensure the value is greater than 0.01 ETH (or your desired minimum)
            step="any" // Allow for decimals
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
