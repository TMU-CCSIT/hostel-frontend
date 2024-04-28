"use client";

// importing necessities
import React, { useEffect, useState } from "react";
import CTCButton from "../common/CTCButton";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import DropDown from "../common/DropDown";
import { HOSTEL } from "@/constants/constant";
import Loading from "../common/Loading";

// interface
interface FormData {
  hostel: string;
}

const Signup = () => {
  // hooks for reading different values

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<FormData>({
    hostel: HOSTEL[0],
  });

  // function for data matching
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  // dummy function to pass

  async function submitHandler(e: any) {
    setLoading(true);
    try {
      e.preventDefault();
      const userResponse = await axios.post("/api/auth/wardenSignup", {
        hostel: data.hostel,
      });
      toast.success("Signup successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    // main div
    <>
      {loading && <Loading />}

      <div className="bg-white min-h-screen text-black text-lg flex justify-center items-center p-10">
        {/* inner div */}
        <div className="bg-[#EDF6FF] flex flex-col p-8 rounded-md shadow-xl justify-center items-center gap-4 ">
          {/* heading */}
          <h1 className="text-2xl font-bold">WARDEN SIGN UP</h1>

          {/* form */}
          <form
            className=" flex flex-col justify-center items-center"
            onSubmit={submitHandler}
          >
            {/* dropdown for hostel */}
            <DropDown
              text="hostel"
              label="Select Hostel:"
              name={HOSTEL}
              onChange={handleChange}
            ></DropDown>

            {/* button */}
            <div className="m-12">
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
    </>
  );
};

export default Signup;
