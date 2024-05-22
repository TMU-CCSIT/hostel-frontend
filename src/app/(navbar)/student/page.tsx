"use client";
import CTCButton from "@/components/common/CTCButton";
import { useRouter } from "next/navigation";

const StudentPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen w-full bg-[#fff] flex justify-center items-center">
        <div className="flex flex-col justify-center rounded-lg items-center   gap-8 p-10 bg-[#EDF6FF]">
          {/* for pending applications  */}
          <CTCButton
            onClickHandler={() => router.push("/student/leave-form")}
            text="Leave form"
          />

          {/* view all applications */}
          <CTCButton
            onClickHandler={() => router.push("/student/history")}
            text="View History"
          />

          {/* view qr code */}
          <CTCButton
            onClickHandler={() => router.push("/student/qr-code")}
            text="View Qrcode"
          />
        </div>
      </div>
    </>
  );
};

export default StudentPage;
