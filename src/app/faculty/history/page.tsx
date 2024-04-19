import React from "react";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";

const HistoryPage = () => {
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
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div className="flex w-full justify-between">
            {/* heading */}
            <span className="text-4xl text-black font-semibold">
              All Applications
            </span>

            {/* filter */}
            <div></div>
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

export default HistoryPage;
