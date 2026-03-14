import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

let client: twilio.Twilio | null = null;

function getClient(): twilio.Twilio {
  if (!accountSid || !authToken) {
    throw new Error("Twilio credentials not configured. Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN.");
  }
  if (!client) {
    client = twilio(accountSid, authToken);
  }
  return client;
}

/**
 * Send OTP verification code via Twilio Verify
 * @param phoneOrEmail - Phone number (E.164 format) or email
 * @param channel - "sms" | "email" | "call"
 */
export async function sendOTP(
  phoneOrEmail: string,
  channel: "sms" | "email" | "call" = "sms"
): Promise<{ success: boolean; sid?: string; error?: string }> {
  try {
    if (!verifySid) throw new Error("TWILIO_VERIFY_SID not set");
    const twilioClient = getClient();

    const verification = await twilioClient.verify.v2
      .services(verifySid)
      .verifications.create({
        to: phoneOrEmail,
        channel,
      });

    return { success: true, sid: verification.sid };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Twilio sendOTP error:", message);
    return { success: false, error: message };
  }
}

/**
 * Verify an OTP code via Twilio Verify
 * @param phoneOrEmail - Phone number or email used during send
 * @param code - The 6-digit code entered by user
 */
export async function verifyOTP(
  phoneOrEmail: string,
  code: string
): Promise<{ success: boolean; valid: boolean; error?: string }> {
  try {
    if (!verifySid) throw new Error("TWILIO_VERIFY_SID not set");
    const twilioClient = getClient();

    const check = await twilioClient.verify.v2
      .services(verifySid)
      .verificationChecks.create({
        to: phoneOrEmail,
        code,
      });

    return { success: true, valid: check.status === "approved" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Twilio verifyOTP error:", message);
    return { success: false, valid: false, error: message };
  }
}
