"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  ArrowLeft,
  Edit3,
  Package,
  Warehouse,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowLeftRight,
  AlertTriangle,
} from "lucide-react";

// Global demo product list to resolve details correctly
const demoProducts = [
  { id: "1", name: "Steel Bolts M10", sku: "STL-BLT-M10", category: "Fasteners", unitOfMeasure: "units", stock: 2450, reorderPoint: 500, reorderQty: 1000, description: "High-strength steel bolts with hexagonal heads. Grade 8.8, zinc-plated finish.", image: "/assets/images/products/steel-bolts-m10.svg" },
  { id: "2", name: "Copper Pipes 2m", sku: "CPR-PIP-2M", category: "Piping", unitOfMeasure: "meters", stock: 89, reorderPoint: 100, reorderQty: 250, description: "High-grade copper pipes.", image: "/assets/images/products/copper-pipes-2m.svg" },
  { id: "3", name: "Safety Gloves XL", sku: "SFT-GLV-XL", category: "PPE", unitOfMeasure: "units", stock: 1200, reorderPoint: 200, reorderQty: 500, description: "Industrial grade heavy duty gloves.", image: "/assets/images/products/safety-gloves-xl.svg" },
  { id: "4", name: "LED Panels 60W", sku: "LED-PNL-60W", category: "Electrical", unitOfMeasure: "units", stock: 0, reorderPoint: 50, reorderQty: 100, description: "Industrial LED panels.", image: "/assets/images/products/led-panels-60w.svg" },
  { id: "5", name: "Aluminum Sheets 4x8", sku: "ALM-SHT-4X8", category: "Metal", unitOfMeasure: "units", stock: 340, reorderPoint: 75, reorderQty: 200, description: "Standard aluminum sheets.", image: "/assets/images/products/aluminum-sheets-4x8.svg" },
  { id: "6", name: "PVC Connectors T-Joint", sku: "PVC-CON-TJ", category: "Piping", unitOfMeasure: "units", stock: 5600, reorderPoint: 500, reorderQty: 1000, description: "Durable PVC T-joints.", image: "/assets/images/products/pvc-connectors-tjoint.svg" },
  { id: "7", name: "Nylon Ropes 10m", sku: "NYL-ROP-10M", category: "Ropes", unitOfMeasure: "units", stock: 45, reorderPoint: 50, reorderQty: 100, description: "Heavy duty nylon ropes.", image: "/assets/images/products/nylon-ropes-10m.svg" },
  { id: "8", name: "Rubber Seals 50mm", sku: "RBR-SEL-50", category: "Seals", unitOfMeasure: "units", stock: 3200, reorderPoint: 300, reorderQty: 1000, description: "Industrial rubber seal rings.", image: "/assets/images/products/rubber-seals-50mm.svg" },
  { id: "9", name: "Hex Nuts M12", sku: "HEX-NUT-M12", category: "Fasteners", unitOfMeasure: "units", stock: 8900, reorderPoint: 1000, reorderQty: 2500, description: "M12 Hexagon nuts.", image: "/assets/images/products/hex-nuts-m12.svg" },
  { id: "10", name: "Stainless Welding Rods", sku: "STN-WLD-ROD", category: "Welding", unitOfMeasure: "kg", stock: 0, reorderPoint: 100, reorderQty: 300, description: "High quality welding rods.", image: "/assets/images/products/stainless-welding-rods.svg" },
  { id: "11", name: "Carbon Steel Plates", sku: "CRB-STL-PLT", category: "Metal", unitOfMeasure: "units", stock: 25, reorderPoint: 30, reorderQty: 100, description: "Thick carbon steel plates.", image: "/assets/images/products/carbon-steel-plates.svg" },
  { id: "12", name: "Industrial Fans 24in", sku: "IND-FAN-24", category: "Electrical", unitOfMeasure: "units", stock: 67, reorderPoint: 20, reorderQty: 50, description: "Large industrial ventilation fans.", image: "/assets/images/products/industrial-fans-24in.svg" },
];

