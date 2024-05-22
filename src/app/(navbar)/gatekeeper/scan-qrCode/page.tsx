"use client";
import React, { useState } from "react";
// import { Scanner } from "@yudiel/react-qr-scanner";
// import axios from "axios";
// import toast from "react-hot-toast";
// import Loading from "@/components/common/Loading";

const Page = () => {
  // const [loading, setLoading] = useState(false);

  // async function updateStateOfStudent(qrCodeString: string) {
  //   try {
  //     const res = await axios.put("/api/leave-form", { qrCodeString });
  //     toast.success(res.data.message || "QrCode Scanned Successfully");
  //   } catch (error: any) {
  //     toast.error(error.response.data.message || "Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  return (
    <>
      {/* {loading && <Loading />}
      <div className="flex justify-center items-center w-full h-screen p-10">
        <div className="relative w-[500px] h-[500px]">
          <Scanner
            onResult={async (text) => {
              setLoading(true);
              updateStateOfStudent(text);
            }}
            onError={(error) => console.log("Scanning Error: ", error?.message)}
          />
        </div>
      </div> */}
    </>
  );
};

export default Page;
