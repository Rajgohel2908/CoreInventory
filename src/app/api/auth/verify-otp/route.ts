import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import OtpToken from "@/models/OtpToken";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const token = await OtpToken.findOne({
      email: email.toLowerCase(),
      otp,
      purpose: "PASSWORD_RESET",
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    // Mark as verified
    token.verified = true;
    await token.save();

    return NextResponse.json({ success: true, message: "OTP verified" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
