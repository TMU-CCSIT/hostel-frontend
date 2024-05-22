"use client";

import axios from "axios";
import React, { useState } from "react";

const ForgotEmail: React.FC = () => {
  const [email, setEmail] = useState({ email: "" });

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/forgotEmail", email);
      console.log("response is ", response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <div className="relative flex flex-col gap-4 justify-center items-center border shadow-2xl w-[400px] p-4 rounded-xl">
        <h1 className="text-xl font-semibold">Forgot Password</h1>
        <p className="text-[10px] text-gray-600 text-center">
          Enter Your Email Address we will send you instructions to reset your password
        </p>
        <form onSubmit={submitHandler} className="flex flex-col gap-7">
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email"
            className="border p-3 rounded-lg w-[350px]"
            onChange={(e) => setEmail({ email: e.target.value })}
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotEmail;
