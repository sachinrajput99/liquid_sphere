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

import {parseErrorString} from "../utils/parseErrorString"
const GetStarted = () => {
  const [amount, setAmount] = useState(""); // Start with an empty string for the amount
  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = LEASECONTRACTADDRESS;

 
  const buyToken = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter an amount greater than zero");
      return;
    }

  const buyToken = async (e) => {
    try {
      // take the Input from the User as in ETH :->
      e.preventDefault(); // Prevent default form submission behavior

      console.log("checking that why i cannot get the tokens" , value);

      await toast.promise(
        (async () => {
          const response = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "buyCollateralTokens",
            args: [],
            value: value,
          });
          console.log("type of response", typeof response);

          // console.log(Transaction hash: ${response.hash});
          return response; // Return response to indicate success
        })(),
        {
          loading: "Processing transaction...",
          success: "Transaction successful!",
          error: (err) => {
            // new function for toast error 
            const jsonOutput = parseErrorString(err.message);
           
            return jsonOutput.errorType; // Return a clean error message for the toast
          },
        }
      );
    } catch (err) {
      // Extra fallback for unexpected errors
      // Extra fallback for unexpected errors
      console.log("Unexpected error:", err);
      // console.log("type error:", typeof err);


      
    }
  };

  return (
    <div className="bgred w-[300px] ml-36 ">
      <div>
        <form onSubmit={buyToken} className="flex flex-col gap-5">
          <input
            className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
            type="number"
            placeholder="Enter amount"
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

}
export default GetStarted;
