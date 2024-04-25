"use client";

// importing necessities
import React, { useState } from "react";
import InputField from "@/components/common/InputField";
import SignupData from "@/constants/commonSignupData";
import CTCButton from "../common/CTCButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// interface
interface FormData {
  fullName: string;
  email: string;
  password: string;
  contactNo: string;
  address: string; // Assuming address is a string
}

const Signup = () => {
  // hooks for reading different values

  const router = useRouter();
  const [data, setData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    address: "",
  });

  // function for data matching
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // dummy function to pass

  async function submitHandler(e: any) {
    try {
      e.preventDefault();

      const userResponse = await axios.post("/api/auth/signup", {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        contactNo: data.contactNo,
        address: data.address,
        role: "Student",
      });

      // const userSignupReponse = await axios.post("/api/auth/studentSignup", {
      //   enrollmentNo: data.enrollmentNo,
      //   course: data.course,
      //   college: data.college,
      //   fingerNo: data.fingerNo,
      //   programe: data.programe,
      //   roomNo: data.roomNo,
      //   parentName: data.parentName,
      //   parentContactNo: data.parentContactNo,
      //   userId: userResponse.data.data._id,
      // });

  //     console.log(userSignupReponse);
  //     toast.success("Signup successfully");
  //     toast("Please verify your email!", {
  //       icon: "👏",
  //     });
  //     router.push("/auth/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    }
  }

  return (
    // main div
    <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-10">
      {/* inner div */}
      <div className="bg-[#EDF6FF] flex flex-col p-8 rounded-md shadow-xl justify-center items-center gap-4 ">
        {/* heading */}
        <h1 className="text-2xl font-bold">SIGN UP</h1>

        {/* form */}
        <form
          className=" flex flex-col justify-center items-center"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col gap-7">
            {
              // input field component
              SignupData.map((a: any) => (
                <InputField
                  key={a.name}
                  label={a?.label}
                  type={a?.type}
                  required={true}
                  placeholder={a.placeholder}
                  value={data[a.name as keyof FormData]}
                  name={a?.name}
                  onChange={handleChange}
                ></InputField>
              ))
            }
          </div>


          {/* button */}
          <div className="m-12">
            <CTCButton text={"Next"} type={true} />
          </div>



          {/* return to login button */}
          <div className="text-sm text-center">
          {"Already have a account?"}
            <div
              onClick={() => {
                router.push("/auth/login");
              }}
              className="underline cursor-pointer text-blue-500"
            >
              Log In
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
