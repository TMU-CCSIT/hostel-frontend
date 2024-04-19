"use client";

import React from "react";
import CTCButton from "../common/CTCButton";
import Image from "next/image";
import Link from "next/link";
import { dateIntoReadableFormat } from "@/helper/date";

const LeaveApprovalCard = ({ userInfo }: any) => {
  const url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs7HxzKKvBIkjKHsnqkVp-9MXfpoxiNKx7v6x8ks1ToA&s";

  return (
    <>
      <div className="w-full font-medium px-5 flex lg:flex-row flex-col  text-black py-3 gap-2 lg:gap-40 bg-[#EDF6FF]">
        {/* for user details */}
        <div className="flex w-full items-center justify-between gap-10">
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
        <div className="w-full flex xs:flex-row flex-col pb-5 xs:mt-2 items-center justify-between gap-5 xs:gap-10">
          <div className="w-full flex justify-between">
            {/* date-from */}
            <div>
              <span>
                {" "}
                {dateIntoReadableFormat(userInfo.dateFrom) || "24/03"}
              </span>
            </div>

            {/* date-to */}
            <div>
              <span> {dateIntoReadableFormat(userInfo.dateTo) || "24/03"}</span>
            </div>
          </div>

          {/* button for approval */}
          <div className="flex w-full justify-center gap-10">
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
