"use client";
import React from "react";
import Avatar from "react-avatar";
const Navbar = () => {
  return (
    <nav className="container mx-auto px-4  flex justify-between items-center p-4 bg-white  shadow-2xl">
      <div className="w-[60px] h-[60px]">
        <img
          src="http://portal2.tmu.ac.in/images/rightlogo.png"
          alt="logo"
          // className="w-full h-full bg-cover"
        ></img>
      </div>
      <div>
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSD7iHU80ty0G-EidJnhBV-4B0SXUn5lBMP3siJtAMVA&s"
          size={"50px"}
          round={true}
        />
        <button className=" bg-[#437FC7] hover:bg-[#6DAFFE] rounded-full px-3 py-2 transition-all duration-200 ease-in-out text-white font-bold">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
