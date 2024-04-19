
import React, { useState, ChangeEvent, FormEvent } from "react";


const Page = () => {

  const [formaData,setFromData] = useState({

    EnrollMentNumber: "",
    name:"",
    phoneNumber:"",
    Course:"",
    RoomNumber:"",
    FingerNumber:"",
    FatherName:"",
    LeaveDate:"",
    LeaveTime:"",
    LeaveReason:"",
    LeaveStatus:"",
    Number_of_days:"",
    ReasonForLeave:"",
    AddressDuringLeave:"",
  
  })

  const submitHandler = async (e: FormEvent) => {

    e.preventDefault();

    // Logic to handle form submission, like sending data to backend
    console.log("Form submitted!");

  };

  return <div>

    <div>

      <h1>Apply for Hostel leave </h1>

      <form onSubmit={submitHandler}>


      </form>

    </div>


  </div>;

};

export default Page;
