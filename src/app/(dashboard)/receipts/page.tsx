"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

const demoReceipts = [
  { ref: "REC/2026/0108", supplier: "Metro Steel Co.", warehouse: "Main Warehouse", status: "Waiting", expected: "Mar 15, 2026", items: 5, total: 1250 },
  { ref: "REC/2026/0107", supplier: "Allied Pipes Ltd.", warehouse: "East Wing", status: "Done", expected: "Mar 13, 2026", items: 3, total: 450 },
  { ref: "REC/2026/0106", supplier: "SafeGear Inc.", warehouse: "Main Warehouse", status: "Confirmed", expected: "Mar 16, 2026", items: 8, total: 3200 },
  { ref: "REC/2026/0105", supplier: "ElectroBright", warehouse: "West Storage", status: "Draft", expected: "Mar 18, 2026", items: 2, total: 180 },
  { ref: "REC/2026/0104", supplier: "Metro Steel Co.", warehouse: "South Dock", status: "In Transit", expected: "Mar 14, 2026", items: 6, total: 890 },
  { ref: "REC/2026/0103", supplier: "Industrial Ropes Ltd.", warehouse: "Main Warehouse", status: "Done", expected: "Mar 10, 2026", items: 1, total: 75 },
  { ref: "REC/2026/0102", supplier: "RubberTech", warehouse: "East Wing", status: "Canceled", expected: "Mar 09, 2026", items: 4, total: 600 },
];

export default function ReceiptsPage() {
  return (
    <div>
      <Breadcrumbs />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>Receipts</h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>Manage incoming stock from suppliers</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 1px 3px rgba(26,86,219,0.3)" }}>
          <Plus size={16} /> New Receipt
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
        {[
          { label: "This Month", value: "28", color: "var(--color-primary)" },
          { label: "Pending", value: "6", color: "var(--color-warning)" },
          { label: "Overdue", value: "2", color: "var(--color-error)" },
        ].map((stat) => (
          <div key={stat.label} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{stat.label}</span>
            <span style={{ fontSize: "20px", fontWeight: 700, fontFamily: "var(--font-geist-mono)", color: stat.color }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input type="text" placeholder="Search receipts..." style={{ width: "100%", padding: "8px 12px 8px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px", outline: "none", fontFamily: "inherit", background: "var(--color-background)" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
            <Filter size={14} /> Filter <ChevronDown size={12} />
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
              {["Reference", "Supplier", "Warehouse", "Status", "Expected", "Items", ""].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoReceipts.map((r, i) => (
              <motion.tr key={r.ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                style={{ borderBottom: "1px solid var(--color-border)", cursor: "pointer", height: "52px", transition: "background var(--duration-micro) ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-background)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "13px" }}>{r.ref}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-primary)", fontWeight: 500 }}>{r.supplier}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{r.warehouse}</td>
                <td style={{ padding: "12px 16px" }}><StatusBadge status={r.status} /></td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{r.expected}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-primary)" }}>{r.items}</td>
                <td style={{ padding: "12px 16px" }}>
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)", padding: "4px" }}>
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