const stockByLocation = [
  { location: "Main Warehouse / Rack A", warehouse: "Main Warehouse", quantity: 1200 },
  { location: "East Wing / Zone B", warehouse: "East Wing", quantity: 850 },
  { location: "South Dock / Bay 1", warehouse: "South Dock", quantity: 400 },
];

const stockHistory = [
  { date: "Mar 14, 2026 09:12", ref: "REC/2026/0108", type: "Receipt", change: +250, balance: 2450, operator: "John Doe" },
  { date: "Mar 12, 2026 14:30", ref: "DEL/2026/0043", type: "Delivery", change: -100, balance: 2200, operator: "Jane Smith" },
  { date: "Mar 10, 2026 11:00", ref: "TRF/2026/0040", type: "Transfer", change: -200, balance: 2300, operator: "John Doe" },
  { date: "Mar 08, 2026 09:45", ref: "REC/2026/0104", type: "Receipt", change: +500, balance: 2500, operator: "Jane Smith" },
  { date: "Mar 05, 2026 16:00", ref: "ADJ/2026/0017", type: "Adjustment", change: -50, balance: 2000, operator: "John Doe" },
  { date: "Mar 02, 2026 10:30", ref: "DEL/2026/0040", type: "Delivery", change: -300, balance: 2050, operator: "Jane Smith" },
];

const productTransfers = [
  { ref: "TRF/2026/0042", from: "Main → East", status: "Done", date: "Mar 13, 2026", qty: 500 },
  { ref: "TRF/2026/0040", from: "East → South", status: "Done", date: "Mar 10, 2026", qty: 200 },
  { ref: "TRF/2026/0045", from: "South → Main", status: "Waiting", date: "Mar 16, 2026", qty: 100 },
];

type Tab = "overview" | "history" | "transfers";

