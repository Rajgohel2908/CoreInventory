"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/ui.store";
import { useAuth } from "@/context/AuthContext";
import { NAV_ITEMS } from "@/lib/constants";
import {
  LayoutDashboard,
  Package,
  BookOpen,
  ClipboardCheck,
  Truck,
  ArrowLeftRight,
  SlidersHorizontal,
  Warehouse,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutDashboard,
  Package,
  BookOpen,
  ClipboardCheck,
  Truck,
  ArrowLeftRight,
  SlidersHorizontal,
  Warehouse,
  Settings,
};

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { logout } = useAuth();

  return (
    <aside
      className="sidebar"
      style={{
        width: sidebarCollapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        minHeight: "100vh",
        background: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        transition: "width var(--duration-normal) ease-in-out",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 40,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: sidebarCollapsed ? "20px 12px" : "20px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          minHeight: "64px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            color: "#fff",
            fontSize: "14px",
            flexShrink: 0,
          }}
        >
          CI
        </div>
        <AnimatePresence>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "16px",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              CoreInventory
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {NAV_ITEMS.map((section) => (
          <div key={section.section} style={{ marginBottom: "20px" }}>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--sidebar-text)",
                    opacity: 0.5,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "0 12px",
                    marginBottom: "6px",
                  }}
                >
                  {section.section}
                </motion.p>
              )}
            </AnimatePresence>
            {section.items.map((item) => {
              const Icon = iconMap[item.icon];
              const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: sidebarCollapsed ? "10px 0" : "10px 12px",
                    justifyContent: sidebarCollapsed ? "center" : "flex-start",
                    borderRadius: "var(--radius-md)",
                    color: isActive ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
                    background: isActive ? "var(--sidebar-active)" : "transparent",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    transition: "all var(--duration-micro) ease",
                    position: "relative",
                    marginBottom: "2px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--sidebar-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "20px",
                        borderRadius: "0 4px 4px 0",
                        background: "var(--color-primary)",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {Icon && <Icon size={18} />}
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div
        style={{
          padding: "12px 8px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: sidebarCollapsed ? "10px 0" : "10px 12px",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
            borderRadius: "var(--radius-md)",
            color: "var(--sidebar-text)",
            textDecoration: "none",
            fontSize: "14px",
            transition: "all var(--duration-micro) ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--sidebar-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <User size={18} />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ whiteSpace: "nowrap" }}
              >
                My Profile
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: sidebarCollapsed ? "10px 0" : "10px 12px",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
            borderRadius: "var(--radius-md)",
            color: "var(--sidebar-text)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            width: "100%",
            transition: "all var(--duration-micro) ease",
          }}
          onClick={logout}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--sidebar-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={18} />
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ whiteSpace: "nowrap" }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          top: "20px",
          right: "-12px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "var(--shadow-md)",
          zIndex: 50,
          transition: "transform var(--duration-micro) ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {sidebarCollapsed ? (
          <ChevronRight size={14} color="var(--color-text-secondary)" />
        ) : (
          <ChevronLeft size={14} color="var(--color-text-secondary)" />
        )}
      </button>
    </aside>
  );
}
