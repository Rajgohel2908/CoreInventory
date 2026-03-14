"use client";

import React from "react";
import { useUIStore } from "@/store/ui.store";
import { Bell, Search, Menu } from "lucide-react";

export default function Topbar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <header
      style={{
        height: "64px",
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 30,
        marginLeft: sidebarCollapsed ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
        transition: "margin-left var(--duration-normal) ease-in-out",
      }}
    >
      {/* Left: Mobile Menu + Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={toggleSidebar}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
            padding: "4px",
          }}
        >
          <Menu size={20} />
        </button>

        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--color-background)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "8px 16px",
            width: "320px",
            transition: "border-color var(--duration-micro) ease, box-shadow var(--duration-micro) ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-primary)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-primary-ring)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <Search size={16} color="var(--color-text-muted)" />
          <input
            type="text"
            placeholder="Search products, orders, SKUs..."
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "13px",
              color: "var(--color-text-primary)",
              width: "100%",
              fontFamily: "inherit",
            }}
          />
          <kbd
            style={{
              fontSize: "11px",
              color: "var(--color-text-muted)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              padding: "2px 6px",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications + User */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Notification Bell */}
        <button
          style={{
            position: "relative",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)",
            transition: "background var(--duration-micro) ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-background)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Bell size={20} />
          {/* Notification dot */}
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--color-error)",
              border: "2px solid var(--color-surface)",
            }}
          />
        </button>

        {/* User Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "4px 8px",
            borderRadius: "var(--radius-lg)",
            cursor: "pointer",
            transition: "background var(--duration-micro) ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-background)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--color-primary), #3B82F6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            IM
          </div>
          <div style={{ lineHeight: 1.2 }}>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              Inventory Manager
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: "var(--color-text-muted)",
              }}
            >
              manager@coreinventory.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
