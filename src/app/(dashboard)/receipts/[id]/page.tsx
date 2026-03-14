"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertCircle,
  Truck,
  MapPin,
  CalendarDays,
  StickyNote,
  FileCheck,
  Printer,
} from "lucide-react";

const receipt = {
  reference: "REC/2026/0108",
  supplierName: "Metro Steel Co.",
  expectedDate: "Mar 15, 2026",
  locationName: "Main Warehouse / Rack A",
  notes: "Supplier confirmed partial shipment. Remainder expected by Mar 20.",
  status: "Waiting" as const,
  createdBy: "John Doe",
  createdAt: "Mar 12, 2026 09:30",
  lines: [
    { id: "l1", productName: "Steel Bolts M10", productSku: "STL-BLT-M10", expectedQuantity: 250, receivedQuantity: 250 },
    { id: "l2", productName: "Hex Nuts M12", productSku: "HEX-NUT-M12", expectedQuantity: 500, receivedQuantity: 480 },
    { id: "l3", productName: "Aluminum Sheets 4x8", productSku: "ALM-SHT-4X8", expectedQuantity: 100, receivedQuantity: null },
    { id: "l4", productName: "Carbon Steel Plates", productSku: "CRB-STL-PLT", expectedQuantity: 50, receivedQuantity: null },
    { id: "l5", productName: "Stainless Welding Rods", productSku: "STN-WLD-ROD", expectedQuantity: 75, receivedQuantity: null },
  ],
};

export default function ReceiptDetailPage() {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(false);
  const [receivedQuantities, setReceivedQuantities] = useState<Record<string, string>>(
    Object.fromEntries(
      receipt.lines.map((l) => [
        l.id,
          l.receivedQuantity !== null ? String(l.receivedQuantity) : "",
      ])
    )
  );

  const updateQty = (id: string, value: string) => {
    setReceivedQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const allFilled = receipt.lines.every((l) => receivedQuantities[l.id] !== "");

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      router.push("/receipts");
    }, 2000);
  };

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
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>Receipt {receipt.reference}</h1>
              <StatusBadge status={receipt.status} />
            </div>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0 }}>Created by {receipt.createdBy} on {receipt.createdAt}</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
            <Printer size={14} /> Print
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Receipt Info */}
          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Receipt Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { icon: <Truck size={14} />, label: "Supplier", value: receipt.supplierName },
                { icon: <MapPin size={14} />, label: "Location", value: receipt.locationName },
                { icon: <CalendarDays size={14} />, label: "Expected", value: receipt.expectedDate },
                { icon: <FileCheck size={14} />, label: "Status", value: receipt.status },
              ].map((field) => (
                <div key={field.label} style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "var(--radius-sm)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }}>{field.icon}</div>
                  <div>
                    <p className="text-label" style={{ margin: "0 0 2px 0" }}>{field.label}</p>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>{field.value}</p>
                  </div>
                </div>
              ))}
              {receipt.notes && (
                <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "var(--radius-sm)", background: "var(--color-warning-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-warning)", flexShrink: 0, marginTop: "2px" }}><StickyNote size={14} /></div>
                  <div>
                    <p className="text-label" style={{ margin: "0 0 2px 0" }}>Notes</p>
                    <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{receipt.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Validation Table */}
          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-border)" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Products — Validate Received Quantities</h3>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--color-text-secondary)" }}>Enter the actual quantity received for each product</p>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                  {["#", "Product", "Expected", "Received", "Status"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {receipt.lines.map((line, i) => {
                  const received = receivedQuantities[line.id];
                  const receivedNum = received !== "" ? parseInt(received) : null;
                  const isComplete = receivedNum !== null && receivedNum === line.expectedQuantity;
                  const isPartial = receivedNum !== null && receivedNum > 0 && receivedNum < line.expectedQuantity;
                  const isOver = receivedNum !== null && receivedNum > line.expectedQuantity;

                  return (
                    <motion.tr key={line.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      style={{ borderBottom: "1px solid var(--color-border)", height: "60px" }}>
                      <td style={{ padding: "12px 16px", color: "var(--color-text-muted)", fontSize: "12px" }}>{i + 1}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-primary)" }}>{line.productName}</p>
                        <p style={{ margin: "2px 0 0", fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-muted)" }}>{line.productSku}</p>
                      </td>
                      <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: "var(--color-text-primary)" }}>{line.expectedQuantity}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <input
                          type="number"
                          value={received}
                          onChange={(e) => updateQty(line.id, e.target.value)}
                          min={0}
                          placeholder="0"
                          style={{
                            width: "100px",
                            padding: "8px 12px",
                            borderRadius: "var(--radius-md)",
                            border: `1px solid ${isPartial || isOver ? "var(--color-warning)" : isComplete ? "var(--color-success)" : "var(--color-border)"}`,
                            fontSize: "14px",
                            fontFamily: "var(--font-geist-mono)",
                            fontWeight: 600,
                            outline: "none",
                            textAlign: "center",
                          }}
                        />
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {receivedNum === null ? (
                          <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Pending</span>
                        ) : isComplete ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-success)", fontWeight: 500 }}>
                            <CheckCircle2 size={14} /> Complete
                          </span>
                        ) : isPartial ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-warning)", fontWeight: 500 }}>
                            <AlertCircle size={14} /> Partial ({receivedNum}/{line.expectedQuantity})
                          </span>
                        ) : isOver ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-warning)", fontWeight: 500 }}>
                            <AlertCircle size={14} /> Over-received
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-error)", fontWeight: 500 }}>
                            <AlertCircle size={14} /> None received
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "sticky", top: "88px" }}>
          {/* Summary */}
          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: 600 }}>Validation Summary</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Total Products", value: receipt.lines.length },
                { label: "Expected Total", value: receipt.lines.reduce((s, l) => s + l.expectedQuantity, 0) },
                { label: "Received Total", value: receipt.lines.reduce((s, l) => s + (parseInt(receivedQuantities[l.id]) || 0), 0) },
                { label: "Validated", value: receipt.lines.filter((l) => receivedQuantities[l.id] !== "").length + "/" + receipt.lines.length },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{item.label}</span>
                  <span style={{ fontSize: "14px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: "var(--color-text-primary)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Validate Button */}
          <motion.button
            onClick={handleValidate}
            disabled={!allFilled || isValidating}
            whileTap={{ scale: 0.97 }}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              background: allFilled ? "var(--color-success)" : "var(--color-border)",
              color: allFilled ? "#fff" : "var(--color-text-muted)",
              border: "none",
              fontSize: "14px",
              fontWeight: 600,
              cursor: allFilled ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontFamily: "inherit",
              transition: "background 0.2s ease",
            }}
          >
            <Check size={16} />
            {isValidating ? "Validating..." : "Validate & Receive"}
          </motion.button>

          {!allFilled && (
            <p style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "center" }}>Fill in all received quantities to validate</p>
          )}
        </div>
      </div>
    </div>
  );
}
