"use server";
import { cookies } from "next/headers";
import { authKey } from "@/constants/authKey";
import { redirect } from "next/navigation";

const setAccessToken = (token: string, option?: any) => {
  if (token) {
    cookies().set({
      name: authKey,
      value: token,
    });

    if (option && option.redirect) {
      redirect(option.redirect);
    }
  }
};

export default setAccessToken;
