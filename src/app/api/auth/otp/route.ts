import { NextRequest, NextResponse } from "next/server";
import { sendOTP, verifyOTP } from "@/lib/twilio";

/**
 * POST /api/auth/otp
 * Send or verify OTP via Twilio
 * 
 * Body: { action: "send" | "verify", phone: string, code?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { action, phone, code } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required (E.164 format)" },
        { status: 400 }
      );
    }

    if (action === "send") {
      if (process.env.NODE_ENV === "development") {
        return NextResponse.json({
          success: true,
          message: "OTP send bypassed in Dev mode",
        });
      }

      const result = await sendOTP(phone, "sms");
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Failed to send OTP" },
          { status: 500 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully",
      });
    }

    if (action === "verify") {
      if (!code) {
        return NextResponse.json(
          { error: "OTP code is required" },
          { status: 400 }
        );
      }

      const result = await verifyOTP(phone, code);
      const isDevBypass = process.env.NODE_ENV === "development" && code === "123456";

      if (!(result.success && result.valid) && !isDevBypass) {
        return NextResponse.json(
          { error: "Invalid OTP code" },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        valid: true,
        message: isDevBypass ? "Phone verified via Dev-Bypass" : "Phone verified successfully",
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "send" or "verify"' },
      { status: 400 }
    );
  } catch (error) {
    console.error("OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
