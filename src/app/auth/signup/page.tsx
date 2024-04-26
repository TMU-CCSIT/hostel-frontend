"use client"

import Signup from "@/components/auth/Signup";

import React from "react";

import { useRecoilValue } from "recoil";

import { signupAtom } from "@/app/store/atoms/signup";

import StudentSignup from "@/components/auth/SignupStudent";


const SignupPage = () => {

  const signupValues = useRecoilValue(signupAtom);

  console.log(signupValues);
  

  return (

    <div>

      {

        signupValues !== null ? <StudentSignup/> : <Signup role={"Student"}/>

      }

    </div>
    
  );
};

export default SignupPage;




