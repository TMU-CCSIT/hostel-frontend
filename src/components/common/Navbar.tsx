"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DropdownList } from "@/constants/dropdown";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the correct type

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="shadow-lg  w-full flex justify-center items-center bg-white border-b border-gray-800">
      <div className=" flex w-11/12 py-1 justify-between items-center">
        {/* logo */}
        <Link href="/" className=" relative h-14 w-14">
          <Image
            className="w-auto object-cover bg-cover"
            src="http://portal2.tmu.ac.in/images/rightlogo.png"
            alt="Logo"
            fill
          />
        </Link>

        {/* user profile */}
        <div className="flex items-center">
          <div className="relative h-14 w-14 cursor-pointer" ref={dropdownRef}>
            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
              <Image
                className="w-auto object-cover bg-cover"
                src={`http://portal2.tmu.ac.in/images/rightlogo.png`}
                alt="Logo"
                fill
              />
            </div>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1 bg-[#EDF6FF]">
                  {/* Dropdown items */}
                  {DropdownList.map((dropdown: any) => (
                    <Link
                      key={dropdown.id}
                      href={dropdown.path}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                    >
                      {dropdown.text}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
