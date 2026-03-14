import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM || "CoreInventory <noreply@coreinventory.com>";

/**
 * Send password-reset OTP email
 */
export async function sendResetPasswordEmail(
  to: string,
  otp: string,
  name: string
): Promise<void> {
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: "CoreInventory — Password Reset OTP",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #2563eb, #1d4ed8); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: #fff; font-weight: 700; font-size: 18px;">CI</span>
          </div>
        </div>
        <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #0f172a;">Password Reset</h2>
        <p style="margin: 0 0 24px; color: #64748b; font-size: 14px;">Hi ${name}, use the OTP below to reset your password. This code expires in 10 minutes.</p>
        <div style="background: #f1f5f9; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #0f172a; font-family: monospace;">${otp}</span>
        </div>
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">If you didn't request this reset, you can safely ignore this email.</p>
      </div>
    `,
  });
}

/**
 * Send welcome email on signup
 */
export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  await transporter.sendMail({
    from: FROM_EMAIL,
    to,
    subject: "Welcome to CoreInventory!",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="margin: 0 0 8px; font-size: 22px; font-weight: 700; color: #0f172a;">Welcome, ${name}! 🎉</h2>
        <p style="margin: 0 0 16px; color: #64748b; font-size: 14px;">Your CoreInventory account has been created. You can now log in and start managing your inventory.</p>
        <p style="margin: 0; color: #94a3b8; font-size: 12px;">— The CoreInventory Team</p>
      </div>
    `,
  });
}
