"use client";

// importing necessities
import React, { useState } from "react";
import InputField from "@/components/common/InputField";
import CTCButton from "@/components/common/CTCButton";
import TextArea from "@/components/common/TextArea";
import toast from "react-hot-toast";
import axios from "axios";

// interface
interface FormData {
  dateFrom: Date;
  dateTo: Date;
  reasonForLeave: string;
  addressDuringLeave: string;
}

// main function
const Leave = () => {
  // hooks for reading different values
  const [data, setData] = useState<FormData>({
    dateFrom: new Date(),
    dateTo: new Date(),
    reasonForLeave: "",
    addressDuringLeave: "",
  });

  // function for data matching
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  // dummy function to pass
  async function submitHandler(e: any) {
    try {
      e.preventDefault();
      console.log("date", data);
      const res = await axios.post("/api/student/leave", data);
      console.log("res: ", res);
    } catch (error) {
      toast.error("submission failed");
    }
  }

  return (
    // main div
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-5">
      {/* inner div */}
      <div className="bg-[#EDF6FF] flex flex-col p-8 rounded-md shadow-xl justify-center items-center gap-4 ">
        {/* heading */}
        <h1 className="text-2xl font-bold">LEAVE FORM</h1>

        {/* form */}
        <form
          className=" flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >


          {/* input field for initial date */}
          <div className="flex flex-col gap-7">
            {
              <InputField
                key=""
                label="Date From"
                type="date"
                placeholder="Date From"
                value={data.dateFrom}
                name="dateFrom"
                onChange={handleChange}
              ></InputField>
            }
          </div>


            {/* input field for final date */}
          <div className="flex flex-col gap-7">
            {
              <InputField
                key=""
                label="Date To"
                type="date"
                placeholder="Date To"
                value={data.dateTo}
                name="dateTo"
                onChange={handleChange}
              ></InputField>
            }
          </div>



          {/* reason for leave field */}
          <div>
            {
              <TextArea
              key=""
              label="Reason"
              placeholder="Enter Your Reason Here"
              value={data.reasonForLeave}
              name="reasonForLeave"
              onChange={handleChange}
              ></TextArea>
            }
          </div>


           {/* adress field */}
           <div>
            {
              <TextArea
              key=""
              label="Adress During Leave"
              placeholder="Enter Your Address Here"
              value={data.addressDuringLeave}
              name="addressDuringLeave"
              onChange={handleChange}
              ></TextArea>
            }
          </div>





          {/* button */}
          <div className="m-12">
            <CTCButton text={"Submit"} type={true} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Leave;

