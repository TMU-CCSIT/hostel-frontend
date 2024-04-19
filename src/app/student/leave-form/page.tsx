
import React, { useState, ChangeEvent, FormEvent } from "react";

import InputField from "@/components/auth/InputField";

import UserFieldData from "@/constants/UserProfileFields";

const Page = () => {

  const [formaData, setFromData] = useState({

    EnrollMentNumber: "",
    name: "",
    phoneNumber: "",
    Course: "",
    RoomNumber: "",
    FingerNumber: "",
    FatherName: "",
    LeaveDate: "",
    LeaveTime: "",
    LeaveReason: "",
    LeaveStatus: "",
    Number_of_days: "",
    ReasonForLeave: "",
    AddressDuringLeave: "",

  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = event.target;
    setFromData((prev) => ({ ...prev, [name]: value }));
    
  };

  const submitHandler = async (e: FormEvent) => {

    e.preventDefault();



  };

  return <div>

    <div>

      <h1>Apply for Hostel leave </h1>

      <form onSubmit={submitHandler}>


        {

          UserFieldData.map((data: any) => (

            <InputField

              label={data?.label}
              type={data?.type}
              placeholder={data?.placeholder}
              value={data?.label}
              onChange={handleChange}

            >
            </InputField>


          ))


        }



      </form>

    </div>


  </div>;

};

export default Page;
