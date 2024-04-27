"use client";

// importing necessities
import React, { useState } from "react";
import CTCButton from "../common/CTCButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import DropDown from "../common/DropDown";
import { PROGRAME } from "@/constants/constant";
import { COLLEGES } from "@/constants/constant";
import { signupAtom } from "@/app/store/atoms/signup";
import Checkbox from "../common/CheckBox";
import { NEVER } from "zod";
import { useRecoilValue } from "recoil";




// interface
interface FormData {
  college: string;
  programe: string;
  branch: string[];
}

const Signup = () => {

  // hooks for reading different values

  const signUpValues = useRecoilValue(signupAtom);

  const router = useRouter();


  const [updatedBranches,setUpdatedBranches] = useState([]);


  const [data, setData] = useState<FormData>({

    college:Object.keys(COLLEGES)[0],
    programe: Object.keys(PROGRAME)[0],
    branch: PROGRAME["Bachelor of Tecnology"]

  });

  console.log(PROGRAME["Bachelor of Tecnology"]);  

  const handleChangeOfDropDown = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOfCheck = (e: any) => {
    const { checked, value } = e.target;
  
    // Create a copy of the current branch array  
    let updatedBranchesCopy: any = [...updatedBranches];
  
    if (checked) {
      // Add the value to the copied array if checked
      updatedBranchesCopy.push(value);
    } else {
      // Remove the value from the copied array if unchecked
      updatedBranchesCopy = updatedBranchesCopy.filter((branch: any) => branch !== value);
    }


    setUpdatedBranches(updatedBranchesCopy);
  
    // Update the state with the new branch array
    // setData({
    //   ...data,
    //   branch: updatedBranchesCopy,
    // });

    setData({

      ...data,
      branch:updatedBranchesCopy

    })
  };
  


  async function submitHandler(e: any) {

    try {
      console.log(data);
      e.preventDefault();


      // const userResponse = await axios.post("/api/auth/signup", {

      //   college: data.college,
      //   programe: data.programe,

      // });
      //   const userSignupReponse = await axios.post("/api/auth/studentSignup", {
      //     enrollmentNo: data.enrollmentNo,
      //     course: data.course,
      //     college: data.college,
      //     fingerNo: data.fingerNo,
      //     programe: data.programe,
      //     roomNo: data.roomNo,
      //     parentName: data.parentName,
      //     parentContactNo: data.parentContactNo,
      //     userId: userResponse.data.data._id,
      //   });

      //     console.log(userSignupReponse);
      //     toast.success("Signup successfully");
      //     toast("Please verify your email!", {
      //       icon: "👏",
      //     });
      //     router.push("/auth/login");

      const userResponse = await axios.post("/api/auth/coordinatorSignup", {

        user:signUpValues,
        coordinator:data,

      });


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
          className=" flex flex-col justify-center gap-5"
          onSubmit={submitHandler}
        >
          {/* dropdown for college */}
          <DropDown
            text="college"
            label="Select College:"
            name={Object.keys(COLLEGES)}
            onChange={handleChangeOfDropDown}
          ></DropDown>

          {/* deropdown for fields related to college */}
          <DropDown
            text="programe"
            label="Programe"
            name={Object.keys(PROGRAME)}
            onChange={handleChangeOfDropDown}
          ></DropDown>


          <Checkbox
          text="branch"
          label="Branch"
          name={PROGRAME[data.programe as keyof typeof PROGRAME]}
          onChange={handleChangeOfCheck}
          ></Checkbox>


          {/* button */}
          <div className="m-12 flex justify-center items-center">
            <CTCButton text={"Submit"} type={true} />
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
