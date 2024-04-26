"use client";
import { signupAtom } from "@/app/store/atoms/signup";
import UserSignUp from "@/components/auth/Signup";
import SignupStudent from "@/components/auth/SignupStudent";
import { useRecoilValue } from "recoil";

const SignupPage = () => {
  const userSignupData = useRecoilValue(signupAtom);
  return <>{userSignupData ? <SignupStudent /> : <UserSignUp />}</>;
};

export default SignupPage;
