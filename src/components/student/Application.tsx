"use client";

import Image from "next/image";
import Link from "next/link";
import { dateIntoReadableFormat } from "@/helper/date";
import CTCButton from "@/components/common/CTCButton";

import { TbLoader } from "react-icons/tb";

import { TiTick } from "react-icons/ti";

import { FaRegTimesCircle } from "react-icons/fa";

import { IoTime } from "react-icons/io5";

import { FaTimes } from "react-icons/fa";

import { dateDiffInDays } from "@/helper/diffDate";

import { userAtom } from "@/app/store/atoms/user";

import { useRecoilValue } from "recoil";


const Application = ({ userInfo, isStudent }: any) => {

  console.log("data is ", userInfo.status['coordinator']);

  const user: any = useRecoilValue(userAtom);

  console.log("user is ", user);

  let diffBwtDates: any = dateDiffInDays(dateIntoReadableFormat(userInfo.dateFrom), dateIntoReadableFormat(userInfo.dateTo));

  function checkStatus() {

    if (userInfo.status['hostelWarden'] === "Pending" || userInfo.status['coordinator'] === "Pending") {

      return "Pending";

    }
    else if (userInfo.status['hostelWarden'] === "Accepted" || userInfo.status['coordinator'] === "Accepted") {


      return "Accepted";

    } else {

      return "Rejected";
    }

  }


  return (
    <>
      <div className="w-full font-medium px-5 flex lg:flex-row flex-col  text-black py-3 gap-2 lg:gap-40 bg-[#EDF6FF]">

        {/* for user details */}
        <div className="w-full flex xs:flex-row flex-col pb-5 xs:mt-2 items-center justify-between gap-5 xs:gap-10 pr-3">


          {

            !isStudent &&

            <div className="flex flex-col gap-1">

              <div className="flex w-[60px] h-[60px] rounded-full p-1">

                <img src={userInfo?.user?.profileImage} alt="" className="w-full h-full bg-cover rounded-full" />

              </div>

              <p className="text-nowrap">{userInfo?.user?.fullName}</p>

            </div>

          }


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


            <div className="flex flex-col gap justify-center items-center">

              <p>{diffBwtDates} <span className="font-semibold">days </span></p>

            </div>

          </div>

          {

            isStudent && <div className="flex w-full justify-center gap-10">Status:  {checkStatus()}</div>

          }


          {

            isStudent && <div className=" flex gap-4">


              <abbr title="done from your side ">

                <div className="flex justify-center items-center rounded-full bg-green-500 p-1">

                  <TiTick className="text-white text-2xl" />

                </div>

              </abbr>

              {

                userInfo.status['coordinator'] === "Accepted" ? <abbr title="Accepeted bg coordinator ">

                  <div className="flex justify-center items-center rounded-full bg-green-500 p-1">

                    <TiTick className="text-white text-2xl" />

                  </div>

                </abbr> : (userInfo.status['coordinator'] === "Pending" ?

                  <abbr title="Pending from coordiantor ">

                    <div className="flex justify-center items-center bg-blue-500 rounded-full p-1">

                      <IoTime className="text-white text-2xl" />

                    </div>

                  </abbr>

                  : <abbr title="Rejected from coordinator ">

                    <div className="flex justify-center items-center rounded-full bg-red-500 p-1">

                      <FaTimes className="text-white text-2xl" />

                    </div>

                  </abbr>)


              }

              {

                userInfo.status['hostelWarden'] === "Accepted" ? <abbr title="Accepted by hostel warden ">

                  <div className="flex justify-center items-center rounded-full bg-green-500 p-1">

                    <TiTick className="text-white text-2xl" />

                  </div>

                </abbr> : (userInfo.status['hostelWarden'] === "Pending" ?

                  <abbr title="Pending by hostel warden">

                    <div className="flex justify-center items-center bg-blue-500 rounded-full p-1">

                      <IoTime className="text-white text-2xl" />

                    </div>

                  </abbr>

                  : <abbr title="Rejected  by hostel warden">

                    <div className="flex justify-center items-center bg-red-500 p-1">

                      <FaTimes className="text-white text-2xl" />

                    </div>

                  </abbr>)
              }

            </div>
          }


           {/*  here we need changes  */}

      <p className="text-sm text-nowrap"><span className="font-semibold"> status :</span> {userInfo?.status?.coordinator }</p>

          {/* <p className="text-sm">

            <span className="font-semibold">status :</span>

            {user?.role === 'coordinator'
              ? userInfo?.status?.coordinator
              : user?.role === 'hostelWarden'
                ? userInfo?.status?.hostelWarden
                : user?.role === 'principal'
                  ? userInfo?.status?.principal
                  : null
                  
            }

          </p> */}

        </div>

      </div>

    </>
  );
};

export default Application;




