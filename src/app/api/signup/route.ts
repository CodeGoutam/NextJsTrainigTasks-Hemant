import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongoose";
import { LoginUser } from "@/models/LoginUsersModel";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { name, username, email, mobileNumber, password } = body;

    if (!name || !username || !email || !mobileNumber || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userExists = await LoginUser.findOne({
      $or: [{ email }, { username }, { mobileNumber }],
    });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new LoginUser({
      name,
      username,
      email,
      mobileNumber,
      passwordHash,
    });

    await user.save();

    const res = NextResponse.json({
      message: "User created",
      status: 200,
      user: { email: user.email, username: user.username },
    });

    res.cookies.set("session", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Signup failed", details: error },
      { status: 500 }
    );
  }
}
