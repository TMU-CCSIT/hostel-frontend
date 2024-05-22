"use client";

import { ImCross } from "react-icons/im";
import { useState } from "react";

import { formatDate } from "@/helper/formatDate";

import { dateIntoReadableFormat } from "@/helper/date";

import { dateDiffInDays } from "@/helper/diffDate";

export default function StudentInfo({ name, enrollmentNo, dateFrom, dateTo, reasonForLeave, email, contact
    , addressDuringLeave, userImage, Branch, College, Hostel, status,
    ParentNo, parentName, setClick, isStudent }: any) {

    console.log("user Image is ", userImage);

    return (

        <div className="relative flex gap-8 rounded-xl shadow-2xl w-full max-w-xl justify-center items-center bg-[#DBE9FA] p-5 mx-auto">
            <div className="relative w-full flex justify-between items-center p-5">

                <div className="flex flex-col gap-2">

                    <div className="w-[150px] h-[150px] rounded-full overflow-hidden shadow-lg">

                        <img src={userImage} alt="User Image" className="object-cover w-full h-full" />

                    </div>

                    <div className="flex flex-col gap-2">

                        <h1 className="text-xl font-bold text-center">{name}</h1>
                        <p className="text-sm"><span className="font-semibold text-center">Enrollment No:</span> {enrollmentNo}</p>

                    </div>

                </div>

                <div className="flex flex-col gap-3 text-gray-800">

                    <p className="text-sm"><span className="font-semibold">Branch:</span> {Branch}</p>
                    <p className="text-sm"><span className="font-semibold">College:</span> {College}</p>
                    <p className="text-sm"><span className="font-semibold">Hostel:</span> {Hostel}</p>
                    <p className="text-sm"><span className="font-semibold">Parent No:</span> {ParentNo}</p>
                    <p className="text-sm"><span className="font-semibold">Parent Name:</span> {parentName}</p>
                    <p className="text-sm"><span className="font-semibold">email:</span> {email}</p>

                    <p className="text-sm"><span className="font-semibold">Contact No:</span> {contact}</p>

                    {

                        dateFrom && <p className="text-sm"><span className="font-semibold">Date From :</span>{formatDate(dateFrom)}</p>

                    }

                    {

                        dateFrom && <p className="text-sm"><span className="font-semibold">Date To :</span> {formatDate(dateTo)}</p>

                    }

                    {

                        dateFrom && dateTo && <p className="text-sm"><span className="font-semibold">Total Days :</span> {dateDiffInDays(dateIntoReadableFormat(dateFrom), dateIntoReadableFormat(dateTo))}</p>
                    }

                    {

                        reasonForLeave && <p className="text-sm"><span className="font-semibold">Reason For Leave :</span> {reasonForLeave}</p>

                    }

                    {

                        addressDuringLeave && <p className="text-sm"><span className="font-semibold">Address During Leave :</span> {addressDuringLeave}</p>

                    }


                    {/* {

                        status && <p className="text-sm"><span className="font-semibold"> status :</span> {status}</p>

                    } */}

                </div>
            </div>

            <div onClick={() => setClick(false)} className="absolute top-5 right-5 cursor-pointer p-2 hover:bg-red-500 rounded-full transition duration-200">
                <ImCross className="text-gray-800 hover:text-white" />
            </div>
        </div>
    );
}




