// src/actions/auth.ts
"use server";

import { redirect } from "next/navigation";
import axios from "axios";
import { cookies } from "next/headers";

export async function loginAction(email: string, password: string) {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });
    const token = (
      res.headers["set-cookie"]
        ? res.headers["set-cookie"][0].split(";")[0].split("=")[1]
        : null
    ) as string;
    const cookie = await cookies();
    cookie.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(token, "I am login response");
    return res.data;
  } catch (error) {}

  // 1. Validate credentials with your DB
  // 2. Set a cookie/session
}
