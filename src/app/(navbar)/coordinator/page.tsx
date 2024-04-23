"use client";
import CTCButton from "@/components/common/CTCButton";
import { useRouter } from "next/navigation";

const FacultyPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen w-full bg-[#fff] flex justify-center items-center">
        <div className="flex flex-col justify-center rounded-lg items-center   gap-8 p-10 bg-[#EDF6FF]">
          {/* for pending applications  */}
          <CTCButton
            onClickHandler={() => router.push("/coordinator/applications")}
            text="View Applications"
          />

          {/* view all applications */}
          <CTCButton
            onClickHandler={() => router.push("/coordinator/history")}
            text="View History"
          />

          {/* view stats */}
          <CTCButton
            onClickHandler={() => router.push("/coordinator/stats")}
            text="View Stats"
          />
        </div>
      </div>
    </>
  );
};

export default FacultyPage;
