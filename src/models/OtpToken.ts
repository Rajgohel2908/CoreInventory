import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOtpToken extends Document {
  email: string;
  otp: string;
  purpose: "PASSWORD_RESET" | "EMAIL_VERIFY";
  expiresAt: Date;
  verified: boolean;
  createdAt: Date;
}

const OtpTokenSchema = new Schema<IOtpToken>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    otp: { type: String, required: true },
    purpose: {
      type: String,
      enum: ["PASSWORD_RESET", "EMAIL_VERIFY"],
      required: true,
    },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-delete expired tokens
OtpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpToken: Model<IOtpToken> =
  mongoose.models.OtpToken || mongoose.model<IOtpToken>("OtpToken", OtpTokenSchema);

export default OtpToken;
