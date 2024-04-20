"use client";
import React from "react";
import Avatar from "react-avatar";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.targety)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="py-2 shadow-md px-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <img
            className="h-12 w-auto object-cover bg-cover"
            src="http://portal2.tmu.ac.in/images/rightlogo.png"
            alt="Logo"
          />
        </div>
        <div className="flex items-center">
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSD7iHU80ty0G-EidJnhBV-4B0SXUn5lBMP3siJtAMVA&s"
                size={"60px"}
                round={true}
                style={{ cursor: "pointer" }}
              />
            </div>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1">
                  {/* Dropdown items */}
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                  >
                    Logout
                  </a>

                  {/* Add more items as needed */}
                </div>
              </div>
            )}
          </div>
          {/* Logout button */}
          {/* <button className="text-black bg-[#6DAFFE] hover:bg-[#437FC7] rounded-xl px-4 py-2 transition-all ease-in-out duration-200">
            Logout
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
