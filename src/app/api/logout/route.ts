import { NextResponse } from "next/server";

export async function POST() {
  console.log("logout called");

  const response = NextResponse.json({ message: "Logged out successfully" });

  response.headers.set(
    "Set-Cookie",
    `session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure=${
      process.env.NODE_ENV === "production"
    }`
  );

  return response;
}
