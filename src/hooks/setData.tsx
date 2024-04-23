"use client";
import { userAtom } from "@/app/store/atoms/user";
import { useSetRecoilState } from "recoil";

function useSetDataHook(data: any) {
  const setUser = useSetRecoilState(userAtom);
  setUser(data);
  return null;
}

export default useSetDataHook;
