"use client";

// importing necessities
import React, { useState } from "react";
import InputField from "../common/InputField";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { userAtom } from "@/app/store/atoms/user";

// logic for saving login details
const LoginPage = () => {
  const router = useRouter();

  // hook for reading different email and password values
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const setUser = useSetRecoilState(userAtom);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function loginHandler() {
    try {
      const resposne = await axios.post("/api/auth/login", data);
      setUser(resposne.data.data);
      toast.success("Login successfully");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    }
  }

  // frontend of login page
  return (
    // main div
    <div className="bg-white min-h-screen flex flex-col justify-center items-center text-black">
      {/* inner div */}
      <div className="bg-[#EDF6FF] p-10 rounded-lg shadow-md w-auto flex flex-col items-center gap-7">
        {/* heading for login */}
        <h2 className="text-2xl font-bold">LOGIN</h2>

        {/* for input fields */}
        <div className="flex flex-col gap-7">
          {/* email input field */}
          <InputField
            label="Email"
            type="email"
            value={data.email}
            required={true}
            onChange={handleChange}
            name="email"
            placeholder="Enter your email"
          />

          {/* password input field */}
          <InputField
            label="Password"
            type="password"
            value={data.password}
            required={true}
            onChange={handleChange}
            name="password"
            placeholder="Enter your password"
          />
        </div>

        {/* login button */}
        <button
          onClick={loginHandler}
          className="bg-[#437FC7] text-white py-2 px-4 rounded-md mt-4 w-full"
        >
          Login
        </button>

        {/* For Signup */}
        <div className="text-sm text-center">
          {"Don't have an account?"}
          <div
            onClick={() => {
              router.push("/auth/signup");
            }}
            className="underline cursor-pointer text-blue-500"
          >
            Sign Up
          </div>
        </div>

        {/* For Forget Password */}
        <div className="text-sm text-center mt-0">
          <div
            className="text-blue-500 cursor-pointer underline"
            onClick={() => {
              router.push("/forgetpassword");
            }}
          >
            Forget Password
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
