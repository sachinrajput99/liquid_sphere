// import React from "react";

const Button = ({ textContent }) => {
  return (
    <button
      type="button"
      className={`py-4 px-6 bg-blue-gradient    font-poppins font-medium text-[18px] text-primary outline-none  active:scale-90 rounded-[10px]`}
    >
     {textContent}
    </button>
  );
};

export default Button;
