"use client";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { formatDate } from "@/helper/formatDate";

import StudentInfo from "@/components/student/StudentInfo";

import * as XLSX from 'xlsx';

const ApplicationPage = () => {

  const [studentData, setStudentData] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [individualUserData, setIndividualUserData] = useState<any>(null);

  const [click, setClick] = useState(false);

  const router = useRouter();

  async function fetchAllPendingLeaves() {
    setLoading(true);
    try {
      const res: any = await axios.get("/api/leave-form");
      setStudentData(res?.data?.data);
    } catch (error) {
      toast.error("Something went wrong, try again later");
      console.log("Error when try to fetch warden applications");
      setStudentData([]);
      router.push("/something-went-wrong");
    } finally {
      setLoading(false);
    }
  }

  function removeHandler(id: string) {

    const newData: any = studentData?.filter(
      (application: any) => application._id !== id
    );
    setStudentData(newData);

  }


  async function downloadExcel() {

    const worksheetData = studentData?.map((item: any) => ({

      Name: item?.user?.fullName,
      Email: item.user.email,
      ContactNo: item.user.contactNo,
      Address: item.user.address,
      Branch: item.user.refId.branch,
      EnrollmentNo: item.user.refId.enrollmentNo,
      FingerNo: item.user.refId.fingerNo,
      Hostel: item.user.refId.hostel,
      RoomNo: item.user.refId.roomNo,
      AddressDuringLeave: item.addressDuringLeave,
      DateFrom: formatDate(item.dateFrom),
      DateTo: formatDate(item.dateTo),
      ReasonForLeave: item.reasonForLeave,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
    

  }

  useEffect(() => {

    fetchAllPendingLeaves();

  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div className="flex justify-between items-center">
            <p className="text-4xl text-black font-semibold">

              Pending Applications

            </p>

            <button className="border rounded-md p-2 font-bold" onClick={downloadExcel}>Download PDF </button>

          </div>
          <div className="w-full mt-5 flex-col flex gap-5">
            {studentData &&
              (studentData.length > 0 ? (
                studentData?.map((leaveForm: any) => (

                  <div onClick={() => {
                    
                    setClick(true);
                    setIndividualUserData(leaveForm);

                  }}
                    key = {leaveForm.id}
                  >

                    <LeaveApprovalCard
                      removeHandler={removeHandler}
                      key={leaveForm._id}
                      userInfo={leaveForm}
                    />

                  </div>
                ))
              ) : (
                <NotFound />
              ))}
          </div>

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
                setClick={setClick}

              />

            </div>
          )}


        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
