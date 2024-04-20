"use client";
import { set } from "mongoose";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const SubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("otp value ", otp);
  };

  const handleOtpChange = (otp: any) => {
    setOtp(otp);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center m-5 overflow-x-hidden overflow-y-hidden">
      <div className=" w-[600px] flex flex-col gap-7 shadow-2xl rounded-3xl ">
        <h2 className="text-center font-bold text-4xl">We sent you a code</h2>
        <p className=" text-[25px] text-center">
          Please send it below to verify your email
        </p>
        <p className="text-center font-bold text-[#437FC7] text-xl ">
          johnDeo@gmail.com
        </p>
        <form
          className="flex gap-9 justify-center items-center flex-col"
          onSubmit={SubmitHandler}
        >
          <OtpInput
            value={otp}
            numInputs={6}
            renderSeparator={(index) => (
              <span key={index} className="mx-2">
                {" "}
                {/* Adjust the margin here */}
                {/* Use any separator you prefer, for example: */}
                {/* <span className="border-l-2 h-10 inline-block"></span> */}
                <span className="inline-block w-3"></span>{" "}
                {/* This creates a small space */}
              </span>
            )}
            renderInput={(props) => <input {...props} />}
            onChange={handleOtpChange}
            inputStyle={{
              width: "50px",
              height: "90px",
              fontSize: "30px",
              borderRadius: "10px",
              backgroundColor: "#6DAFFE",
            }}
          />
          <button
            type="submit"
            className="w-[400px] py-2 text-center rounded-full bg-[#6DAFFE] hover:bg-[#437FC7] transition-all ease-in-out duration-200 text-white font-bold"
          >
            Verify Email
          </button>
        </form>
        <div>
          <p className=" text-center p-3">
            Dont revieved code yet ?
            <span className="text-[#437FC7] font-semibold">Send again</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
