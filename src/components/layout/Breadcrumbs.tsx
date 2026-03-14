"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Products",
  receipts: "Receipts",
  deliveries: "Delivery Orders",
  transfers: "Internal Transfers",
  adjustments: "Adjustments",
  ledger: "Stock Ledger",
  settings: "Settings",
  warehouses: "Warehouses",
  users: "Users",
  notifications: "Notifications",
  profile: "My Profile",
  new: "Create New",
  edit: "Edit",
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length <= 1) return null;

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = routeLabels[segment] || segment;
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "12px 0",
        fontSize: "13px",
      }}
    >
      {crumbs.map((crumb, i) => (
        <React.Fragment key={crumb.href}>
          {i > 0 && (
            <ChevronRight size={14} color="var(--color-text-muted)" />
          )}
          {crumb.isLast ? (
            <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.href}
              style={{
                color: "var(--color-text-muted)",
                textDecoration: "none",
                transition: "color var(--duration-micro) ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
              }}
            >
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
