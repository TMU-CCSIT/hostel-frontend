"use client";


// importing necessities
import React, { useState } from "react";
import InputField from "./InputField";


// logic for saving login details
const LoginPage = () => {


  // hook for reading different email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // handle emailchange
  const handleEmailChange = (value: string) => {
    setEmail(value);
  };


  // handle passwordchange
  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };



  // frontend of login page
  return (

    // main div
<div className="bg-white min-h-screen flex flex-col justify-center items-center text-black">


      {/* inner div */}
      <div className="bg-[#EDF6FF] p-10 rounded-lg shadow-md w-80 flex flex-col items-center gap-7">


        {/* heading for login */}
        <h2 className="text-2xl font-bold">LOGIN</h2>


        {/* for input fields */}
        <div className="flex flex-col gap-7">


        {/* email input field */}
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
        />


        {/* password input field */}
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
        </div>


        {/* login button */}
        <button className="bg-[#437FC7] text-white py-2 px-4 rounded-md mt-4 w-full">
          Login
        </button>


        {/* signup */}
        <p className=" text-sm text-center">
          Don't have an account? <a href="/signup" className="underline text-blue-500">Sign up</a>
        </p>


        {/* forget password */}
        <p className=" text-sm text-center mt-0">
          <a href="/resetpassword" className="text-blue-500 underline">Forget Password</a>
        </p>
      
      </div>
</div>

  );
};

export default LoginPage;
