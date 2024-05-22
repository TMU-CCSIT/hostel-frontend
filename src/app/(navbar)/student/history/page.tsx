"use client";
import Applications from "@/components/student/Application";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  
  const [data, setData] = useState<null | []>(null);

  async function fetchAllPendingLeaves() {
    try {
      const res: any = await axios.get("/api/leave-form");
      setData(res?.data?.data);

      console.log("mil gyaa");
    } catch (error) {
      console.log("Error when try to fetch faculty applications");
      setData(null);
    }
  }

  useEffect(() => {

    fetchAllPendingLeaves();

  }, []);
  return (
    <>
      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div>
            <span className="text-4xl text-black font-semibold">
              Your Applications
            </span>
          </div>
          <div className="w-full mt-5 flex-col flex gap-5">
            {data &&
              data?.map((leaveForm: any) => (
                <Applications key={leaveForm._id} userInfo={leaveForm} isStudent ={true}/>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;





