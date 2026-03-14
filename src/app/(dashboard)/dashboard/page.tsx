"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  AlertTriangle,
  XCircle,
  ClipboardCheck,
  Truck,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

interface KpiData {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  iconBg: string;
  alert?: boolean;
  alertColor?: string;
}

const kpiData: KpiData[] = [
  {
    label: "Total Products",
    value: "1,247",
    trend: "+12 this week",
    trendUp: true,
    icon: <Package size={20} />,
    iconBg: "var(--color-primary-light)",
  },
  {
    label: "Low Stock Items",
    value: "23",
    trend: "+5 since yesterday",
    trendUp: false,
    icon: <AlertTriangle size={20} />,
    iconBg: "var(--color-warning-light)",
    alert: true,
    alertColor: "var(--color-warning)",
  },
  {
    label: "Out of Stock",
    value: "7",
    trend: "-2 from last week",
    trendUp: true,
    icon: <XCircle size={20} />,
    iconBg: "var(--color-error-light)",
    alert: true,
    alertColor: "var(--color-error)",
  },
  {
    label: "Pending Receipts",
    value: "14",
    trend: "3 overdue",
    trendUp: false,
    icon: <ClipboardCheck size={20} />,
    iconBg: "var(--color-info-light)",
  },
  {
    label: "Pending Deliveries",
    value: "9",
    trend: "2 due today",
    trendUp: false,
    icon: <Truck size={20} />,
    iconBg: "var(--color-info-light)",
  },
  {
    label: "Internal Transfers",
    value: "5",
    trend: "3 scheduled today",
    trendUp: true,
    icon: <ArrowLeftRight size={20} />,
    iconBg: "var(--color-primary-light)",
  },
];

const recentOperations = [
  { ref: "REC/2026/0108", type: "Receipt", product: "Steel Bolts M10", warehouse: "Main Warehouse", status: "Waiting", date: "Mar 14, 2026", items: 250 },
  { ref: "DEL/2026/0045", type: "Delivery", product: "Copper Pipes 2m", warehouse: "East Wing", status: "Ready", date: "Mar 14, 2026", items: 100 },
  { ref: "TRF/2026/0042", type: "Transfer", product: "Safety Gloves XL", warehouse: "Main → East", status: "Done", date: "Mar 13, 2026", items: 500 },
  { ref: "ADJ/2026/0019", type: "Adjustment", product: "LED Panels 60W", warehouse: "West Storage", status: "Done", date: "Mar 13, 2026", items: -12 },
  { ref: "REC/2026/0107", type: "Receipt", product: "Aluminum Sheets", warehouse: "Main Warehouse", status: "Done", date: "Mar 12, 2026", items: 75 },
  { ref: "DEL/2026/0044", type: "Delivery", product: "PVC Connectors", warehouse: "Main Warehouse", status: "Draft", date: "Mar 12, 2026", items: 300 },
  { ref: "REC/2026/0106", type: "Receipt", product: "Nylon Ropes 10m", warehouse: "South Dock", status: "Canceled", date: "Mar 11, 2026", items: 50 },
  { ref: "TRF/2026/0041", type: "Transfer", product: "Rubber Seals", warehouse: "East → Main", status: "Waiting", date: "Mar 11, 2026", items: 200 },
];

export default function DashboardPage() {
  return (
    <div>
      <Breadcrumbs />
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
          Dashboard
        </h1>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
          Real-time overview of your inventory operations
        </p>
      </div>

      {/* KPI Grid (Bento) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3, ease: "easeOut" }}
            style={{
              background: "var(--color-surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              padding: "24px",
              boxShadow: "var(--shadow-md)",
              cursor: "pointer",
              transition: "transform var(--duration-micro) ease, box-shadow var(--duration-micro) ease",
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ y: -2, boxShadow: "var(--shadow-lg)" }}
          >
            {/* Alert indicator stripe */}
            {kpi.alert && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: kpi.alertColor,
                }}
              />
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-lg)",
                  background: kpi.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: kpi.alertColor || "var(--color-primary)",
                }}
              >
                {kpi.icon}
              </div>
            </div>

            <p className="text-label" style={{ marginBottom: "8px", margin: "0 0 8px 0" }}>
              {kpi.label}
            </p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                margin: "0 0 8px 0",
                fontFamily: "var(--font-geist-mono)",
                letterSpacing: "-0.02em",
              }}
            >
              {kpi.value}
            </motion.p>

            {kpi.trend && (
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px" }}>
                {kpi.trendUp ? (
                  <TrendingUp size={14} color="var(--color-success)" />
                ) : (
                  <TrendingDown size={14} color="var(--color-warning)" />
                )}
                <span style={{ color: "var(--color-text-muted)" }}>{kpi.trend}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Operations Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{
          background: "var(--color-surface)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-md)",
          overflow: "hidden",
        }}
      >
        {/* Table Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>
              Recent Operations
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--color-text-secondary)" }}>
              Latest stock movements across all warehouses
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {["All", "Receipts", "Deliveries", "Transfers"].map((filter) => (
              <button
                key={filter}
                style={{
                  padding: "6px 12px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: filter === "All" ? "var(--color-primary)" : "transparent",
                  color: filter === "All" ? "#fff" : "var(--color-text-secondary)",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all var(--duration-micro) ease",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "13px",
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  background: "var(--color-background)",
                }}
              >
                {["Reference", "Type", "Product", "Warehouse", "Status", "Date", "Items"].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "var(--color-text-muted)",
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {recentOperations.map((op, index) => (
                <motion.tr
                  key={op.ref}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.02 }}
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                    cursor: "pointer",
                    transition: "background var(--duration-micro) ease",
                    height: "52px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-background)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "13px" }}>
                    {op.ref}
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{op.type}</td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-primary)", fontWeight: 500 }}>{op.product}</td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{op.warehouse}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge status={op.status} />
                  </td>
                  <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>{op.date}</td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontFamily: "var(--font-geist-mono)",
                      fontWeight: 500,
                      color: typeof op.items === "number" && op.items < 0 ? "var(--color-error)" : "var(--color-text-primary)",
                    }}
                  >
                    {typeof op.items === "number" && op.items > 0 ? `+${op.items}` : op.items}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            padding: "12px 24px",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "13px",
            color: "var(--color-text-muted)",
          }}
        >
          <span>Showing 1-8 of 156 operations</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, "...", 20].map((page, i) => (
              <button
                key={i}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "var(--radius-md)",
                  border: page === 1 ? "none" : "1px solid var(--color-border)",
                  background: page === 1 ? "var(--color-primary)" : "transparent",
                  color: page === 1 ? "#fff" : "var(--color-text-secondary)",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "inherit",
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
