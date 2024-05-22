
"use client"

import React from "react";

import ForgotPasswordComponent from "@/components/auth/forgotPassword";

import { useRouter } from "next/navigation";

export default function ForgotPassword({ params }: { params: { token: string } }) {


    const router = useRouter();

    const actualToken = decodeURIComponent(params.token[0]).split("=")[1];

    console.log(actualToken);

    return (

        <ForgotPasswordComponent token ={actualToken}></ForgotPasswordComponent>

        // <h1>Forgot Password</h1>


    )
}






