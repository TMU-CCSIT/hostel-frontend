"use client";

// importing necessities
import React, { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";
import studentSignupData from "@/constants/studentSignupData";
import CTCButton from "../common/CTCButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import DropDown from "../common/DropDown";
import { obj } from "@/constants/constant";
import { COLLEGES } from "@/constants/constant";

import { useRecoilValue } from "recoil";

import { signupAtom } from "@/app/store/atoms/signup";

// interface
interface FormData {
  enrollmentNo: string;
  parentName: string;
  parentContactNo: string;
  fingerNo: string;
  course: string;
  college: string;
  roomNo: string;
  programe: string;
}

const Signup = () => {
  // hooks for reading different values
  const signUpValues = useRecoilValue(signupAtom);

  const router = useRouter();

  const [data, setData] = useState<FormData>({
    enrollmentNo: "",
    parentName: "",
    parentContactNo: "",
    fingerNo: "",
    course: "a",
    college: COLLEGES[0],
    roomNo: "",
    programe: obj["College Of Computing Sciences And IT"][0],
  });

  // function for data matching
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeOfDropDown = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function submitHandler(e: any) {
    try {
      e.preventDefault();
      const userSignupReponse = await axios.post("/api/auth/studentSignup", {
        user: signUpValues,
        student: data,
      });

      toast.success("Signup successfully");
      toast("Please verify your email!", {
        icon: "👏",
      });
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  }

  return (
    // main div
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-10">
      {/* inner div */}
      <div className="bg-[#EDF6FF] flex flex-col p-8 rounded-md shadow-xl justify-center items-center gap-4 ">
        {/* heading */}
        <h1 className="text-2xl font-bold">SIGN UP</h1>

        {/* form */}
        <form
          className=" flex flex-col gap-7 justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-7">
            {
              // input field component
              studentSignupData.map((a: any) => (
                <InputField
                  key={a.name}
                  label={a?.label}
                  type={a?.type}
                  required={true}
                  placeholder={a.placeholder}
                  value={data[a.name as keyof FormData]}
                  name={a?.name}
                  onChange={handleChange}
                ></InputField>
              ))
            }
          </div>

          {/* dropdown for college */}
          <DropDown
            text="college"
            label="Select College:"
            name={COLLEGES}
            onChange={handleChangeOfDropDown}
          ></DropDown>

          {/* deropdown for fields related to college */}
          <DropDown
            text="programe"
            label="Program"
            name={obj[data.college as keyof typeof obj]}
            onChange={handleChangeOfDropDown}
          ></DropDown>

          {/* button */}
          <div className="m-12">
            <CTCButton text={"Submit"} type={true} />
          </div>

          {/* return to login button */}
          <div className="text-sm text-center">
            {"Already have a account?"}
            <div
              onClick={() => {
                router.push("/auth/login");
              }}
              className="underline cursor-pointer text-blue-500"
            >
              Log In
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
