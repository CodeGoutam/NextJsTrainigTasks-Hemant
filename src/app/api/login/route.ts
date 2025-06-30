import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { LoginUser } from "@/models/LoginUsersModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await LoginUser.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    user.lastLoginAt = new Date();
    await user.save();

    const cookie = await cookies();
    cookie.set("session", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ message: "Login successful", status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Login failed", details: error },
      { status: 500 }
    );
  }
}
