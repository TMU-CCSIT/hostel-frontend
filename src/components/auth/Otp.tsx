"use client";
import { set } from "mongoose";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
const OtpPage = () => {
  const [otp, setOtp] = useState("");
  return (
    <div className="min-h-screen w-full flex justify-center items-center m-5">
      <div className=" w-[600px] flex flex-col gap-7 ">
        <h2 className="text-center font-bold text-4xl">We sent you a code</h2>
        <p className=" text-[25px] text-center">
          Please send it below to verify your email
        </p>
        <p className="text-center font-bold text-[#437FC7] text-xl ">
          johnDeo@gmail.com
        </p>
        <form className="flex gap-9 justify-center items-center flex-col">
          <OtpInput
            value={otp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            onChange={setOtp}
            inputStyle={{
              width: "50px",
              height: "90px",
              fontSize: "30px",
              borderRadius: "10px",
            }}
          />
          <button className="w-[400px] py-2 text-center rounded-full bg-[#437FC7]">
            Verify Email
          </button>
        </form>
        <div>
          <p className=" text-center">
            Dont revieved code yet ?
            <span className="text-[#437FC7] font-semibold">Send again</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
