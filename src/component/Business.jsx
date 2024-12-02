import { useState } from "react";
import styles, { layout } from "../style";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatUnits, parseEther, parseUnits } from "ethers";
import { toast } from "react-hot-toast";
import {LEASECONTRACTADDRESS , LEASEABI , collateralABI  } from "../abi/constant";

const Business = () => {
  // State for form inputs
  const [proposal, setProposal] = useState("lend");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [interest, setInterest] = useState("");
  const [collateral, setCollateral] = useState("");

  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = LEASECONTRACTADDRESS;

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!amount || amount <= 0) {
      alert("Please provide a valid lease  amount.");
      return;
    }
    const lendingAmount  = parseUnits(amount.toString() , 18)
    const proposalFeePercentage = 1n;
    const proposalFee = (lendingAmount * proposalFeePercentage) / 100n;
    const totalAmount = lendingAmount + proposalFee;
    try {
      await toast.promise(
        (async () => {
          // Prepare contract call
          console.log("Amount", amount);
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "createLendingProposal",
            args: [ parseUnits(amount.toString() , 18) , 0 , interest, collateral],
            value: totalAmount.toString(),
          });
        })(),
        {
          loading: `Approving token ...`, // Loading state message
          success: () => `Approval successful! Transaction Hash:`, // Success state message with the hash
          error: (error) => `Approval failed: ${error.message}`, // Error state message
        }
      );
    } catch (err) {
      toast.error(err.message);
    }

  };

  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <div className="mb-5">

        <h2 className={styles.heading2}>
          You do the business.
          <br className="sm:block hidden" /> we'll handle the money
        </h2>
        </div>
        <div className="flex flex-col gap-3 mb-4">
          <p>
            <span className="font-bold">Loan Amount:</span> The Borrower requests ${amount}, which will be provided upon agreement.
          </p>
          <p>
            <span className="font-bold">Interest Rate:</span> The loan will accrue interest at {interest}% annually, calculated on the principal amount.
          </p>
          <p>
            <span className="font-bold">Collateral:</span> The Borrower will pledge {collateral} as security for the loan. The Lender holds rights to the collateral in case of default.
          </p>
          <p>
            <span className="font-bold">Repayment Terms:</span> The loan will be repaid in [installments/lump sum] over [loan term]. Payments are due on agreed-upon dates.
          </p>
          <p>
            <span className="font-bold">Late Payment Penalties:</span> A fee of [amount/percentage] will apply for missed payments, with possible forfeiture of collateral in case of continued default.
          </p>
          <p>
            <span className="font-bold">Purpose of Loan:</span> The Borrower may use the loan for {description}.
          </p>
        </div>
      </div>

      <div className={`${layout.sectionImg} flex-col`}>
        <div className="w-[350px] bg-black bg-opacity-30 backdrop-blur relative pt-2">
          <div className="p-4 bg-opacity-50 rounded-md">
            {/* Form with onSubmit */}
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-3">
                {/*  */}
                <div className="flex flex-col space-y-1.5">
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="amount"
                    placeholder="Enter Amount in ETH"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                 
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="interest"
                    type="number"
                    placeholder="Interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                  />
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="collateral"
                    type="number"
                    placeholder="Collateral"
                    value={collateral}
                    onChange={(e) => setCollateral(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center flex-wrap mt-4">
                <button
                  type="submit"
                  className="bg-blue-gradient px-4 py-2 hover:bg-gradient-to-r hover:from-[rgb(99,232,255)] hover:to-[rgb(59,193,211)] font-poppins font-medium text-[18px] text-primary outline-none active:scale-90 rounded-[10px]"
                >
                  Generate Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;
