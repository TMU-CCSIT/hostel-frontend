

"use client"

import axios from "axios";
import React from "react";

import { useState } from "react";

export default function forgotEmail() {

    const [email,setEmail] = useState({

        email:"",

    })


    async function submitHandler(e: any) {


        try {

            e.preventDefault();

            const response = await axios.post("/api/auth/forgotEmail", email);

            console.log("response is ", response.data);


        } catch (error: any) {

            console.log(error.message);


        }
    }


    return (

        <div className="min-h-screen min-w-full flex justify-center items-center">

            <div className=" relative flex flex-col gap-4 justify-center items-center border shadow-2xl w-[400px] p-4 rounded-xl">

                <h1 className="text-xl font-semibold ">Forgot Password </h1>
                
                <p className="text-[10px] text-gray-600 text-center">Enter Your Email Address we will send you instructions to reset your password </p>

                <form onSubmit={submitHandler} className="flex flex-col gap-7">

                    <input type="text"
                         name="email"
                         placeholder="Enter Your New Email" 
                         className="border p-3 rounded-lg relative w-[350px]" onChange={(e:any)=>{

                             setEmail({...email,email:e.target.value})

                         }}/>

                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                                        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5
                                            py-2.5 text-center me-2 mb-2">Send</button>

                </form>

            </div>


        </div>

    )
}







