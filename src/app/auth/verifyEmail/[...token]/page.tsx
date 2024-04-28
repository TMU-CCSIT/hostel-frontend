"use client";

import React, { useEffect } from "react";

import { TbMailPin } from "react-icons/tb";

import axios from "axios";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EmailVerification({
  params,
}: {
  params: { token: string };
}) {
  const router = useRouter();

  const actualToken = decodeURIComponent(params.token[0]).split("=")[1];

  async function verifyYourEMail() {

    try {

      let resposne = await axios.post("/api/auth/verifyEmail", {
        token: actualToken,
      });

      toast.success("your email is successfully verified");

      router.push("/auth/login");

    } catch (error: any) {

      console.log(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center bg-white min-h-screen w-full">
      <div className=" relative w-[450px] h-[270px] gap-3  bg-[#6DAFFE] flex flex-col justify-center items-center rounded-lg shadow-2xl">
        {/* icon */}

        <div>
          <TbMailPin className="text-white text-3xl"></TbMailPin>
        </div>

        <h1 className="text-white text-2xl font-semibold capitalize">
          Verify Your Email
        </h1>

        <p className="text-sm text-white w-[300px] text-center">
          click below to verify your gamil acccount{" "}
        </p>

        <button
          className=" text-white text-xs mt-3 font-bold border pl-5 pr-5 rounded-md bg-slate-700/90 p-2"
          onClick={verifyYourEMail}
        >
          VerifyEmail
        </button>
      </div>
    </div>
  );
}
