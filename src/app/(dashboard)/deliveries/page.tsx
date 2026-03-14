"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import { Search, Plus, Filter, ChevronDown, MoreHorizontal, AlertCircle } from "lucide-react";

const demoDeliveries = [
  { ref: "DEL/2026/0045", customer: "BuildMax Ltd.", warehouse: "Main Warehouse", status: "Ready", scheduled: "Mar 14, 2026", items: 4, priority: "Normal", progress: 100 },
  { ref: "DEL/2026/0044", customer: "GreenBuild Co.", warehouse: "East Wing", status: "Picking", scheduled: "Mar 15, 2026", items: 7, priority: "Urgent", progress: 57 },
  { ref: "DEL/2026/0043", customer: "SafetyFirst Inc.", warehouse: "Main Warehouse", status: "Draft", scheduled: "Mar 16, 2026", items: 2, priority: "Normal", progress: 0 },
  { ref: "DEL/2026/0042", customer: "AquaPipes Co.", warehouse: "South Dock", status: "Done", scheduled: "Mar 12, 2026", items: 5, priority: "Normal", progress: 100 },
  { ref: "DEL/2026/0041", customer: "MetalWorks", warehouse: "West Storage", status: "Packed", scheduled: "Mar 14, 2026", items: 3, priority: "Critical", progress: 100 },
  { ref: "DEL/2026/0040", customer: "ElectroPower", warehouse: "Main Warehouse", status: "Done", scheduled: "Mar 11, 2026", items: 6, priority: "Normal", progress: 100 },
];

const priorityColors: Record<string, string> = {
  Normal: "var(--color-text-muted)",
  Urgent: "var(--color-warning)",
  Critical: "var(--color-error)",
};

export default function DeliveriesPage() {
  return (
    <div>
      <Breadcrumbs />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>Delivery Orders</h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>Manage outgoing stock deliveries</p>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 1px 3px rgba(26,86,219,0.3)" }}>
          <Plus size={16} /> New Delivery
        </motion.button>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input type="text" placeholder="Search deliveries..." style={{ width: "100%", padding: "8px 12px 8px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px", outline: "none", fontFamily: "inherit", background: "var(--color-background)" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
            <Filter size={14} /> Filter <ChevronDown size={12} />
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
              {["Reference", "Customer", "Warehouse", "Priority", "Status", "Progress", "Scheduled", ""].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {demoDeliveries.map((d, i) => (
              <motion.tr key={d.ref} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                style={{ borderBottom: "1px solid var(--color-border)", cursor: "pointer", height: "52px", transition: "background var(--duration-micro) ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-background)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "13px" }}>{d.ref}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-primary)", fontWeight: 500 }}>{d.customer}</td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{d.warehouse}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, color: priorityColors[d.priority] }}>
                    {d.priority !== "Normal" && <AlertCircle size={12} />}
                    {d.priority}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}><StatusBadge status={d.status} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "6px", background: "var(--color-border)", borderRadius: "3px", overflow: "hidden", maxWidth: "80px" }}>
                      <div style={{ height: "100%", width: `${d.progress}%`, background: d.progress === 100 ? "var(--color-success)" : "var(--color-primary)", borderRadius: "3px", transition: "width 0.3s ease" }} />
                    </div>
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)", fontFamily: "var(--font-geist-mono)" }}>{d.progress}%</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{d.scheduled}</td>
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
