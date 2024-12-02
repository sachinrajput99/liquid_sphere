import React from "react";

const Navbar = ({ ConnectButton }) => {

  return (
    <>
      <div className="text-white">
        <nav className="mt-6 flex justify-end items-center navbar ">
          <div className="flex ">
        
            <p
              className={`font-poppins font-normal cursor-pointer text-[16px]`}
            >
              {ConnectButton}
            </p>
          </div>

        
        </nav>
      </div>
    </>
  );
};

export default Navbar;
