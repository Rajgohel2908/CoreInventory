"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import { Search, Plus, Filter, ChevronDown, MoreHorizontal, ArrowRight } from "lucide-react";

const demoTransfers = [
  { ref: "TRF/2026/0042", source: "Main Warehouse / Rack A", dest: "East Wing / Zone B", status: "Done", scheduled: "Mar 13, 2026", items: 3, products: 500 },
  { ref: "TRF/2026/0041", source: "East Wing / Zone A", dest: "Main Warehouse / Rack C", status: "Waiting", scheduled: "Mar 14, 2026", items: 2, products: 200 },
  { ref: "TRF/2026/0040", source: "South Dock / Bay 1", dest: "West Storage / Zone A", status: "Confirmed", scheduled: "Mar 15, 2026", items: 5, products: 1200 },
  { ref: "TRF/2026/0039", source: "Main Warehouse / Rack B", dest: "South Dock / Bay 2", status: "Draft", scheduled: "Mar 16, 2026", items: 1, products: 50 },
  { ref: "TRF/2026/0038", source: "West Storage / Zone B", dest: "East Wing / Zone C", status: "Done", scheduled: "Mar 11, 2026", items: 4, products: 800 },
];

export default function TransfersPage() {
  return (
    <div>
      <Breadcrumbs />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>Internal Transfers</h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>Move stock between warehouses and locations</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 1px 3px rgba(26,86,219,0.3)" }}>
          <Plus size={16} /> New Transfer
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input type="text" placeholder="Search transfers..." style={{ width: "100%", padding: "8px 12px 8px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px", outline: "none", fontFamily: "inherit", background: "var(--color-background)" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
            <Filter size={14} /> Filter <ChevronDown size={12} />
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
              {["Reference", "Route", "Status", "Scheduled", "Products", "Total Qty", ""].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoTransfers.map((t, i) => (
              <motion.tr key={t.ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                style={{ borderBottom: "1px solid var(--color-border)", cursor: "pointer", height: "52px", transition: "background var(--duration-micro) ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-background)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "13px" }}>{t.ref}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                    <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{t.source.split(" / ")[0]}</span>
                    <ArrowRight size={12} color="var(--color-text-muted)" />
                    <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{t.dest.split(" / ")[0]}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}><StatusBadge status={t.status} /></td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{t.scheduled}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-primary)" }}>{t.items}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-text-primary)" }}>{t.products.toLocaleString()}</td>
                <td style={{ padding: "12px 16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: "4px" }}><MoreHorizontal size={16} /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
