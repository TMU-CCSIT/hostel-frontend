"use client";

import React, { useState } from "react";
import Signup from "@/components/auth/Signup";
import SignupStudent from "@/components/auth/SignupStudent";
import SignupWarden from "@/components/auth/SignupWarden";
import SignupCoordinator from "@/components/auth/SignupCoordinator";
import { ROLE } from "@/constants/constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { signupAtom } from "@/app/store/atoms/signup";

export const ADMIN_DATA = {
  student: "Register Student",
  Coordinator: "Register Coordinator",
  Warden: "Register Warden",
};

const AdminFormPage = () => {
  const [data, setData] = useState("Register Student");
  const [signupData, setSignupData] = useRecoilState(signupAtom);

  return (
    <div className="min-h-screen max-w-screen bg-white p-16">
      <div className="flex items-center gap-24 justify-center">
        {Object.entries(ADMIN_DATA).map(([key, value]) => (
          <button
            className="font-bold bg-[#EDF6FF] p-3 hover:bg-[#6DAFFE] rounded-md transition-all delay-75 hover:text-white"
            key={key}
            onClick={(e: any) => {
              setSignupData(null);
              setData(e.target.textContent);
            }}
          >
            {value}
          </button>
        ))}
      </div>

      <div>
        {!signupData ? (
          <Signup
            role={
              data === "Register Student"
                ? ROLE.Student
                : data === "Register Coordinator"
                ? ROLE.Coordinator
                : ROLE.Warden
            }
          />
        ) : (
          <>
            {data === "Register Student" ? (
              <SignupStudent />
            ) : data === "Register Coordinator" ? (
              <SignupCoordinator />
            ) : (
              <SignupWarden />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminFormPage;
