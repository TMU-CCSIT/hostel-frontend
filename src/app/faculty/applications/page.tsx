"use client";

import React from "react";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import { exportToExcel } from "@/helper/exportToExcel";

const data = [
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
  {
    userName: "",
    enrollment: "",
    id: "",
    profileImage: "",
  },
];

const ApplicationPage = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <button
          className="bg-black text-white"
          onClick={() => exportToExcel(data)}
        >
          Download
        </button>
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div>
            <span className="text-4xl text-black font-semibold">
              Pending Applications
            </span>
          </div>
          <div className="w-full mt-5 flex-col flex gap-5">
            {data.map((user) => (
              <LeaveApprovalCard key={user.id} userInfo={user} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
