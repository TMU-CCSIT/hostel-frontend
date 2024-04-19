"use client";

// importing necessities
import React, { useState } from "react";
import InputField from "./InputField";
import DropDown from "./DropDown";
import { colleges } from "@/constants/constant";

const Signup = () => {
  // hooks for reading different values

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    enrolNumber: "",
    contact: "",
    fingerNumber: "",
    fatherName: "",
    fatherContact: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center">
      <div className="bg-[#EDF6FF] flex flex-col p-9 rounded-md shadow-xl justify-center items-center gap-4">

        <h1 className="text-2xl font-bold">SIGN UP</h1>

        
        <InputField
          label="Name"
          type="text"
          value={data.name}
          onChange={handleChange}
          name="name"
          placeholder="Enter your name"
        />


      </div>
    </div>
  );
};

export default Signup;
