import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center">
      <span className="text-black flex flex-col justify-start items-center gap-2">
        <p className="text-4xl font-bold">Some Went Wrong</p>
        <p className="text-xl font-semibold">
          Please Check Your Internet Connection
        </p>
      </span>
    </div>
  );
};

export default Page;
