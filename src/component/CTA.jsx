import React from "react";
import styles from "../style";
import Button from "./Button";
const CTA = () => {
  return (
    <section
      className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow `}
    >
      <div className="flex-1 flex flex-col">
        <h2 className={styles.heading2}> Lets's try our service now!</h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Everything you need to accept card payments and grow your business
          anywhere on the planet
        </p>
      </div>
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Button />
      </div>
    </section>
  );
};

export default CTA;
//////////////////////////////////

{
  /* <div className="mt-24 mb-28">
<div className="bg-black-gradient rounded-[20px] w-full p-16  flex-row  flex  justify-center items-center">
  <div className=" flex flex-col">
    <h1 className=" font-poppins text-white font-semibold text-5xl ">
      Let's try our service now!
    </h1>
    <p className=" font-poppins text-dimWhite mt-6 text-xl  w-4/3">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
      fuga, dolor architecto at temporibus porro, iste veniam impedit
    </p>
  </div>
  <div className="p-14 ml-20 ">
    <button className="py-4 px-6 text-[18px] bg-blue-gradient font-poppins font-medium rounded-md flex-nowrap text-black">
      Get started
    </button>
  </div>
</div>
</div> */
}
