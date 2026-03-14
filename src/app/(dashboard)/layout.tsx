"use client";

import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import MobileNav from "@/components/layout/MobileNav";
import { useUIStore } from "@/store/ui.store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapsed } = useUIStore();

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      <Sidebar />
      <Topbar />
      <main
        style={{
          marginLeft: sidebarCollapsed
            ? "var(--sidebar-collapsed-width)"
            : "var(--sidebar-width)",
          transition: "margin-left var(--duration-normal) ease-in-out",
          padding: "24px",
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </main>
      <MobileNav />

      <style jsx global>{`
        @media (max-width: 768px) {
          main {
            margin-left: 0 !important;
            padding: 16px !important;
            padding-bottom: 80px !important;
          }
          header {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
