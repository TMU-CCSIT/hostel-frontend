"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Application from "@/components/student/Application";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import StudentInfo from "@/components/student/StudentInfo";

import Loading from "@/app/loading";

const HistoryPage = () => {

  const [studentData, setStudentData] = useState<any[]>([]);

  const [individualUserData, setIndividualUserData] = useState<any>(null);

  const [click, setClick] = useState(false);

  const [loading, setLoading] = useState(false);

  async function gethostelWardenHistory() {

    try {

      setLoading(true);

      const response = await axios.get(`/api/Principal?action=gethostelWardenHistory`);
      console.log("Response data: ", response.data);

      setStudentData(response?.data?.data || []);

      setLoading(false);

    } catch (error: any) {

      console.error("Error fetching coordinator history:", error.message);
      
    }
  }

  useEffect(() => {

    gethostelWardenHistory();

  }, []);

  return (
    <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">

      {loading && <Loading />}

      <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
        <div className="flex w-full justify-between">
          {/* Heading */}
          <span className="text-4xl text-black font-semibold">
            All Applications
          </span>
          {/* Filter */}
          <div></div>
        </div>
        <div className="w-full mt-5 flex-col flex gap-5">
          {studentData.length > 0 ? (

            studentData.map((user) => (

              <div onClick={() => {

                setClick(true);
                setIndividualUserData(user);

              }}
              
                key = {user._id}
              >

                <Application userInfo={user} isStudent={false} key={user._id || user.id} />

              </div>

            ))

          ) : (
            <span>No applications found.</span>
          )}
        </div>

        <div className=' relative flex '>

          {click && individualUserData && (

            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">

              <StudentInfo

                dateFrom={individualUserData?.dateFrom}
                dateTo={individualUserData?.dateTo}
                email={individualUserData?.user?.email}
                contactNo={individualUserData?.user?.contactNo}
                reasonForLeave={individualUserData?.reasonForLeave}
                addressDuringLeave={individualUserData?.addressDuringLeave}
                name={individualUserData?.user?.fullName}
                userImage={individualUserData?.user?.profileImage}
                enrollmentNo={individualUserData?.user?.refId?.enrollmentNo}
                Branch={individualUserData?.user?.refId?.branch}
                College={individualUserData?.user?.refId?.college}
                Hostel={individualUserData?.user?.refId?.hostel}
                ParentNo={individualUserData?.user?.refId?.parentContactNo}
                parentName={individualUserData?.user?.refId?.parentName}
                status={individualUserData?.status?.coordinator}
                setClick={setClick}
              />

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default HistoryPage;




