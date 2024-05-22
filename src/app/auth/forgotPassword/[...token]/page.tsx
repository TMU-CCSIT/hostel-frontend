"use client";

import React from "react";
import ForgotPassword from "@/components/auth/forgotPassword";
import { useRouter } from "next/navigation";

interface ForgotPasswordProps {

  params: { token: string };
  
}

const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({ params }) => {
  const router = useRouter();

  // Decode the token from the URL parameter
  const actualToken = decodeURIComponent(params.token).split("=")[1];

  console.log(actualToken);

  return <ForgotPassword token={actualToken} />;
};

export default ForgotPasswordPage;
