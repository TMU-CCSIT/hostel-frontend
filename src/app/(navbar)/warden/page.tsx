"use client";
import CTCButton from "@/components/common/CTCButton";
import { useRouter } from "next/navigation";

const WardenPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen w-full bg-[#fff] flex justify-center items-center">
        <div className="flex flex-col justify-center rounded-lg items-center   gap-8 p-10 bg-[#EDF6FF]">
          {/* for pending applications  */}
          <CTCButton
            onClickHandler={() => router.push("/warden/applications")}
            text="View Applications"
          />

          {/* view all applications */}
          <CTCButton
            onClickHandler={() => router.push("/warden/history")}
            text="View History"
          />

          {/* view stats */}
          <CTCButton
            onClickHandler={() => router.push("/warden/stats")}
            text="View Stats"
          />
        </div>
      </div>
    </>
  );
};

export default WardenPage;
