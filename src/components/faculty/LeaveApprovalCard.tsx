"use client";
import React from "react";
import CTCButton from "../common/CTCButton";
import Image from "next/image";
import Link from "next/link";

const LeaveApprovalCard = ({ userInfo }: any) => {
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs7HxzKKvBIkjKHsnqkVp-9MXfpoxiNKx7v6x8ks1ToA&s";

  return (
    <>
      <div className="w-full font-medium px-5 flex  text-black py-3 gap-40 bg-[#EDF6FF]">
        {/* for user details */}
        <div className="flex w-full justify-between">
          {/* profileImage | username */}
          <div className="flex justify-start items-center gap-5">
            {/* profileImage */}
            <>
              <span className=" w-14 h-14 relative overflow-hidden rounded-full shrink-0 bg-white/[0.2] ">
                <Image
                  alt="channel"
                  loading="lazy"
                  fill
                  src={userInfo.profileImage || url}
                />
              </span>
            </>

            {/* username | rollno */}
            <div className="flex flex-col justify-start items-start">
              <Link href={`/profile/${userInfo.id}`}>
                <span className="hover:underline hover:text-[red] transition-all duration-300 ease-in-out">
                  {userInfo.name || "Name"}
                </span>
              </Link>
              <span>{userInfo.name || "Enrollment no."}</span>
            </div>
          </div>

          {/* course */}
          <div>
            <span>{userInfo.course || "course"} </span>
          </div>
        </div>

        {/* leave details */}
        <div className="w-full flex justify-between">
          {/* date-from */}
          <div>
            <span> {userInfo.dateFrom || "24/03"}</span>
          </div>

          {/* date-to */}
          <div>
            <span> {userInfo.dateTo || "24/03"}</span>
          </div>

          {/* button for approval */}
          <div className="flex mt-2 gap-5">
            {/* yes */}
            <div>
              <CTCButton
                text={"Yes"}
                onClickHandler={() => {
                  console.log("Yes approved");
                }}
              />
            </div>

            {/* no */}
            <div>
              <CTCButton
                text={"No"}
                onClickHandler={() => {
                  console.log("Not approved");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveApprovalCard;
