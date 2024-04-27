
"use client"

import React from "react";

import ForgotPassword from "@/components/auth/forgotPassword";

import { useRouter } from "next/navigation";

export default function forgotPassword({ params }: { params: { token: string } }) {


    const router = useRouter();

    const actualToken = decodeURIComponent(params.token[0]).split("=")[1];

    console.log(actualToken);

    return (

        <ForgotPassword token ={actualToken}></ForgotPassword>

        // <h1>Forgot Password</h1>


    )
}






