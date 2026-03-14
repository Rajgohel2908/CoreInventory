import { NextResponse } from "next/server";
import { getClearAuthCookieConfig } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  const cookieConfig = getClearAuthCookieConfig();
  response.cookies.set(cookieConfig);
  return response;
}
