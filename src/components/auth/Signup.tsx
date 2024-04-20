"use client";

// importing necessities
import React, { FormEvent, useState } from "react";
import InputField from "./InputField";
import DropDown from "./DropDown";
import { colleges } from "@/constants/constant";
import SignupData from "@/constants/SignupData";
import CTCButton from "../common/CTCButton";

import { db } from "@/app/config/dbConfig";

import { collection, addDoc } from "firebase/firestore";


interface FormData {
  name: string;
  email: string;
  password: string;
  enrolNumber: string;
  contact: string;
  fingerNumber: string;
  fatherName: string;
  fatherContact: string;
  course: string;
  roomNumber: string;
}

const Signup = () => {
  // hooks for reading different values

  const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    enrolNumber: "",
    contact: "",
    fingerNumber: "",
    fatherName: "",
    fatherContact: "",
    course: "",
    roomNumber: ""
  });


  async function addDataTOStore() {

    try {

      console.log("hello, data is ", data);

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "User"), {

        data,

      });

      console.log(docRef)

      // Check if document reference exists
      if (docRef.id) {
        console.log("Document successfully added with ID: ", docRef.id);
        // Entry was successful
      } else {
        console.log("Error: Document reference not returned");
        // Entry was not successful
      }
    } catch (error) {
      console.log("Error adding document: ", error);
      // Entry was not successful
    }
  }

  const handleChange = (e: any) => {


    setData({ ...data, [e.target.name]: e.target.value });

  };

  const submitHandler = async (e: any) => {

    console.log("preve")
    console.log(e)


    e.preventDefault();
    console.log(data);
    await addDataTOStore();

  }

  return (
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-9">
      <div className="bg-[#EDF6FF] flex flex-col p-9 rounded-md shadow-xl justify-center items-center gap-4 w-auto">

        <h1 className="text-2xl font-bold">SIGN UP</h1>

        <form className=" flex flex-col justify-center items-center" onSubmit={submitHandler}>

          <div className="flex flex-col gap-7">

            {

              SignupData.map((a: any) => (

                <InputField
                  key={a.name}
                  label={a?.label}
                  type={a?.type}
                  placeholder={a.placeholder}
                  value={data[a.name as keyof FormData]}
                  name={a?.name}
                  onChange={handleChange}
                >
                </InputField>

              ))

            }

          </div>

          <div className="m-12">

            <CTCButton
              text={"Submit"}
              type={true}
            ></CTCButton>

          </div>

        </form>

      </div>

    </div>
  );
};

export default Signup;
