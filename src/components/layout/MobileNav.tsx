"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  ArrowLeftRight,
  User,
} from "lucide-react";

const mobileNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
  { label: "Operations", href: "/receipts", icon: ClipboardList },
  { label: "Transfers", href: "/transfers", icon: ArrowLeftRight },
  { label: "Profile", href: "/profile", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "64px",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        display: "none",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px",
        zIndex: 50,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      className="mobile-nav"
    >
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "8px 12px",
              borderRadius: "var(--radius-lg)",
              textDecoration: "none",
              color: isActive ? "var(--color-primary)" : "var(--color-text-muted)",
              fontSize: "10px",
              fontWeight: isActive ? 600 : 400,
              transition: "color var(--duration-micro) ease",
              minWidth: "44px",
              minHeight: "44px",
              justifyContent: "center",
            }}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <style jsx global>{`
        @media (max-width: 768px) {
          .mobile-nav {
            display: flex !important;
          }
          .sidebar {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
