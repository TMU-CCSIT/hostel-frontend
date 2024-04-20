"use client";

// importing necessities
import React, { FormEvent, useState } from "react";
import InputField from "./InputField";
import DropDown from "./DropDown";
import { colleges } from "@/constants/constant";
import SignupData from "@/constants/SignupData";
import CTCButton from "../common/CTCButton";

interface FormData {
  name: string;
  email: string;
  password: string;
  enrolNumber: string;
  contact: string;
  fingerNumber: string;
  fatherName: string;
  fatherContact: string;
  course: string;
  roomNumber: string;
}

const Signup = () => {
  // hooks for reading different values

  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    enrolNumber: "",
    contact: "",
    fingerNumber: "",
    fatherName: "",
    fatherContact: "",
    course: "",
    roomNumber: "",
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    console.log(data);
  };

  return (
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-9">
      <div className="bg-[#EDF6FF] flex flex-col p-9 rounded-md shadow-xl justify-center items-center gap-4 w-auto">
        <h1 className="text-2xl font-bold">SIGN UP</h1>

        <form className=" flex flex-col justify-center items-center">
          <div className="flex flex-col gap-7">
            {SignupData.map((a: any) => (
              <InputField
                key={a.name}
                label={a?.label}
                type={a?.type}
                placeholder={a.placeholder}
                value={data[a.name as keyof FormData]}
                name={a?.name}
                onChange={handleChange}
              ></InputField>
            ))}
          </div>

          <div className="m-12">
            <CTCButton
              text={"Submit"}
              onClickHandler={submitHandler}
            ></CTCButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
