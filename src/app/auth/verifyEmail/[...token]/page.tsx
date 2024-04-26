// "use client";

// import React, { useEffect } from "react";

// import { TbMailPin } from "react-icons/tb";

// import axios from "axios";

// import { useRouter } from "next/navigation";

// export default function EmailVerification() {
//   let token: any;

//   const router = useRouter();

//   async function verifyYourEMail() {
//     try {
//       let resposne = await axios.post("/api/auth/emailEmail", token);
//     } catch (error: any) {
//       console.log(error.message);
//     }
//   }

//   useEffect(() => {
//     token = window.location.pathname
//       .split("/")
//       [window.location.pathname.split("/").length - 1].split("=")[1];

//     console.log("token value is ", token);
//   }, []);

//   return (
//     <div className="flex justify-center items-center bg-white min-h-screen w-full">
//       <div className=" relative w-[450px] h-[270px] gap-3  bg-[#6DAFFE] flex flex-col justify-center items-center rounded-lg shadow-2xl">
//         {/* icon */}

//         <div>
//           <TbMailPin className="text-white text-3xl"></TbMailPin>
//         </div>

//         <h1 className="text-white text-2xl font-semibold capitalize">
//           Verify Your Email
//         </h1>

//         <p className="text-sm text-white w-[300px] text-center">
//           click below to verify your gamil acccount{" "}
//         </p>

//         <button className=" text-white text-xs mt-3 font-bold border pl-5 pr-5 rounded-md bg-slate-700/90 p-2">
//           VerifyEmail
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div></div>;
};

export default page;
