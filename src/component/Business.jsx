// import { features } from "../constants";
import styles, { layout } from "../style";
// import Button from "./button";

// const FeedbackCard = ({ icon, title, content, index }) => (
//   <div
//     className={`flex flex-row p-6 rounded-[20px] ${
//       index !== features.length - 1
//     }?"mb-6": "mb-0" feature-card`}
//   >
//     <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter}`}>
//       <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
//     </div>
//     <div className="flex-1 flex flex-col ml-3">
//       <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
//         {title}
//       </h4>
//       <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
//         {content}
//       </p>
//     </div>
//   </div>
// );

const Business = () => {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2} >
          {" "}
          You do the business.
          <br className="sm:block hidden" /> we'll handle the money
        </h2>
        <div className=" flex flex-col  gap-3 mb-4">
          <p>
            <span className="font font-bold"> Loan Amount:</span> The Borrower
            requests $[amount], which will be provided upon agreement.
          </p>
          <p>
            <span className="font font-bold"> Interest Rate:</span> The loan
            will accrue interest at [percentage]% annually, calculated on the
            principal amount.
          </p>
          <p>
            <span className="font font-bold"> Collateral:</span> The Borrower
            will pledge [describe collateral] as security for the loan. The
            Lender holds rights to the collateral in case of default.
          </p>
          <p>
            <span className="font font-bold"> Repayment Terms:</span> The loan
            will be repaid in [installments/lump sum] over [loan term]. Payments
            are due on agreed-upon dates.
          </p>
          <p>
            <span className="font font-bold"> Late Payment Penalties: </span>A
            fee of [amount/percentage] will apply for missed payments, with
            possible forfeiture of collateral in case of continued default.
          </p>
          <p>
            <span className="font font-bold">Purpose of Loan: </span> The
            Borrower may use the loan for [specific purpose].
          </p>
        </div>

        {/* <Button  styles="mt-5" /> */}
      </div>
      <div className={` ${layout.sectionImg}  flex-col`}>
        {/* {features.map((feature, index) => (
          <FeedbackCard key={feature.id} {...feature} index={index} />
        ))} */}

        <div className="w-[350px] bg-black bg-opacity-30 backdrop-blur relative pt-2">
          <div className="p-4 bg-opacity-50 rounded-md">
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="flex flex-row justify-around items-center gap-4">
                  <label htmlFor="Proposal" className="font-semibold mt-2 text-white text-xl">
                    Proposal 
                  </label>
                  <select
                    id="framework"
                    className="p-2  w-full rounded-md bg-gray-800 text-white"
                  >
                    <option value="lend">Lend</option>
                    <option value="borrow">Borrow</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="amount"
                    placeholder="Enter Amount"
                    type="number"
                  />
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="Description"
                    placeholder="Description"
                  />
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="Interest"
                    type="number"
                    placeholder="Interest"
                  />
                  <input
                    className="text-white bg-[rgba(65,199,217,0.58)] bg-opacity-60 backdrop-blur text-lg font-semibold p-2 rounded-md"
                    id="Collateral"
                    type="number"
                    placeholder="Collateral"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center flex-wrap mt-4">
            {/* <Button textContent="Generate Proposal" styles="mt-5" /> */}
            <button
              // onClick={handleLandingClick}
              className=" bg-blue-gradient   px-4 py-2 hover:bg-gradient-to-r hover:from-[rgb(99,232,255)] hover:to-[rgb(59,193,211)]  font-poppins font-medium text-[18px] text-primary outline-none  active:scale-90 rounded-[10px]"
            >
              Generate Proposal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Business;
