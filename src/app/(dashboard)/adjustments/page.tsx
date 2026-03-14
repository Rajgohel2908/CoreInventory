"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Plus, SlidersHorizontal, MoreHorizontal } from "lucide-react";

const demoAdjustments = [
  { id: 1, product: "LED Panels 60W", sku: "LED-PNL-60W", location: "West Storage / Zone A", recorded: 12, counted: 0, delta: -12, reason: "Damaged", date: "Mar 13, 2026", operator: "Jane Smith" },
  { id: 2, product: "Nylon Ropes 10m", sku: "NYL-ROP-10M", location: "South Dock / Bay 1", recorded: 50, counted: 45, delta: -5, reason: "Count Error", date: "Mar 12, 2026", operator: "John Doe" },
  { id: 3, product: "Carbon Steel Plates", sku: "CRB-STL-PLT", location: "Main Warehouse / Rack A", recorded: 22, counted: 25, delta: +3, reason: "Count Error", date: "Mar 10, 2026", operator: "Jane Smith" },
  { id: 4, product: "Rubber Seals 50mm", sku: "RBR-SEL-50", location: "East Wing / Zone B", recorded: 3250, counted: 3200, delta: -50, reason: "Expired", date: "Mar 08, 2026", operator: "John Doe" },
];

export default function AdjustmentsPage() {
  return (
    <div>
      <Breadcrumbs />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>Stock Adjustments</h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>Reconcile physical counts with recorded stock levels</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 1px 3px rgba(26,86,219,0.3)" }}>
          <Plus size={16} /> New Adjustment
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
              {["Product", "SKU", "Location", "Recorded", "Counted", "Delta", "Reason", "Date", "Operator", ""].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoAdjustments.map((a, i) => (
              <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                style={{ borderBottom: "1px solid var(--color-border)", height: "52px", transition: "background var(--duration-micro) ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-background)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <td style={{ padding: "12px 16px", fontWeight: 500, color: "var(--color-text-primary)" }}>{a.product}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-muted)", fontSize: "12px" }}>{a.sku}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{a.location}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-primary)" }}>{a.recorded}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-primary)" }}>{a.counted}</td>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: a.delta > 0 ? "var(--color-success)" : "var(--color-error)" }}>
                  {a.delta > 0 ? `+${a.delta}` : a.delta}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: "var(--radius-full)", background: "var(--color-draft-bg)", color: "var(--color-draft-text)", fontSize: "11px", fontWeight: 500 }}>{a.reason}</span>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{a.date}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{a.operator}</td>
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
