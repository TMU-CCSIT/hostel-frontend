"use client";

// importing necessities
import React, { useState } from "react";

import InputField from "@/components/common/InputField";
import DropDown from "@/components/common/DropDown";

import { COLLEGES } from "@/constants/constant";
import SignupData from "@/constants/SignupData";
import CTCButton from "../common/CTCButton";
import toast from "react-hot-toast";
import axios from "axios";

// interface
interface FormData {
  fullName: string;
  email: string;
  password: string;
  enrollmentNumber: string; // Assuming enrollmentNumber is a string based on your usage
  contactNumber: number;
  course: string;
  college: string;
  fingerNumber: number;
  roomNumber: string;
  fatherName: string;
  parentContact: number;
  address: string; // Assuming address is a string
}

const Signup = () => {
  // hooks for reading different values

  const [data, setData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    enrollmentNumber: "",
    contactNumber: 0,
    course: "",
    college: "CCSIT",
    fingerNumber: 0,
    roomNumber: "",
    fatherName: "",
    parentContact: 0,
    address: "",
  });

  // function for data matching
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // dummy function to pass

  async function submitHandler(e: any) {
    try {
      e.preventDefault();

      console.log("data is", data);

      const res = await axios.post("/api/auth/signup", data);
      console.log("res: ", res);
    } catch (error) {
      toast.error("signup failed");
    }
  }

  return (
    // main div
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-5">
      {/* inner div */}
      <div className="bg-[#EDF6FF] flex flex-col p-8 rounded-md shadow-xl justify-center items-center gap-4 ">
        {/* heading */}
        <h1 className="text-2xl font-bold">SIGN UP</h1>

        {/* form */}
        <form
          className=" flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-7">
            {
              // input field component
              SignupData.map((a: any) => (
                <InputField
                  key={a.name}
                  label={a?.label}
                  type={a?.type}
                  placeholder={a.placeholder}
                  value={data[a.name as keyof FormData]}
                  name={a?.name}
                  onChange={handleChange}
                ></InputField>
              ))
            }

            <div className="flex flex-col ">
              {/* drop down  */}
              <DropDown name={COLLEGES} label="Select College:"></DropDown>
            </div>
          </div>

          {/* button */}
          <div className="m-12">
            <CTCButton text={"Submit"} type={true} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
