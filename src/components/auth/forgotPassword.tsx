
"use client"

import axios from "axios";
import React from "react";

import { useState } from "react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

export default function forgotPassword({ token }: any) {

    const router = useRouter();

    const [data, setData] = useState({


        newPassword: "",
        confirmPassword: "",
        token: token

    })


    function changeHandler(event: any) {

        setData(prevData => ({

            ...prevData,
            [event.target.name]: event.target.value

        }));
    }


    async function submitHandler(e: any) {


        try {

            e.preventDefault();

            console.log("data is ", data);

            const response = await axios.post("/api/auth/forgotPassword", data);

            console.log("response is ", response.data);

            toast.success("your passwor has been reset successfully");

            router.push("/auth/login");


        } catch (error: any) {

            console.log(error.message);


        }
    }


    return (

        <div className="min-h-screen min-w-full flex justify-center items-center">

            <div className=" relative flex flex-col gap-4 justify-center items-center border shadow-2xl w-[400px] p-4 rounded-xl">

                <h1 className="text-xl font-semibold text-sky-500">Enter Your Password </h1>

                <form onSubmit={submitHandler} className="flex flex-col gap-7">

                    <input type="text" onChange={changeHandler}

                        name="newPassword"
                        value={data.newPassword} placeholder="Enter Your New Password"
                        className="border p-3 rounded-lg" />

                    <input type="text" onChange={changeHandler}
                        name="confirmPassword"
                        className="border p-3 rounded-lg"
                        value={data.confirmPassword} placeholder="Confirm Your Password" />

                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                                        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5
                                            py-2.5 text-center me-2 mb-2">Reset</button>

                </form>

            </div>


        </div>

    )
}





