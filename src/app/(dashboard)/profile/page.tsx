"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useAuth } from "@/context/AuthContext";
import { User, Mail, Phone, Lock, Camera, Clock, LogOut, Bell, Save } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const roleLabel = useMemo(() => (user?.role === "STAFF" ? "Warehouse Staff" : "Inventory Manager"), [user?.role]);

  return (
    <div>
      <Breadcrumbs />
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>My Profile</h1>
      <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: "0 0 24px 0" }}>Manage your personal information and preferences</p>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "32px 24px", textAlign: "center", boxShadow: "var(--shadow-md)" }}>
          <div style={{ position: "relative", width: "96px", height: "96px", margin: "0 auto 16px" }}>
            <div style={{ width: "96px", height: "96px", borderRadius: "50%", background: "linear-gradient(135deg, var(--color-primary), #3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: 700, color: "#fff" }}>
              IM
            </div>
            <button style={{ position: "absolute", bottom: 0, right: 0, width: "32px", height: "32px", borderRadius: "50%", background: "var(--color-surface)", border: "2px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
              <Camera size={14} color="var(--color-text-secondary)" />
            </button>
          </div>
          <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: 600, color: "var(--color-text-primary)" }}>{name || "Account User"}</h3>
          <p style={{ margin: "0 0 4px 0", fontSize: "13px", color: "var(--color-primary)", fontWeight: 500 }}>{roleLabel}</p>
          <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "var(--color-text-muted)" }}>{email}</p>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", fontSize: "12px", color: "var(--color-text-muted)" }}>
              <Clock size={12} />
              Last active: Just now
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Personal Info */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px" }}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <User size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: "10px 12px 10px 40px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px" }}>Email</label>
                <div style={{ position: "relative" }}>
                  <Mail size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="email" value={email} readOnly style={{ width: "100%", padding: "10px 12px 10px 40px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "14px", outline: "none", fontFamily: "inherit", background: "var(--color-background)", color: "var(--color-text-muted)" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px" }}>Phone</label>
                <div style={{ position: "relative" }}>
                  <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: "100%", padding: "10px 12px 10px 40px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px" }}>Role</label>
                <input type="text" value={roleLabel} readOnly style={{ width: "100%", padding: "10px 12px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "14px", outline: "none", fontFamily: "inherit", background: "var(--color-background)", color: "var(--color-text-muted)" }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <Save size={14} /> Save Changes
              </motion.button>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Security</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid var(--color-border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-md)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Lock size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>Change Password</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-muted)" }}>Last changed 30 days ago</p>
                </div>
              </div>
              <button style={{ padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", color: "var(--color-text-secondary)" }}>Update</button>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-md)", background: "var(--color-error-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <LogOut size={16} color="var(--color-error)" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>Sign Out All Devices</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--color-text-muted)" }}>Sign out from all active sessions</p>
                </div>
              </div>
              <button
                onClick={logout}
                style={{ padding: "8px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-error)", background: "transparent", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit", color: "var(--color-error)" }}
              >
                Sign Out All
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
