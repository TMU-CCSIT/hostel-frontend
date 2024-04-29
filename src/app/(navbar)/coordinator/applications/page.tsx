"use client";
import Loading from "@/components/common/Loading";
import NotFound from "@/components/common/NotFound";
import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ApplicationPage = () => {
  const [data, setData] = useState<null | []>(null);
  const [loading, setLoading] = useState(false);

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
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
