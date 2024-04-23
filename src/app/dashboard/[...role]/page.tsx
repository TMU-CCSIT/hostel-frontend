
"use client"

import React from "react"

import { useRouter } from "next/navigation"

export default function Dashboard (){

    const router = useRouter();

    const role = location.pathname.split("/")[2];


    return (

        <div>Welcome To {role} Dashboard Page</div>
    )
}


