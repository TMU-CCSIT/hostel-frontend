"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";

import InputField from "@/components/auth/InputField";

import UserFieldData from "@/constants/UserProfileFields";



interface leaveFormData  {
  enrollmentNumber:string,
  name:string,
  phoneNumber: string,
  course: string,
  roomNumber: string,
  fingerNumber: string,
  fatherName: string,
  FatherNumber:string,
  leaveFrom: string,
  leaveTime: string,
  leaveTo:string,
  leaveReason: string,
  numberOfDays: string,
  addressDuringLeave: string,
}

const Page = () => {

  const [formData, setFromData] = useState<leaveFormData>({
    enrollmentNumber: "",
    name: "",
    phoneNumber: "",
    course: "",
    roomNumber: "",
    fingerNumber: "",
    fatherName: "",
    FatherNumber:"",
    leaveFrom: "",
    leaveTime: "",
    leaveTo:"",
    leaveReason: "",
    numberOfDays: "",
    addressDuringLeave: "",

  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setFromData((prev) => ({ ...prev, [name]: value }));

  };

  const submitHandler = async (e: FormEvent) => {

    e.preventDefault();

    console.log("form data is ",formData);

  };

  return <div className="min-h-screen w-full">

    <div className="flex flex-col justify-center items-center">

      <h1 className="text-white text-start font-medium text-3xl">Apply for Hostel leave </h1>

      <form onSubmit={submitHandler} className=" flex flex-col justify-center items-center">

        <div>

          {

            UserFieldData.map((data: any) => (

              <InputField

                label={data?.label}
                type={data?.type}
                placeholder={data.placeholder}
                value={formData[data.name as keyof leaveFormData]}
                name={data?.name}
                min={data?.min}
                readOnly={Boolean(data?.readOnly)} // Corrected attribute name to readOnly
                onChange={handleChange}

              >
              </InputField>

            ))

          }

        </div>

        <div>

          <button type="submit" className="border">Submit Form </button>

        </div>

      </form>

    </div>

  </div>;

};

export default Page;


