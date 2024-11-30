import React, { useState } from "react";
import { logo, menu, close } from "../assets/";

import { navLinks } from "../constants/index";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div className="text-white">
        <nav className="py-6 flex justify-between items-center navbar ">
          <img src={logo} alt="hoobank" className="w-[134px] h-[32px] " />

          <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            {navLinks.map(
              (
                nav,
                index //index 0 se start hota hai
              ) => (
                <li
                  key={index}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    index === navLinks.length - 1 ? "mr-0" : "mr-10"
                  } text-white`}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              )
            )}
          </ul>

          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain"
              onClick={() => setToggle((prev) => !prev)}
            />

            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px  ] rounded-xl sidebar`}
            >
              <ul className="list-none flex  justify-end items-center flex-1 flex-col">
                {navLinks.map(
                  (
                    nav,
                    index //index 0 se hai
                  ) => (
                    <li
                      key={index}
                      className={`font-poppins font-normal cursor-pointer text-[16px] ${
                        index === navLinks.length - 1 ? "mr-0" : "mb-10"
                      } text-white`}
                    >
                      <a href={`#${nav.id}`}>{nav.title}</a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
