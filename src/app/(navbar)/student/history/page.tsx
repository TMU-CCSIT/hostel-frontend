"use client";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="relative w-[1200px] min-h-screen m-auto flex flex-col gap-3">
        <h1 className="text-black text-3xl font-semibold pt">Your History</h1>

        <div className="relative w-full h-full bg-[#EDF6FF] rounded-md shadow-md p-3">
          <div className="flex justify-between">
            <div className="flex gap-10">
              <div className="flex gap-2">
                <div className="w-[30px] relative h-[30px] rounded-full">
                  <Image src="" alt="" className="w-full h-full rounded-full" />
                </div>
                <div>
                  <h1 className="text-black font-semibold">Adarsh jain</h1>
                  <p className="text-black text-xs font-semibold">Tca2159055</p>
                </div>
              </div>
              <p className="text-black">20/1/2024</p>
              <p className="text-black">20/1/2024</p>
              <p className="text-black">Approved</p>
            </div>
            <div className="flex gap-3">
              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>

              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>

              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>

              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>

              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>

              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="11" />
                <path
                  d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                  fill="none"
                />
              </svg>
              <svg
                className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Circle background */}
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  fill="red"
                  stroke="red"
                  strokeWidth="2"
                />
                {/* Cross */}
                <path d="M8 8l8 8m0-8l-8 8" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>
          <p className="text-black">20/1/2024</p>
          <p className="text-black">20/1/2024</p>
          <p className="text-black">Approved</p>
        </div>

        <div className="relative w-full h-full bg-[#EDF6FF] rounded-md shadow-md p-3">
          <div className="flex justify-between">
            <div className="flex gap-10">
              <div className="flex gap-2">
                <div className="w-[30px] relative h-[30px] rounded-full">
                  <Image
                    fill
                    src=""
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-black font-semibold">Adarsh jain</h1>
                  <p className="text-black text-xs font-semibold">Tca2159055</p>
                </div>
              </div>
              <p className="text-black">20/1/2024</p>
              <p className="text-black">20/1/2024</p>
              <p className="text-black">Approved</p>
            </div>
            <div className="flex gap-3">
              <div className="bg-black rounded-full w-[30px] h-[30px]"></div>
              <div className="bg-black rounded-full w-[30px] h-[30px]"></div>
              <div className="bg-black rounded-full w-[30px] h-[30px]"></div>
              <div className="bg-black rounded-full w-[30px] h-[30px]"></div>
              <div className="bg-black rounded-full w-[30px] h-[30px]"></div>
            </div>
          </div>
          <p className="text-black">20/1/2024</p>
          <p className="text-black">20/1/2024</p>
          <p className="text-black">Approved</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
