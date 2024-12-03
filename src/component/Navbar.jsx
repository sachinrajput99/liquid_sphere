import React from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { Contract, formatUnits, parseEther, parseUnits } from "ethers";
import { toast } from "react-hot-toast";
import { LEASECONTRACTADDRESS, LEASEABI, collateralABI } from "../abi/constant";

const Navbar = ({ ConnectButton }) => {


  return (
    <>
      <div className="text-white">
        <nav className="mt-6 flex justify-end items-center navbar ">
          <div className="flex ">
            <div
              className={`font-poppins font-normal cursor-pointer text-[16px]`}
            >
              <div className="flex flex-row justify-center items-center gap-4">
                {" "}
                {ConnectButton}
                {/* <p className="text-white text-xl font-semibold ">balance</p> */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
