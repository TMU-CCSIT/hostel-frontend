"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { DropdownList } from "@/constants/dropdown";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/app/store/atoms/user";
import axios from "axios";
import toast from "react-hot-toast";
import CTAButton from "@/components/common/CTCButton";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Specify the correct type
  const user: any = useRecoilValue(userAtom);
  const router = useRouter();

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

  async function logoutHandler() {
    try {
      await axios.get("/api/auth/logout");
      router.push("/auth/login");
      toast.success("Logout successfully!");
    } catch (error) {
      console.log("Error while logout: ", error);
      toast.error("Logout failed!");
    }
  }

  return (
    <nav className="shadow-lg  w-full flex justify-center items-center bg-white border-b border-gray-800">
      <div className=" flex w-11/12 py-1 justify-between items-center">
        {/* logo */}
        <Link href="/" className=" relative h-14 w-14">
          <Image
            className="w-auto object-cover bg-cover"
            src="/logo.jpg"
            alt="Logo"
            fill
          />
        </Link>

        <div className="flex items-center">
          {/* user profile */}
          {user && (
            <div
              className="relative h-14 w-14 cursor-pointer"
              ref={dropdownRef}
            >
              <div
                className="h-12 w-12 relative rounded-full overflow-hidden"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Image
                  className="w-auto object-cover bg-cover"
                  src={user?.profileImage}
                  alt="Logo"
                  fill
                />
              </div>
              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="flex flex-col justify-start items-start bg-[#EDF6FF]">
                    {/* Dropdown items */}
                    {DropdownList.map((dropdown: any) =>
                      dropdown.text === "Logout" ? (
                        <>
                          <button
                            onClick={logoutHandler}
                            className="px-4 py-2 w-full items-start flex  text-gray-800 hover:bg-gray-300"
                          >
                            <span>{dropdown.text}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            key={dropdown.id}
                            href={
                              dropdown.text === "Dashboard"
                                ? `/${user?.role?.toLowerCase()}`
                                : dropdown.path
                            }
                            className="px-4 py-2 w-full items-start flex  text-gray-800 hover:bg-gray-300"
                          >
                            {dropdown.text}
                          </Link>
                        </>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {!user && (
          <div className="flex justify-center items-center gap-5">
            <CTAButton
              onClickHandler={() => {
                router.push("/auth/signup");
              }}
              text="Signup"
            />
            <CTAButton
              onClickHandler={() => {
                router.push("/auth/login");
              }}
              text="Login"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
