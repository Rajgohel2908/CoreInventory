"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";
import {
  ArrowLeft,
  User,
  MapPin,
  CalendarDays,
  StickyNote,
  Printer,
  PackageCheck,
  CheckCircle2,
  Circle,
  AlertCircle,
  Check,
} from "lucide-react";

const delivery = {
  reference: "DEL/2026/0045",
  customerName: "BuildMax Ltd.",
  deliveryAddress: "42 Industrial Zone, Chennai - 600032",
  scheduledDate: "Mar 14, 2026",
  locationName: "Main Warehouse / Rack A",
  priority: "Normal" as const,
  notes: "Customer requests delivery before noon.",
  status: "Picking" as const,
  createdBy: "Jane Smith",
  createdAt: "Mar 12, 2026 11:00",
  lines: [
    { id: "dl1", productName: "Steel Bolts M10", productSku: "STL-BLT-M10", quantity: 250, pickedQuantity: 250, isPicked: true },
    { id: "dl2", productName: "Hex Nuts M12", productSku: "HEX-NUT-M12", quantity: 500, pickedQuantity: 300, isPicked: false },
    { id: "dl3", productName: "PVC Connectors", productSku: "PVC-CON-TJ", quantity: 100, pickedQuantity: 0, isPicked: false },
    { id: "dl4", productName: "Rubber Seals 50mm", productSku: "RBR-SEL-50", quantity: 200, pickedQuantity: 0, isPicked: false },
  ],
};

// Workflow steps
const workflowSteps = [
  { key: "Draft", label: "Draft" },
  { key: "Confirmed", label: "Confirmed" },
  { key: "Picking", label: "Picking" },
  { key: "Packed", label: "Packed" },
  { key: "Dispatched", label: "Dispatched" },
  { key: "Done", label: "Done" },
];

