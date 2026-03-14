"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowLeft, Loader2, Check, KeyRound } from "lucide-react";

type Step = 1 | 2 | 3;

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email"); return; }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setResendTimer(60);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) { setError("Please enter the complete code"); return; }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) { setError("Please fill in all fields"); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }
    if (newPassword.length < 8) { setError("Password must be at least 8 characters"); return; }
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join(""), newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => { window.location.href = "/login"; }, 2000);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-background)" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: "center" }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-success-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Check size={40} color="var(--color-success)" />
          </motion.div>
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Password Reset!</h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>Redirecting you to login...</p>
        </motion.div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px 10px 40px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-border)",
    fontSize: "14px",
    color: "var(--color-text-primary)",
    background: "var(--color-surface)",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color var(--duration-micro) ease, box-shadow var(--duration-micro) ease",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-background)", padding: "24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: "420px", background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "40px", boxShadow: "var(--shadow-lg)" }}
      >
        {/* Back link */}
        <Link href="/login" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--color-text-muted)", textDecoration: "none", marginBottom: "24px", transition: "color var(--duration-micro) ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}>
          <ArrowLeft size={14} /> Back to login
        </Link>

        {/* Step Indicator */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{
              flex: 1, height: "4px", borderRadius: "2px",
              background: s <= step ? "var(--color-primary)" : "var(--color-border)",
              transition: "background var(--duration-normal) ease",
            }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Email */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Mail size={24} color="var(--color-primary)" />
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Reset your password</h2>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>Enter the email associated with your account</p>
              {error && <div className="animate-shake" style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--color-error-light)", color: "var(--color-error-text)", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}
              <form onSubmit={handleEmailSubmit}>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" style={inputStyle} />
                </div>
                <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.97 }} style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit" }}>
                  {isLoading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <KeyRound size={24} color="var(--color-primary)" />
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Enter verification code</h2>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>We sent a 6-digit code to <strong>{email}</strong></p>
              {error && <div className="animate-shake" style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--color-error-light)", color: "var(--color-error-text)", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}
              <form onSubmit={handleOtpSubmit}>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "20px" }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      style={{
                        width: "48px", height: "56px", textAlign: "center", fontSize: "20px", fontWeight: 600,
                        borderRadius: "var(--radius-lg)", border: `2px solid ${digit ? "var(--color-primary)" : "var(--color-border)"}`,
                        background: "var(--color-surface)", outline: "none", fontFamily: "var(--font-geist-mono)",
                        transition: "border-color var(--duration-micro) ease",
                      }}
                    />
                  ))}
                </div>
                <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.97 }} style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit" }}>
                  {isLoading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
                  {isLoading ? "Verifying..." : "Verify Code"}
                </motion.button>
              </form>
              <p style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                {resendTimer > 0 ? (
                  <span>Resend code in <strong>{resendTimer}s</strong></span>
                ) : (
                  <button onClick={() => { setResendTimer(60); }} style={{ background: "none", border: "none", color: "var(--color-primary)", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Resend code</button>
                )}
              </p>
            </motion.div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <Lock size={24} color="var(--color-primary)" />
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Set new password</h2>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>Choose a strong password for your account</p>
              {error && <div className="animate-shake" style={{ padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--color-error-light)", color: "var(--color-error-text)", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}
              <form onSubmit={handlePasswordSubmit}>
                <div style={{ position: "relative", marginBottom: "16px" }}>
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" style={inputStyle} />
                </div>
                <div style={{ position: "relative", marginBottom: "20px" }}>
                  <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" style={inputStyle} />
                </div>
                <motion.button type="submit" disabled={isLoading} whileTap={{ scale: 0.97 }} style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit" }}>
                  {isLoading && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
                  {isLoading ? "Resetting..." : "Reset Password"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx global>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </motion.div>
    </div>
  );
}
