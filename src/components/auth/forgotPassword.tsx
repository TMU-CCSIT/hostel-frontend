"use client";

import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ForgotPasswordProps {
  token: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ token }) => {
  const router = useRouter();

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
    token: token
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/forgotPassword", data);
      console.log("response is ", response.data);
      toast.success("Your password has been reset successfully");
      router.push("/auth/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <div className="relative flex flex-col gap-4 justify-center items-center border shadow-2xl w-[400px] p-4 rounded-xl">
        <h1 className="text-xl font-semibold text-sky-500">Enter Your Password</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-7">
          <input
            type="password"
            name="newPassword"
            value={data.newPassword}
            placeholder="Enter Your New Password"
            className="border p-3 rounded-lg"
            onChange={changeHandler}
          />
          <input
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            placeholder="Confirm Your Password"
            className="border p-3 rounded-lg"
            onChange={changeHandler}
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
