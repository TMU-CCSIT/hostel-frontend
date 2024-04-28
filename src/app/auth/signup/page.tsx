"use client";

import Signup from "@/components/auth/Signup";

import UserSignUp from "@/components/auth/Signup";
import SignupStudent from "@/components/auth/SignupStudent";

import React from "react";

import { useRecoilValue } from "recoil";

import { signupAtom } from "@/app/store/atoms/signup";

import StudentSignup from "@/components/auth/SignupStudent";
import { ROLE } from "@/constants/constant";

const SignupPage = () => {
  const signupValues = useRecoilValue(signupAtom);

  return (
    <div>
      {signupValues ? <StudentSignup /> : <Signup role={ROLE.Student} />}
    </div>
  );
};

export default SignupPage;
