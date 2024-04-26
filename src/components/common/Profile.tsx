"use client";

import React, { useState } from "react";
import Image from "next/image";

import { useEffect } from "react";

import axios from "axios";

import Password from "./Password";

const ProfilePage = () => {
  const [data, setData] = useState<any>(null);

  let array = [
    "_id",
    "password",
    "user",
    "updatedAt",
    "createdAt",
    "__v",
    "isVerified",
  ];

  let [userImage, setUserImage] = useState("");

  async function userDetails() {
    try {
      let response: any = await axios.get("/api/auth/studentSignup");
      // setData(response?.data?.data?.studentDetails);
      //studentDetails,userDetails

      setUserImage(response?.data?.data?.userDetails?.profileImage);

      setData([
        response?.data?.data?.studentDetails,
        response?.data?.data?.userDetails,
      ]);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <div className="container mx-auto px-4 py-2 ">
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-14 flex justify-center underline sm:text-4xl">
          PROFILE INFORMATION
        </h2>
        <div className="flex justify-center items-center">
          <div className="flex-shrink-0">
            <Image
              className="rounded-lg shadow-2xl w-[10rem] h-[10rem]"
              src={userImage}
              alt="Profile Picture"
              width={96}
              height={96}
            />
          </div>
        </div>
        <div className="sm:m-14 m-1 sm:mt-1 bg-[#437FC7] rounded-3xl shadow-2xl p-11">
          {/* content */}
          <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 gap-16">
            {
              // data && Object.entries(data)?.map(([key, value]) => (

              //   <div key={key} className="mb-4">

              //     <p className="text-[#EDF6FF] font-bold">{key}</p>

              //     <p className="font-bold text-xl">{value}</p>

              //   </div>
              // ))

              data &&
                data?.map((item: any, index: any) => (
                  <div key={index} className="mb-4">
                    <p className="text-[#EDF6FF] font-bold">
                      {index === 0 ? "Student Details" : "User Details"}
                    </p>
                    {Object.entries(item)?.map(
                      ([key, value]: any) =>
                        !array.includes(key) && (
                          <div key={key} className="mb-4">
                            <p className="text-[#EDF6FF]">{key}</p>
                            <p className="font-bold text-xl">{value}</p>
                          </div>
                        )
                    )}
                  </div>
                ))
            }

            <Password />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
