"use server";

import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongoose";
import { LoginUser } from "@/models/LoginUsersModel";

export const loginAction = async (formData: FormData) => {
  await dbConnect();

  const email = formData.get("email")?.toString()!;
  const password = formData.get("password")?.toString()!;

  const user = await LoginUser.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new Error("Invalid email or password");
  }

  user.lastLoginAt = new Date();
  await user.save();

  cookies().set("session", user._id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return { status: 200, userId: user._id.toString() };
};
