"use server";

import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongoose";
import { LoginUser } from "@/models/LoginUsersModel";
import bcrypt from "bcrypt";

export const signupAction = async (formData: FormData) => {
  await dbConnect();

  const name = formData.get("name")?.toString()!;
  const username = formData.get("username")?.toString()!;
  const email = formData.get("email")?.toString()!;
  const mobileNumber = formData.get("mobileNumber")?.toString()!;
  const password = formData.get("password")?.toString()!;

  const userExists = await LoginUser.findOne({
    $or: [{ email }, { username }, { mobileNumber }],
  });

  if (userExists) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await LoginUser.create({
    name,
    username,
    email,
    mobileNumber,
    passwordHash,
  });

  cookies().set("session", user._id.toString(), {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { status: 200, userId: user._id };
};
