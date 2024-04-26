"use client";

import Image from "next/image";
import Link from "next/link";
import { dateIntoReadableFormat } from "@/helper/date";
import CTCButton from "@/components/common/CTCButton";

const Application = ({ userInfo }: any) => {
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
                  src={userInfo?.user?.profileImage || ""}
                />
              </span>
            </>

            {/* username | rollno */}
            <div className="flex flex-col justify-start items-start">
              <Link href={`/profile/${userInfo.user?._id}`}>
                <span className="hover:underline hover:text-[red] transition-all duration-300 ease-in-out">
                  {userInfo?.user?.fullName || "Name"}
                </span>
              </Link>
              <span>{userInfo.user?.enrollmentNo || "Enrollment no."}</span>
            </div>
          </div>

          {/* course */}
          <div>
            <span>{userInfo.user?.course || "course"} </span>
          </div>
        </div>

        {/* leave details */}
        <div className="w-full flex xs:flex-row flex-col pb-5 xs:mt-2 items-center justify-between gap-5 xs:gap-10">
          <div className="w-full gap-5 flex justify-between">
            {/* date-from */}
            <div>
              <span>
                {dateIntoReadableFormat(userInfo.dateFrom) || "24/03"}
              </span>
            </div>

            {/* date-to */}
            <div>
              <span> {dateIntoReadableFormat(userInfo.dateTo) || "24/03"}</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex w-full justify-center gap-10">Status</div>
        </div>
      </div>
    </>
  );
};

export default Application;
