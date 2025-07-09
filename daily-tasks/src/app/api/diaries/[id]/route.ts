import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoose";
import { Diary } from "@/models/DiaryModel";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const diary = await Diary.findById(params.id);
  if (!diary) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(diary);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const session = cookies().get("session")?.value;
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const updates = await req.json();

  const diary = await Diary.findOneAndUpdate(
    { _id: params.id, authorId: session },
    updates,
    { new: true }
  );

  if (!diary)
    return NextResponse.json(
      { error: "Not found or forbidden" },
      { status: 404 }
    );

  return NextResponse.json(diary);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const session = cookies().get("session")?.value;

  const diary = await Diary.findOneAndDelete({
    _id: params.id,
    authorId: session,
  });
  if (!diary)
    return NextResponse.json(
      { error: "Not found or forbidden" },
      { status: 404 }
    );

  return NextResponse.json({ message: "Deleted successfully" });
}
