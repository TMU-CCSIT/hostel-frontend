"use client";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StudentInfo from "@/components/student/StudentInfo";

const ApplicationPage = () => {

  const [data, setData] = useState<null | []>(null);
  const [loading, setLoading] = useState(false);

  const [click, setClick] = useState(false);

  const router = useRouter();

  async function fetchAllPendingLeaves() {
    setLoading(true);
    try {
      const res: any = await axios.get("/api/leave-form");
      setData(res?.data?.data);
    } catch (error) {
      toast.error("Something went wrong, try again later");
      console.log("Error when try to fetch coordinator applications");
      setData(null);
      router.push("/something-went-wrong");
    } finally {
      setLoading(false);
    }
  }

  function removeHandler(id: string) {
    const newData: any = data?.filter(
      (application: any) => application._id !== id
    );
    setData(newData);
  }

  async function fetchStudentData(userId: string) {

    try {

      const response = await axios.get("/api/student") // 


    } catch (error: any) {

      console.log(error.message);

    }
  }

  useEffect(() => {

    fetchAllPendingLeaves();
    
  }, []);

  return (
    <>
      {loading && <Loading />}

      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div>
            <span className="text-4xl text-black font-semibold">
              Pending Applications
            </span>
          </div>
          <div className="w-full mt-5 flex-col flex gap-5">
            {data &&
              (data.length > 0 ? (
                data?.map((leaveForm: any) => (
                  <LeaveApprovalCard
                    removeHandler={removeHandler}
                    key={leaveForm._id}
                    userInfo={leaveForm}
                  />
                ))
              ) : (
                <NotFound />
              ))}
          </div>

          <div>


            {


              <div className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 ${click ? 'block' : 'hidden'}`}>

                <StudentInfo name="Adarsh jain " enrollmentNo="enrollmentNo" Branch="branch" College="college" Hostel="boys" ParentNo="dlkjd" parentName="jnd" setClick={setClick} />
                
              </div>

            }

          </div>


        </div>
      </div>

    </>
  );
};

export default ApplicationPage;