// Support both page prop injection and params hook fallback correctly
export default function ProductDetailPage(props: any) {
  const router = useRouter();
  // Unwrap params depending on the Next.js version or fallback
  const resolvedParams: any = props?.params ? React.use(props.params as any) : {};
  const idFromProp = resolvedParams?.id || props?.params?.id || "1";
  
  const originalProduct = demoProducts.find(p => p.id === idFromProp) || demoProducts[0];
  
  // Format to match the previous local shape
  const product = {
    ...originalProduct,
    totalStock: originalProduct.stock,
    isActive: true,
    createdAt: "Jan 15, 2026",
    updatedAt: "Mar 14, 2026"
  };

  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "history", label: "Stock History" },
    { id: "transfers", label: "Transfers" },
  ];

  return (
    <div>
      <Breadcrumbs />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={() => router.back()} style={{ width: "36px", height: "36px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-text-secondary)" }}>
            <ArrowLeft size={16} />
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>{product.name}</h1>
              <span style={{ padding: "4px 10px", borderRadius: "var(--radius-full)", background: "var(--color-success-light)", color: "var(--color-success-text)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase" }}>Active</span>
            </div>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0, fontFamily: "var(--font-geist-mono)" }}>{product.sku} · {product.category}</p>
          </div>
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => router.push(`/products/${product.id}/edit`)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
          <Edit3 size={14} /> Edit Product
        </motion.button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0px", borderBottom: "2px solid var(--color-border)", marginBottom: "24px", position: "relative" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text-secondary)",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid var(--color-primary)" : "2px solid transparent",
              marginBottom: "-2px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color var(--duration-micro) ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "24px", alignItems: "start" }}>
          {/* Product Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Details Card */}
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Product Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Category", value: product.category },
                  { label: "Unit of Measure", value: product.unitOfMeasure },
                  { label: "Created", value: product.createdAt },
                  { label: "Last Updated", value: product.updatedAt },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-label" style={{ margin: "0 0 4px 0" }}>{field.label}</p>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>{field.value}</p>
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1" }}>
                  <p className="text-label" style={{ margin: "0 0 4px 0" }}>Description</p>
                  <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{product.description}</p>
                </div>
              </div>
            </div>

            {/* Stock by Location */}
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Stock by Location</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {stockByLocation.map((loc) => {
                  const pct = (loc.quantity / product.totalStock) * 100;
                  return (
                    <div key={loc.location} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <div style={{ width: "20px", display: "flex", justifyContent: "center" }}>
                        <Warehouse size={14} color="var(--color-text-muted)" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)" }}>{loc.location}</span>
                          <span style={{ fontSize: "13px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: "var(--color-text-primary)" }}>{loc.quantity.toLocaleString()}</span>
                        </div>
                        <div style={{ height: "6px", background: "var(--color-border)", borderRadius: "3px", overflow: "hidden" }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, delay: 0.2 }} style={{ height: "100%", background: "var(--color-primary)", borderRadius: "3px" }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Stock Summary */}
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "var(--radius-lg)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <Package size={28} color="var(--color-primary)" />
              </div>
              <p className="text-label" style={{ margin: "0 0 4px 0" }}>Total Stock</p>
              <p style={{ margin: "0 0 16px 0", fontSize: "40px", fontWeight: 700, fontFamily: "var(--font-geist-mono)", color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>{product.totalStock.toLocaleString()}</p>
              <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Reorder Point</span>
                  <span style={{ fontSize: "13px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-text-primary)" }}>{product.reorderPoint}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Reorder Qty</span>
                  <span style={{ fontSize: "13px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-text-primary)" }}>{product.reorderQty}</span>
                </div>
              </div>
              {product.totalStock < (product.reorderPoint || 0) && (
                <div style={{ marginTop: "16px", padding: "10px 14px", borderRadius: "var(--radius-md)", background: "var(--color-warning-light)", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--color-warning-text)", fontWeight: 500 }}>
                  <AlertTriangle size={14} /> Below reorder point
                </div>
              )}
            </div>

            {/* Product Image */}
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              <div style={{ height: "200px", background: "linear-gradient(135deg, var(--color-background), var(--color-border))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <Package size={56} color="var(--color-text-muted)" style={{ opacity: 0.3 }} />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === "history" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                {["Date", "Reference", "Type", "Change", "Balance", "Operator"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockHistory.map((entry, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--color-border)", height: "48px", background: i % 2 === 0 ? "transparent" : "var(--color-background)" }}>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-muted)", fontSize: "12px", whiteSpace: "nowrap" }}>{entry.date}</td>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "12px" }}>{entry.ref}</td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-secondary)" }}>{entry.type}</td>
                  <td style={{ padding: "10px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: entry.change > 0 ? "var(--color-success)" : "var(--color-error)" }}>
                      {entry.change > 0 ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                      {entry.change > 0 ? `+${entry.change}` : entry.change}
                    </span>
                  </td>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-text-primary)" }}>{entry.balance.toLocaleString()}</td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-secondary)", fontSize: "12px" }}>{entry.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {activeTab === "transfers" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                {["Reference", "Route", "Status", "Date", "Quantity"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productTransfers.map((t, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--color-border)", height: "48px" }}>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 500, color: "var(--color-primary)", fontSize: "13px" }}>{t.ref}</td>
                  <td style={{ padding: "10px 16px", display: "flex", alignItems: "center", gap: "6px", height: "48px" }}>
                    <ArrowLeftRight size={12} color="var(--color-text-muted)" />
                    <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{t.from}</span>
                  </td>
                  <td style={{ padding: "10px 16px" }}><StatusBadge status={t.status} /></td>
                  <td style={{ padding: "10px 16px", color: "var(--color-text-muted)" }}>{t.date}</td>
                  <td style={{ padding: "10px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: "var(--color-text-primary)" }}>{t.qty.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