export default function DeliveryDetailPage() {
  const router = useRouter();
  const [pickedQty, setPickedQty] = useState<Record<string, string>>(
    Object.fromEntries(
      delivery.lines.map((l) => [l.id, l.pickedQuantity > 0 ? String(l.pickedQuantity) : ""])
    )
  );
  const [isAdvancing, setIsAdvancing] = useState(false);

  const currentStepIndex = workflowSteps.findIndex((s) => s.key === delivery.status);

  const updatePickedQty = (id: string, value: string) => {
    setPickedQty((prev) => ({ ...prev, [id]: value }));
  };

  const allPicked = delivery.lines.every((l) => {
    const qty = parseInt(pickedQty[l.id]);
    return !isNaN(qty) && qty > 0;
  });

  const totalOrdered = delivery.lines.reduce((s, l) => s + l.quantity, 0);
  const totalPicked = delivery.lines.reduce(
    (s, l) => s + (parseInt(pickedQty[l.id]) || 0),
    0
  );
  const pickProgress = totalOrdered > 0 ? Math.round((totalPicked / totalOrdered) * 100) : 0;

  const handleAdvanceStatus = () => {
    setIsAdvancing(true);
    setTimeout(() => {
      setIsAdvancing(false);
      router.push("/deliveries");
    }, 1500);
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
              <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>Delivery {delivery.reference}</h1>
              <StatusBadge status={delivery.status} />
            </div>
            <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0 }}>{delivery.customerName} · {delivery.scheduledDate}</p>
          </div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: "13px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
          <Printer size={14} /> Print Slip
        </button>
      </div>

      {/* Workflow Progress Bar */}
      <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)", marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {workflowSteps.map((step, i) => (
            <React.Fragment key={step.key}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  background: i < currentStepIndex ? "var(--color-success)" : i === currentStepIndex ? "var(--color-primary)" : "var(--color-border)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.3s ease",
                }}>
                  {i < currentStepIndex ? (
                    <CheckCircle2 size={16} color="#fff" />
                  ) : i === currentStepIndex ? (
                    <Circle size={12} fill="#fff" color="#fff" />
                  ) : (
                    <Circle size={12} color="var(--color-text-muted)" />
                  )}
                </div>
                <span style={{ fontSize: "11px", fontWeight: i === currentStepIndex ? 600 : 400, color: i <= currentStepIndex ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>{step.label}</span>
              </div>
              {i < workflowSteps.length - 1 && (
                <div style={{ flex: 1, height: "2px", background: i < currentStepIndex ? "var(--color-success)" : "var(--color-border)", margin: "0 8px 20px" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "24px", alignItems: "start" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Delivery Info */}
          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Delivery Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { icon: <User size={14} />, label: "Customer", value: delivery.customerName },
                { icon: <MapPin size={14} />, label: "Source", value: delivery.locationName },
                { icon: <CalendarDays size={14} />, label: "Scheduled", value: delivery.scheduledDate },
                { icon: <AlertCircle size={14} />, label: "Priority", value: delivery.priority },
              ].map((field) => (
                <div key={field.label} style={{ display: "flex", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "var(--radius-sm)", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", flexShrink: 0, marginTop: "2px" }}>{field.icon}</div>
                  <div>
                    <p className="text-label" style={{ margin: "0 0 2px 0" }}>{field.label}</p>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>{field.value}</p>
                  </div>
                </div>
              ))}
              {delivery.deliveryAddress && (
                <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "var(--radius-sm)", background: "var(--color-info-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-info)", flexShrink: 0, marginTop: "2px" }}><MapPin size={14} /></div>
                  <div>
                    <p className="text-label" style={{ margin: "0 0 2px 0" }}>Delivery Address</p>
                    <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)" }}>{delivery.deliveryAddress}</p>
                  </div>
                </div>
              )}
              {delivery.notes && (
                <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "var(--radius-sm)", background: "var(--color-warning-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-warning)", flexShrink: 0, marginTop: "2px" }}><StickyNote size={14} /></div>
                  <div>
                    <p className="text-label" style={{ margin: "0 0 2px 0" }}>Notes</p>
                    <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)" }}>{delivery.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pick List */}
          <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Pick List</h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--color-text-secondary)" }}>Enter picked quantities for each item</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "80px", height: "6px", background: "var(--color-border)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pickProgress}%`, background: pickProgress === 100 ? "var(--color-success)" : "var(--color-primary)", borderRadius: "3px", transition: "width 0.3s ease" }} />
                </div>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: pickProgress === 100 ? "var(--color-success)" : "var(--color-text-muted)" }}>{pickProgress}%</span>
              </div>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                  {["#", "Product", "Ordered", "Picked", "Status"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {delivery.lines.map((line, i) => {
                  const picked = parseInt(pickedQty[line.id]) || 0;
                  const isComplete = picked >= line.quantity;
                  const isPartial = picked > 0 && picked < line.quantity;

                  return (
                    <motion.tr key={line.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                      style={{ borderBottom: "1px solid var(--color-border)", height: "60px", background: isComplete ? "rgba(16, 185, 129, 0.03)" : "transparent" }}>
                      <td style={{ padding: "12px 16px", color: "var(--color-text-muted)" }}>{i + 1}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontWeight: 500, color: "var(--color-text-primary)" }}>{line.productName}</p>
                        <p style={{ margin: "2px 0 0", fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-muted)" }}>{line.productSku}</p>
                      </td>
                      <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 600 }}>{line.quantity}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <input type="number" value={pickedQty[line.id]} min={0} max={line.quantity}
                          onChange={(e) => updatePickedQty(line.id, e.target.value)}
                          style={{
                            width: "100px", padding: "8px 12px", borderRadius: "var(--radius-md)",
                            border: `1px solid ${isComplete ? "var(--color-success)" : isPartial ? "var(--color-warning)" : "var(--color-border)"}`,
                            fontSize: "14px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, outline: "none", textAlign: "center",
                          }}
                        />
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        {isComplete ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-success)", fontWeight: 500 }}>
                            <PackageCheck size={14} /> Picked
                          </span>
                        ) : isPartial ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--color-warning)", fontWeight: 500 }}>
                            <AlertCircle size={14} /> Partial
                          </span>
                        ) : (
                          <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>Pending</span>
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
            <h4 style={{ margin: "0 0 16px 0", fontSize: "14px", fontWeight: 600 }}>Pick Summary</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Total Items", value: delivery.lines.length },
                { label: "Ordered Total", value: totalOrdered },
                { label: "Picked Total", value: totalPicked },
                { label: "Progress", value: `${pickProgress}%` },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>{item.label}</span>
                  <span style={{ fontSize: "14px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: "var(--color-text-primary)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <motion.button onClick={handleAdvanceStatus} disabled={!allPicked || isAdvancing} whileTap={{ scale: 0.97 }}
              style={{
                width: "100%", padding: "14px", borderRadius: "var(--radius-md)",
                background: allPicked ? "var(--color-success)" : "var(--color-border)",
                color: allPicked ? "#fff" : "var(--color-text-muted)",
                border: "none", fontSize: "14px", fontWeight: 600,
                cursor: allPicked ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "inherit",
              }}>
              <Check size={16} /> {isAdvancing ? "Processing..." : "Confirm Pick & Pack"}
            </motion.button>
            {!allPicked && <p style={{ fontSize: "12px", color: "var(--color-text-muted)", textAlign: "center" }}>Pick all items to proceed</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
