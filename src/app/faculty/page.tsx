"use client";
import LinkButton from "@/components/faculty/LinkButton";
import { useRouter } from "next/navigation";

const FacultyPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen w-full bg-[#fff] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center   gap-8 p-10 bg-[#EDF6FF]">
          {/* for pending applications  */}
          <LinkButton
            onClickHandler={() => router.push("/application")}
            text="View Applications"
          />

          {/* view all applications */}
          <LinkButton
            onClickHandler={() => router.push("/history")}
            text="View History"
          />

          {/* view stats */}
          <LinkButton
            onClickHandler={() => router.push("/stats")}
            text="View Stats"
          />
        </div>
      </div>
    </>
  );
};

export default FacultyPage;
