import React, { useState, useEffect } from "react";
import { card1 } from "../assets";
import styles, { layout } from "../style";

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { formatUnits, parseEther, parseUnits } from "ethers";
import { toast } from "react-hot-toast";
import { LEASECONTRACTADDRESS, LEASEABI, collateralABI } from "../abi/constant";

const CardDeal = () => {
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const CONTRACT_ADDRESS = LEASECONTRACTADDRESS;

  // All list of proposals
  const {
    data: ListofallProsposals,
    isError: isErroroccur,
    isLoading: contractLoadings,
  } = useReadContract({
    address: LEASECONTRACTADDRESS,
    abi: LEASEABI,
    functionName: "getAllProposalDetails",
    args: [],
  });

  // State to track active and accepted proposals
  const [activeProposals, setActiveProposals] = useState([]);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  console.log(">>>", ListofallProsposals);
  // Effect to filter proposals
  useEffect(() => {
    if (ListofallProsposals) {
      // Filter active proposals (isActive = true)
      const activePropList = ListofallProsposals.filter(
        (proposal) => proposal.isActive
      );
      setActiveProposals(activePropList);

      // Filter accepted proposals for the current user
      const userAcceptedProposals = ListofallProsposals.filter(
        (proposal) =>
          proposal.acceptedBorrower.toLowerCase() === address?.toLowerCase() &&
          !proposal.isActive
      );
      setAcceptedProposals(userAcceptedProposals);
    }
  }, [ListofallProsposals, address]);

  const Acceptproposal = async (proposalid, collateraltoken) => {
    try {
      await toast.promise(
        (async () => {
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "acceptProposal",
            args: [proposalid, parseUnits(collateraltoken.toString(), 18)],
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

  const RepayLoan = async (proposalid) => {
    try {
      const amount = prompt("Please enter the repayment Amount in the ETH");
      const amountinwei = parseUnits(amount.toString(), 18);

      await toast.promise(
        (async () => {
          const { hash } = await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: LEASEABI,
            functionName: "repayLoan",
            args: [proposalid],
            value: amountinwei
          });
        })(),
        {
          loading: `Repaying loan...`,
          success: () => `Loan repayment successful!`,
          error: (error) => `Repayment failed: ${error.message}`,
        }
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Find a better deal <br className="sm:block hidden" /> in a few easy
          steps.
        </h2>

        {/* Proposal Section */}
        {/* changes to madde */}
        <div className="mt-8  w-[90%]">
          <hr className="font-bold mb-6" />
          <div className="flex justify-center items-center">
            <div className="bg-black bg-opacity-30 w-full max-w-[1000px] p-6 rounded-lg shadow-lg">
              <div className="flex justify-between">
                {/* Left Section - Active Proposals */}
                <div className="w-[80%] text-center font-semibold">
                  <p className="mb-4 text-white">List of Active Proposals</p>
                  {contractLoadings ? (
                    <p className="text-white">Loading proposals...</p>
                  ) : activeProposals.length > 0 ? (
                    activeProposals.map((proposal) => (
                      <div
                        key={proposal.proposalId}
                        className="mb-4 bg-gray-800 p-4 rounded-lg"
                      >
                        <p className="mb-3 text-white">
                          Proposal #{proposal.proposalId}
                          <br />
                          Interest Rate: {proposal.interestRate.toString()}%
                          <br />
                          Lease Amount:{" "}
                          {formatUnits(proposal.lendingAmount, 18)} XFI
                          <br />
                          Collateral Amount:{" "}
                          {formatUnits(
                            proposal.requiredCollateralAmount,
                            18
                          )}{" "}
                          Tokens
                        </p>
                        <button
                          onClick={() =>
                            Acceptproposal(
                              proposal.proposalId,
                              proposal.requiredCollateralAmount
                            )
                          }
                          className="bg-blue-gradient px-4 py-2 hover:bg-gradient-to-r hover:from-[#63e8ff] hover:to-[#3bc1d3] font-poppins font-medium text-[18px] text-primary outline-none active:scale-90 rounded-[10px]"
                        >
                          Accept Proposal
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No active proposals available</p>
                  )}
                </div>

                {/* Divider */}
                <div className="px-4 text-white">|</div>

                {/* Right Section - Accepted Lease Repay */}
                <div className="w-[45%] text-center font-semibold">
                  <p className="mb-4 text-white">Accepted Lease to Repay</p>
                  {contractLoadings ? (
                    <p className="text-white">Loading accepted loans...</p>
                  ) : acceptedProposals.length > 0 ? (
                    acceptedProposals.map((proposal) => (
                      <div
                        key={proposal.proposalId}
                        className="mb-4 bg-gray-800 p-4 rounded-lg"
                      >
                        <p className="mb-3 text-white">
                          Proposal #{proposal.proposalId}
                          <br />
                          Interest Rate: {proposal.interestRate}%
                          <br />
                          Lending Amount:{" "}
                          {formatUnits(proposal.lendingAmount, 18)} XFI
                        </p>
                        <button
                          onClick={() => RepayLoan(proposal.proposalId)}
                          className="bg-blue-gradient px-4 py-2 hover:bg-gradient-to-r hover:from-[#63e8ff] hover:to-[#3bc1d3] font-poppins font-medium text-[18px] text-primary outline-none active:scale-90 rounded-[10px]"
                        >
                          Repay Loan
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-white">No accepted loans to repay</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className={layout.sectionImg}>
        <img
          src={card1}
          alt="card"
          className="w-full h-[73%] hidden sm:block"
        />
      </div>
    </section>
  );
};

export default CardDeal;
