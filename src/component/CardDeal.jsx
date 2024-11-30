import React from "react";
import { card } from "../assets";
import styles, { layout } from "../style";

const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
          Find a better deal <br className="sm:block hidden" />
          in a few easy steps.
        </h2>

        {/* Proposal Section */}
        <div className="mt-8">
          <hr className="font-bold mb-6" />
          <div className="flex justify-center items-center">
            <div className="bg-black bg-opacity-30 w-full max-w-[700px] p-6 rounded-lg shadow-lg">
              <div className="flex justify-between">
                {/* Left Section */}
                <div className="w-[45%] text-center font-semibold">
                  <p className="mb-4">List of Proposals</p>
                  <div className="mb-10">
                    <p className="mb-3">Accept this Proposal of 5% interest lease amount = 20000 XFI</p>
                    <button className="bg-blue-gradient px-4 py-2 hover:bg-gradient-to-r hover:from-[#63e8ff] hover:to-[#3bc1d3] font-poppins font-medium text-[18px] text-primary outline-none active:scale-90 rounded-[10px]">
                      Accept
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="px-4 text-white">|</div>

                {/* Right Section */}
                <div className="w-[45%] text-center font-semibold">
                  <p className="mb-4">List of Proposals</p>
                  <div className="mb-10">
                    <p className="mb-3">Accept this Proposal of 5% interest lease amount = 20000 XFI</p>
                    <button className="bg-blue-gradient px-4 py-2 hover:bg-gradient-to-r hover:from-[#63e8ff] hover:to-[#3bc1d3] font-poppins font-medium text-[18px] text-primary outline-none active:scale-90 rounded-[10px]">
                      Accept
                    </button>
                  </div>

                  <div className="flex flex-col space-y-4">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className={layout.sectionImg}>
        <img src={card} alt="card" className="w-full h-full" />
      </div>
    </section>
  );
};

export default CardDeal;
