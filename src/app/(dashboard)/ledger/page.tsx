"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Search, Filter, ChevronDown, Download, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const ledgerEntries = [
  { id: 1, timestamp: "Mar 14, 2026 09:12", ref: "REC/2026/0108", product: "Steel Bolts M10", sku: "STL-BLT-M10", type: "Receipt", location: "Main Warehouse / Rack A", change: +250, balance: 2450, operator: "John Doe" },
  { id: 2, timestamp: "Mar 14, 2026 08:45", ref: "DEL/2026/0045", product: "Copper Pipes 2m", sku: "CPR-PIP-2M", type: "Delivery", location: "East Wing / Zone B", change: -100, balance: 89, operator: "Jane Smith" },
  { id: 3, timestamp: "Mar 13, 2026 16:30", ref: "TRF/2026/0042", product: "Safety Gloves XL", sku: "SFT-GLV-XL", type: "Transfer Out", location: "Main Warehouse / Rack C", change: -500, balance: 700, operator: "John Doe" },
  { id: 4, timestamp: "Mar 13, 2026 16:30", ref: "TRF/2026/0042", product: "Safety Gloves XL", sku: "SFT-GLV-XL", type: "Transfer In", location: "East Wing / Zone A", change: +500, balance: 500, operator: "John Doe" },
  { id: 5, timestamp: "Mar 13, 2026 14:20", ref: "ADJ/2026/0019", product: "LED Panels 60W", sku: "LED-PNL-60W", type: "Adjustment", location: "West Storage / Zone A", change: -12, balance: 0, operator: "Jane Smith" },
  { id: 6, timestamp: "Mar 12, 2026 11:15", ref: "REC/2026/0107", product: "Aluminum Sheets", sku: "ALM-SHT-4X8", type: "Receipt", location: "Main Warehouse / Rack B", change: +75, balance: 340, operator: "John Doe" },
  { id: 7, timestamp: "Mar 12, 2026 10:00", ref: "DEL/2026/0044", product: "PVC Connectors", sku: "PVC-CON-TJ", type: "Delivery", location: "Main Warehouse / Rack A", change: -300, balance: 5600, operator: "Jane Smith" },
  { id: 8, timestamp: "Mar 11, 2026 15:45", ref: "REC/2026/0106", product: "Nylon Ropes 10m", sku: "NYL-ROP-10M", type: "Receipt", location: "South Dock / Bay 1", change: +50, balance: 45, operator: "John Doe" },
];

export default function LedgerPage() {
  return (
    <div>
      <Breadcrumbs />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>Stock Ledger</h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>Complete audit trail of all stock movements</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <motion.button whileTap={{ scale: 0.97 }} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
            <Download size={14} /> Export CSV
          </motion.button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input type="text" placeholder="Search by product, SKU, or reference..." style={{ width: "100%", padding: "8px 12px 8px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "13px", outline: "none", fontFamily: "inherit", background: "var(--color-background)" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" }}>
            <Filter size={14} /> Filters <ChevronDown size={12} />
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                {["Timestamp", "Reference", "Product", "SKU", "Type", "Location", "Change", "Balance", "Operator"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ledgerEntries.map((entry, i) => (
                <motion.tr key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  style={{ borderBottom: "1px solid var(--color-border)", height: "48px", background: i % 2 === 0 ? "transparent" : "var(--color-background)" }}>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-muted)", whiteSpace: "nowrap", fontSize: "12px" }}>{entry.timestamp}</td>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "12px" }}>{entry.ref}</td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-primary)", fontWeight: 500 }}>{entry.product}</td>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-muted)", fontSize: "12px" }}>{entry.sku}</td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{entry.type}</td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{entry.location}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, fontSize: "13px", color: entry.change > 0 ? "var(--color-success)" : "var(--color-error)" }}>
                      {entry.change > 0 ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                      {entry.change > 0 ? `+${entry.change}` : entry.change}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-text-primary)" }}>{entry.balance.toLocaleString()}</td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{entry.operator}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ padding: "12px 24px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "var(--color-text-muted)" }}>
          <span>Showing 1-8 of 1,247 entries</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, "...", 156].map((page, i) => (
              <button key={i} style={{ width: "32px", height: "32px", borderRadius: "var(--radius-md)", border: page === 1 ? "none" : "1px solid var(--color-border)", background: page === 1 ? "var(--color-primary)" : "transparent", color: page === 1 ? "#fff" : "var(--color-text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>{page}</button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
