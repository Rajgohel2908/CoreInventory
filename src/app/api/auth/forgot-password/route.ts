import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import OtpToken from "@/models/OtpToken";
import { sendResetPasswordEmail } from "@/lib/mailer";

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true, message: "If that email exists, an OTP has been sent." });
    }

    // Generate 6-digit OTP
    const otp = generateOTP();

    // Delete any existing OTPs for this email/purpose
    await OtpToken.deleteMany({ email: user.email, purpose: "PASSWORD_RESET" });

    // Create new OTP token (expires in 10 minutes)
    await OtpToken.create({
      email: user.email,
      otp,
      purpose: "PASSWORD_RESET",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send email via Nodemailer
    try {
      await sendResetPasswordEmail(user.email, otp, user.name);
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Don't fail the request — OTP is stored for dev testing
    }

    return NextResponse.json({
      success: true,
      message: "If that email exists, an OTP has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
