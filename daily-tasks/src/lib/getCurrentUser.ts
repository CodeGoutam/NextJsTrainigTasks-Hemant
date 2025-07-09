import { cookies } from "next/headers";
import { dbConnect } from "./mongoose";
import { LoginUser } from "@/models/LoginUsersModel";

export async function getCurrentUser() {
  await dbConnect();

  const cookieStore = cookies();

  const session = (await cookieStore).get("session")?.value;
  if (!session) return null;

  const user = await LoginUser.findById(session).select("-passwordHash");
  return user;
}
