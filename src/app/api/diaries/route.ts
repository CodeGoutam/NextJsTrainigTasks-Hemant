import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { Diary } from "@/models/DiaryModel";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  await dbConnect();
  const session = cookies().get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  try {
    const newDiary = await Diary.create({ ...body, authorId: session });
    return NextResponse.json(newDiary, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create diary" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  const session = cookies().get("session")?.value;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const diaries = await Diary.find({ authorId: session });
  return NextResponse.json(diaries);
}
