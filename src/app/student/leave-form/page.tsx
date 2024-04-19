
import React, { useState, ChangeEvent, FormEvent } from "react";

import InputField from "@/components/auth/InputField";

import UserFieldData from "@/constants/UserProfileFields";

const Page = () => {

  const [formaData, setFromData] = useState({
    enrollmentNumber: "",
    name: "",
    phoneNumber: "",
    course: "",
    roomNumber: "",
    fingerNumber: "",
    fatherName: "",
    leaveDate: "",
    leaveTime: "",
    leaveReason: "",
    leaveStatus: "",
    numberOfDays: "",
    ReasonForLeave: "",
    addressDuringLeave: "",

  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setFromData((prev) => ({ ...prev, [name]: value }));

  };

  const submitHandler = async (e: FormEvent) => {

    e.preventDefault();

    console.log("form data is ",)

  };

  return <div>

    <div>

      <h1>Apply for Hostel leave </h1>

      <form onSubmit={submitHandler}>


        {


            <InputField

              label="Enrollment Number"
              type="text"
              placeholder="Enter your Enrollment Number"
              value={form}
              onChange={handleChange}

            >
            </InputField>

        }



      </form>

    </div>


  </div>;

};

export default Page;
