<<<<<<< HEAD:src/app/student/leave-form/page.tsx

=======
>>>>>>> 72790470797732cb4c3228371576c5e765f497a7:src/app/(navbar)/student/leave-form/page.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { leaveFormFields } from "@/constants/fields";
import axios from "axios";

interface leaveFormData {
  enrollmentNumber: string;
  name: string;
  phoneNumber: string;
  course: string;
  roomNumber: string;
  fingerNumber: string;
  fatherName: string;
  FatherNumber: string;
  leaveFrom: string;
  leaveTime: string;
  leaveTo: string;
  leaveReason: string;
  numberOfDays: string;
  addressDuringLeave: string;
}

const Page = () => {
  const [formData, setFormData] = useState<leaveFormData>({
    enrollmentNumber: "",
    name: "",
    phoneNumber: "",
    course: "",
    roomNumber: "",
    fingerNumber: "",
    fatherName: "",
    FatherNumber: "",
    leaveFrom: "",
    leaveTime: "",
    leaveTo: "",
    leaveReason: "",
    numberOfDays: "",
    addressDuringLeave: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Data is sending---");

    const objData = {
      dateFrom: new Date("2026-04-25"),
      dateTo: new Date("2025-04-22"),
      reasonForLeave: "gknijgrb",
      addressDuringLeave: "vinevbrnrjbvinri",
    };

    const res = await axios.post("/api/student/leave", objData);
    console.log("res: ", res);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative h-full w-[1100px] flex flex-col p-5 bg-[#EDF6F6] justify-center items-start m-auto mt-6 gap-6 shadow-2xl rounded-lg">
        <h1 className="text-black text-start font-medium text-3xl">
          Apply for Hostel leave
        </h1>

        <form
          onSubmit={submitHandler}
          className="w-full h-full relative gap-5 flex flex-col justify-center items-center"
        >
          <div className="w-full relative flex gap-3 flex-wrap justify-between">
            {leaveFormFields.map((data: any, index: number) => (
              <div key={index} className="relative flex flex-col gap-1">
                <div className={`text-2xl text-black font-extrabold`}>
                  {data.label}
                </div>
                <input
                  className={`p-3 relative ${
                    data.name === "leaveReason"
                      ? "w-[750px] h-[100px]"
                      : "w-[500px]"
                  } rounded-lg text-slate-800`}
                  type={data.type}
                  placeholder={data.placeholder}
                  value={formData[data.name as keyof leaveFormData]}
                  name={data.name}
                  min={data.min}
                  readOnly={Boolean(data.readOnly)} // Corrected attribute name to readOnly
                  onChange={handleChange}
                ></input>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs bg-[#6DAFFE] text-center text-white font-bold uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
          >
            Submit Form
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
<<<<<<< HEAD:src/app/student/leave-form/page.tsx

=======
>>>>>>> 72790470797732cb4c3228371576c5e765f497a7:src/app/(navbar)/student/leave-form/page.tsx
