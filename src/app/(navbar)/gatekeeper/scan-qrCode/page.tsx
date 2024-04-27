"use client";
import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const Page = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen p-10">
      <div className="relative w-[500px] h-[500px]">
        <Scanner
          onResult={(text, result) => console.log(text, result)}
          onError={(error) => console.log(error?.message)}
        />
      </div>
    </div>
  );
};

export default Page;
