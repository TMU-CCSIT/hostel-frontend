"use client";
import React from "react";
import CTAButton from "@/components/common/CTCButton";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen -w-full flex-col gap-5">
      <p>GATE-KEEPER</p>
      <CTAButton
        onClickHandler={() => {
          router.push("/gatekeeper/scan-qrCode");
        }}
        text="Scan Qr Code"
      />
    </div>
  );
};

export default Page;
