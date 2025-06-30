import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongoose";
import UserModel from "@/models/UserModel";

export async function GET() {
  await dbConnect();

  const users = await UserModel.find({});
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  await dbConnect();

  const body = await req.json();

  const newUser = await UserModel.create(body);

  return NextResponse.json(newUser);
}
