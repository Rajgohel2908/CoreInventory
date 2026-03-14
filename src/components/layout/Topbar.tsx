"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui.store";
import { Search, Menu, LogOut } from "lucide-react";
import NotificationCenter from "../notifications/NotificationCenter";
import { useAuth } from "@/context/AuthContext";

export default function Topbar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const userInitials = useMemo(() => {
    const name = user?.name?.trim() || "";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "CI";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }, [user?.name]);

  const userRoleLabel = user?.role === "STAFF" ? "Warehouse Staff" : "Inventory Manager";

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleGlobalSearch}
            placeholder="Search products, orders, SKUs... (Press Enter)"
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
        <NotificationCenter />

        {/* User Avatar + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "4px 8px",
              borderRadius: "var(--radius-lg)",
              transition: "background var(--duration-micro) ease",
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
              {userInitials}
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
                {user?.name || userRoleLabel}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                }}
              >
                {user?.email || ""}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 600,
              transition: "all var(--duration-micro) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-background)";
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
