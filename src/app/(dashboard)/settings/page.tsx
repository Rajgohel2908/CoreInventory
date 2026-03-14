"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Settings, Warehouse, Users, Bell, ChevronRight } from "lucide-react";
import Link from "next/link";

const settingsSections = [
  {
    title: "Warehouse Management",
    desc: "Create and manage warehouses, define locations and zones",
    icon: <Warehouse size={24} />,
    href: "/settings/warehouses",
    iconBg: "var(--color-primary-light)",
    iconColor: "var(--color-primary)",
  },
  {
    title: "User Management",
    desc: "View all users, invite new members, manage roles and permissions",
    icon: <Users size={24} />,
    href: "/settings/users",
    iconBg: "var(--color-success-light)",
    iconColor: "var(--color-success)",
  },
  {
    title: "Notifications",
    desc: "Configure email alerts, notification types, and digest frequency",
    icon: <Bell size={24} />,
    href: "/settings/notifications",
    iconBg: "var(--color-warning-light)",
    iconColor: "var(--color-warning)",
  },
];

export default function SettingsPage() {
  return (
    <div>
      <Breadcrumbs />
      <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>Settings</h1>
      <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: "0 0 32px 0" }}>Configure your CoreInventory workspace</p>

      <div style={{ display: "grid", gap: "16px", maxWidth: "700px" }}>
        {settingsSections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2, boxShadow: "var(--shadow-lg)" }}
          >
            <Link href={section.href} style={{ textDecoration: "none" }}>
              <div style={{
                background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px",
                display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", boxShadow: "var(--shadow-sm)", transition: "box-shadow var(--duration-micro) ease"
              }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", background: section.iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: section.iconColor, flexShrink: 0 }}>
                  {section.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>{section.title}</h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)" }}>{section.desc}</p>
                </div>
                <ChevronRight size={20} color="var(--color-text-muted)" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
