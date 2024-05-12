
"use client"

import { ImCross } from "react-icons/im";

import { useState } from "react";

export default async function StudentInfo({ name, enrollmentNo, Branch, College, Hostel, ParentNo, parentName, setClick }: any) {


    return (

        <div className=" flex gap-8 rounded-xl shadow-2xl w-[600px] justify-center items-center bg-[#DBE9FA]">

            <div className=" relative w-full flex justify-between p-5">

                <div className=" w-[200px] h-[200px] rounded-full">

                    <img src="https://i.pinimg.com/474x/98/51/1e/98511ee98a1930b8938e42caf0904d2d.jpg" alt="" className="bg-cover w-full h-full rounded-full" />

                </div>

                <div className="flex flex-col gap-6 text-white">

                    <h1 className="font-bold">{name} </h1>

                    <p>{enrollmentNo}</p>

                    <p>{Branch}</p>

                    <p>{College}</p>

                    <p>{Hostel}</p>

                    <p>{ParentNo}</p>

                    <p>{parentName}</p>

                </div>

                <div onClick={() => setClick(false)} className="cursor-pointer">

                    <ImCross className="text-white"/>

                </div>

            </div>


        </div>
    )
}


