"use client";

import Navbar from "@/components/common/Navbar";
<<<<<<< HEAD

export default function Home() {
  // async function userDetails() {
  //   try {
  //     let response = await axios.get("/api/auth/studentSignup");
  //     console.log("user details ", response.data);
  //   } catch (error:any) {
  //     console.log(error.message);
  //   }
  // }
=======
import { useEffect } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";

export default function Home() {
  const setUser = useSetRecoilState(userAtom);
  async function userDetails() {
    try {
      let response = await axios.get("/api/auth/user");
      setUser(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  }
>>>>>>> 601ab0f094f5606f11240f0c4dc1dfacbb514f10

  // useEffect(() => {
  //   userDetails();
  // }, []);

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center text-black items-start bg-[#fff]">
        <div className="w-10/12 flex justify-center items-center text-4xl font-semibold flex-col text-black min-h-screen">
          <h2>Heyy</h2>
          <p>This is home page</p>
        </div>
      </div>
    </>
  );
}


