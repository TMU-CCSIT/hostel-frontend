
"use client"

import axios from "axios";
import React from "react";

import toast from "react-hot-toast";

import { useState } from "react";

interface userPassword {

    oldPassword: string;
    newPassword: string;

}


export default function Password() {

    const [userData, setUserData] = useState<userPassword>({

        oldPassword: "",
        newPassword: ""
    });

    async function submitHandler(event:any) {

        try {

            event.preventDefault();

            console.log("user data ",userData);

            const response = await axios.post("/api/auth/resetPassword",userData);

            console.log(response.data);

            toast.success("password reset successfully");


        } catch (error: any) {

            console.log(error);

        }
    }



    return (


        <div>

            <form onSubmit={submitHandler} className="flex flex-col gap-6">

                <input type="text" className="w-[200px] p-3" placeholder="Enter your old password" onChange={(e) => {

                    setUserData({ ...userData, oldPassword: e.target.value });

                }} value={userData.oldPassword}/>

                <input type="text" className="w-[200px] p-3" placeholder="Enter your new  password" onChange={(e) => {

                    setUserData({ ...userData, newPassword: e.target.value });

                }} value={userData.newPassword}/>

                <button type="submit" className="w-[100px] p-3 rounded-md border text-white">Submit</button>

            </form>

        </div>
    )

}




