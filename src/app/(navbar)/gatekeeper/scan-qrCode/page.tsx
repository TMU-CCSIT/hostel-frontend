"use client";
import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import axios from "axios";
import toast from "react-hot-toast";

async function updateStateOfStudent(qrCodeString: string) {
  try {
    const res = await axios.post("/api/leave-form", { qrCodeString });
    toast.success("QrCode Scanned Successfully");
  } catch (error) {
    toast.error("Something went wrong!");
  }
}

const Page = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen p-10">
      <div className="relative w-[500px] h-[500px]">
        <Scanner
          onResult={async (text) => {
            updateStateOfStudent(text);
          }}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  );
};

export default Page;
