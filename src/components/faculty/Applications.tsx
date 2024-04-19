import React from "react";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";

const Applications = () => {
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
  ];
  return (
    <>
      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <div className="w-11/12 mt-5 flex-col flex gap-2">
          {data.map((user) => (
            <LeaveApprovalCard key={user.id} userInfo={user} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Applications;
