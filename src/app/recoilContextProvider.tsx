"use client";

import axios from "axios";
import { useEffect } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { userAtom } from "./store/atoms/user";

export default function RecoidContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useSetRecoilState(userAtom);
  const getData = async () => {
    try {
      const response = await axios.get("/api/auth/user");
      console.log("response: ", response.data.data);
      setUser(response?.data?.data);
    } catch (error: any) {
      console.log(
        "Error when try to fetch user in RecoidContextProvider:  ",
        error.message
      );
      setUser(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <RecoilRoot>{children}</RecoilRoot>;
}
