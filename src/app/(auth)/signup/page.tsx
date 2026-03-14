"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
  Loader2,
  Check,
  Phone,
  ArrowRight,
  ArrowLeft,
  Smartphone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type SignupStep = "INFO" | "SECURITY" | "OTP";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const normalizePhone = (raw: string) => {
    const trimmed = raw.replace(/\s+/g, "");
    if (!trimmed) return "";
    if (trimmed.startsWith("+")) return trimmed;
    return `+91${trimmed}`;
  };

  const [step, setStep] = useState<SignupStep>("INFO");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    company: "",
    acceptTerms: false,
  });

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateInfo = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.role) newErrors.role = "Please select a role";
    if (!formData.acceptTerms) newErrors.acceptTerms = "Please accept the terms";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const validateSecurity = () => {
    const newErrors: Record<string, string> = {};
    const normalizedPhone = normalizePhone(formData.phone);
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone))
      newErrors.phone = "Invalid phone (example: +911234567890)";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Minimum 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    // Persist normalized phone so OTP + UI use the same value
    if (normalizedPhone !== formData.phone) {
      setFormData((prev) => ({ ...prev, phone: normalizedPhone }));
    }
    return true;
  };

  const handleNextToSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInfo()) setStep("SECURITY");
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSecurity()) return;
    const normalizedPhone = normalizePhone(formData.phone);

    setIsLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", phone: normalizedPhone }),
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev) => ({ ...prev, phone: normalizedPhone }));
        setStep("OTP");
      } else {
        setErrors({ phone: data.error || "Failed to send OTP" });
      }
    } catch {
      setErrors({ phone: "Network error" });
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

  const handleVerifyAndSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    const normalizedPhone = normalizePhone(formData.phone);
    if (code.length !== 6) {
      setErrors({ otp: "Enter 6-digit code" });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Verify OTP
      const verifyRes = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify", phone: normalizedPhone, code }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyRes.ok || !verifyData.valid) {
        setErrors({ otp: "Invalid or expired code" });
        setIsLoading(false);
        return;
      }

      // 2. Perform Signup
      const result = await signup({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: normalizedPhone,
        company: formData.company,
        role: formData.role === "manager" ? "MANAGER" : "STAFF",
      });

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        setErrors({ otp: result.error || "Signup failed" });
      }
    } catch {
      setErrors({ otp: "Network error" });
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
          <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Welcome Aboard!</h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>Your account is verified and ready. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px 12px 10px 40px", borderRadius: "var(--radius-md)", border: `1px solid ${hasError ? "var(--color-error)" : "var(--color-border)"}`,
    fontSize: "14px", color: "var(--color-text-primary)", background: "var(--color-surface)", outline: "none", transition: "all 0.2s ease", fontFamily: "inherit"
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Left Panel */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        style={{ flex: 1, background: "linear-gradient(135deg, #1E293B, #0F172A)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px", position: "relative", overflow: "hidden" }} className="auth-left-panel">
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.15), transparent 70%)" }} />
        <Image src="/assets/images/auth-illustration.png" alt="CoreInventory" width={480} height={360} style={{ objectFit: "contain", maxWidth: "100%", borderRadius: "var(--radius-xl)", marginBottom: "40px" }} priority />
        <h1 style={{ color: "#fff", fontSize: "28px", fontWeight: 700, textAlign: "center", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Secure & Reliable<br /><span style={{ color: "var(--color-primary)" }}>Inventory Powerhouse</span>
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "15px", textAlign: "center", maxWidth: "380px", lineHeight: 1.7 }}>
          Join the next generation of warehouse management with multi-factor authentication and real-time ledger auditing.
        </p>
      </motion.div>

      {/* Right Panel */}
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "var(--radius-lg)", background: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "16px" }}>CI</div>
            <span style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)" }}>CoreInventory</span>
          </div>

          {/* Stepper Header */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
            {(["INFO", "SECURITY", "OTP"] as SignupStep[]).map((s, i) => (
              <div key={s} style={{ flex: 1, height: "4px", borderRadius: "2px", background: (step === s || (step === "SECURITY" && i === 0) || (step === "OTP" && (i === 0 || i === 1))) ? "var(--color-primary)" : "var(--color-border)", transition: "all 0.3s ease" }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {step === "INFO" && (
              <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Create account</h2>
                <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "28px" }}>Tell us about yourself and your company</p>
                <form onSubmit={handleNextToSecurity}>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Role</label>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        type="button"
                        onClick={() => updateField("role", "manager")}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: formData.role === "manager" ? "1px solid var(--color-primary)" : `1px solid ${errors.role ? "var(--color-error)" : "var(--color-border)"}`,
                          background: formData.role === "manager" ? "var(--color-primary-light)" : "var(--color-surface)",
                          color: formData.role === "manager" ? "var(--color-primary)" : "var(--color-text-primary)",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        Inventory Manager
                      </button>
                      <button
                        type="button"
                        onClick={() => updateField("role", "staff")}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: formData.role === "staff" ? "1px solid var(--color-primary)" : `1px solid ${errors.role ? "var(--color-error)" : "var(--color-border)"}`,
                          background: formData.role === "staff" ? "var(--color-primary-light)" : "var(--color-surface)",
                          color: formData.role === "staff" ? "var(--color-primary)" : "var(--color-text-primary)",
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        Warehouse Staff
                      </button>
                    </div>
                    {errors.role && <p style={{ color: "var(--color-error)", fontSize: "12px", marginTop: "6px" }}>{errors.role}</p>}
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Full Name</label>
                    <div style={{ position: "relative" }}>
                      <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input type="text" value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="John Doe" style={inputStyle(!!errors.fullName)} />
                    </div>
                    {errors.fullName && <p style={{ color: "var(--color-error)", fontSize: "12px", marginTop: "4px" }}>{errors.fullName}</p>}
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Email Address</label>
                    <div style={{ position: "relative" }}>
                      <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@company.com" style={inputStyle(!!errors.email)} />
                    </div>
                    {errors.email && <p style={{ color: "var(--color-error)", fontSize: "12px", marginTop: "4px" }}>{errors.email}</p>}
                  </div>

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Company</label>
                    <div style={{ position: "relative" }}>
                      <Building2 size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input type="text" value={formData.company} onChange={(e) => updateField("company", e.target.value)} placeholder="Acme Logistics" style={inputStyle(false)} />
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "flex", gap: "10px", fontSize: "13px", color: "var(--color-text-secondary)", cursor: "pointer" }}>
                      <input type="checkbox" checked={formData.acceptTerms} onChange={(e) => updateField("acceptTerms", e.target.checked)} style={{ accentColor: "var(--color-primary)" }} />
                      <span>I agree to the Terms & Privacy Policy</span>
                    </label>
                    {errors.acceptTerms && <p style={{ color: "var(--color-error)", fontSize: "12px", marginTop: "4px" }}>{errors.acceptTerms}</p>}
                  </div>

                  <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    Continue <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Security */}
            {step === "SECURITY" && (
              <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep("INFO")} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer", marginBottom: "20px" }}>
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Security Setup</h2>
                <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "28px" }}>Verify your phone for two-factor authentication</p>
                <form onSubmit={handleSendOtp}>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Phone Number (auto +91)</label>
                    <div style={{ position: "relative" }}>
                      <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="9876543210 (we'll add +91)" style={inputStyle(!!errors.phone)} />
                    </div>
                    {errors.phone && <p style={{ color: "var(--color-error)", fontSize: "12px", marginTop: "4px" }}>{errors.phone}</p>}
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Create Password</label>
                    <div style={{ position: "relative" }}>
                      <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => updateField("password", e.target.value)} placeholder="••••••••" style={inputStyle(!!errors.password)} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>Confirm Password</label>
                    <div style={{ position: "relative" }}>
                      <Lock size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                      <input type="password" value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} placeholder="••••••••" style={inputStyle(!!errors.confirmPassword)} />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : <>Verify Phone <Smartphone size={18} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 3: OTP */}
            {step === "OTP" && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep("SECURITY")} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer", marginBottom: "20px" }}>
                  <ArrowLeft size={14} /> Back
                </button>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <Smartphone size={24} color="var(--color-primary)" />
                </div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "8px" }}>Enter verification code</h2>
                <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>We sent a 6-digit code to <strong>{formData.phone}</strong></p>
                {errors.otp && <div style={{ padding: "10px", borderRadius: "8px", background: "var(--color-error-light)", color: "var(--color-error-text)", fontSize: "13px", marginBottom: "16px" }}>{errors.otp}</div>}
                <form onSubmit={handleVerifyAndSignup}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "24px" }}>
                    {otp.map((digit, i) => (
                      <input key={i} ref={(el) => { otpRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        style={{ width: "48px", height: "56px", textAlign: "center", fontSize: "20px", fontWeight: 600, borderRadius: "12px", border: `2px solid ${digit ? "var(--color-primary)" : "var(--color-border)"}`, background: "var(--color-surface)", outline: "none", transition: "all 0.2s ease" }} />
                    ))}
                  </div>
                  <button type="submit" disabled={isLoading} style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Complete Registration"}
                  </button>
                </form>
                <p style={{ textAlign: "center", marginTop: "24px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
                  Didn&apos;t receive a code? <button onClick={handleSendOtp} style={{ color: "var(--color-primary)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Resend</button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{ textAlign: "center", marginTop: "32px", fontSize: "13px", color: "var(--color-text-secondary)" }}>
            Already have an account? <Link href="/login" style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </motion.div>

      <style jsx global>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .auth-left-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
