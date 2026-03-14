"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Loader2,
  MapPin,
  CalendarDays,
  StickyNote,
  Plus,
  Trash2,
  Package,
  Check,
  ArrowRightLeft,
} from "lucide-react";
import { generateReference } from "@/lib/reference";

const demoProducts = [
  { id: "1", name: "Steel Bolts M10", sku: "STL-BLT-M10" },
  { id: "2", name: "Copper Pipes 2m", sku: "CPR-PIP-2M" },
  { id: "3", name: "Safety Gloves XL", sku: "SFT-GLV-XL" },
  { id: "5", name: "Aluminum Sheets", sku: "ALM-SHT-4X8" },
  { id: "6", name: "PVC Connectors", sku: "PVC-CON-TJ" },
  { id: "8", name: "Rubber Seals 50mm", sku: "RBR-SEL-50" },
];

const demoLocations = [
  { id: "loc1", name: "Main Warehouse / Rack A" },
  { id: "loc2", name: "Main Warehouse / Rack B" },
  { id: "loc3", name: "East Wing / Zone A" },
  { id: "loc4", name: "East Wing / Zone B" },
  { id: "loc5", name: "South Dock / Bay 1" },
  { id: "loc6", name: "West Storage / Zone A" },
];

interface TransferLineForm {
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
}

const steps = ["Source & Destination", "Add Products", "Review & Submit"];

export default function CreateTransferPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [sourceLocationId, setSourceLocationId] = useState("");
  const [destLocationId, setDestLocationId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<TransferLineForm[]>([]);

  const reference = generateReference("TRF");

  const addLine = () => {
    setLines((prev) => [...prev, { productId: "", productName: "", productSku: "", quantity: 1 }]);
  };
  const removeLine = (index: number) => setLines((prev) => prev.filter((_, i) => i !== index));
  const updateLine = (index: number, field: keyof TransferLineForm, value: string | number) => {
    setLines((prev) =>
      prev.map((line, i) => {
        if (i !== index) return line;
        if (field === "productId") {
          const product = demoProducts.find((p) => p.id === value);
          return { ...line, productId: value as string, productName: product?.name || "", productSku: product?.sku || "" };
        }
        return { ...line, [field]: value };
      })
    );
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    if (step === 0) {
      if (!sourceLocationId) newErrors.sourceLocationId = "Source location is required";
      if (!destLocationId) newErrors.destLocationId = "Destination is required";
      if (sourceLocationId && destLocationId && sourceLocationId === destLocationId)
        newErrors.destLocationId = "Source and destination must differ";
    }
    if (step === 1) {
      if (lines.length === 0) newErrors.lines = "Add at least one product";
      lines.forEach((line, i) => {
        if (!line.productId) newErrors[`line_${i}_product`] = "Select product";
        if (line.quantity < 1) newErrors[`line_${i}_qty`] = "Qty must be ≥ 1";
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => { if (!validateStep(currentStep)) return; setCurrentStep((p) => Math.min(p + 1, steps.length - 1)); };
  const prevStep = () => setCurrentStep((p) => Math.max(p - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); router.push("/transfers"); }, 1500);
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px 10px 40px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", fontSize: "14px", color: "var(--color-text-primary)", background: "var(--color-surface)", outline: "none", fontFamily: "inherit" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "13px", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "6px" };

  const sourceLocation = demoLocations.find((l) => l.id === sourceLocationId);
  const destLocation = demoLocations.find((l) => l.id === destLocationId);

  return (
    <div>
      <Breadcrumbs />
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <button onClick={() => router.back()} style={{ width: "36px", height: "36px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--color-text-secondary)" }}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>New Internal Transfer</h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0, fontFamily: "var(--font-geist-mono)" }}>{reference}</p>
        </div>
      </div>

      {/* Step Indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: "0", marginBottom: "32px", maxWidth: "600px" }}>
        {steps.map((step, i) => (
          <React.Fragment key={step}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: i < currentStep ? "var(--color-success)" : i === currentStep ? "var(--color-primary)" : "var(--color-border)", color: i <= currentStep ? "#fff" : "var(--color-text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, transition: "all 0.3s ease" }}>
                {i < currentStep ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: "13px", fontWeight: i === currentStep ? 600 : 400, color: i === currentStep ? "var(--color-text-primary)" : "var(--color-text-muted)", whiteSpace: "nowrap" }}>{step}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: "2px", background: i < currentStep ? "var(--color-success)" : "var(--color-border)", margin: "0 12px", transition: "background 0.3s ease" }} />}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)", maxWidth: "680px" }}>
            <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Source & Destination</h3>

            {/* Transfer visual */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", padding: "20px", borderRadius: "var(--radius-lg)", background: "var(--color-background)" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <p className="text-label" style={{ margin: "0 0 8px 0" }}>FROM</p>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: sourceLocation ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                  {sourceLocation?.name || "Select source"}
                </p>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ArrowRightLeft size={18} color="var(--color-primary)" />
              </div>
              <div style={{ flex: 1, textAlign: "center" }}>
                <p className="text-label" style={{ margin: "0 0 8px 0" }}>TO</p>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: destLocation ? "var(--color-text-primary)" : "var(--color-text-muted)" }}>
                  {destLocation?.name || "Select destination"}
                </p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Source Location <span style={{ color: "var(--color-error)" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <select value={sourceLocationId} onChange={(e) => { setSourceLocationId(e.target.value); setErrors((p) => ({ ...p, sourceLocationId: "" })); }} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select source</option>
                    {demoLocations.map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                  </select>
                </div>
                {errors.sourceLocationId && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--color-error)" }}>{errors.sourceLocationId}</p>}
              </div>
              <div>
                <label style={labelStyle}>Destination Location <span style={{ color: "var(--color-error)" }}>*</span></label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <select value={destLocationId} onChange={(e) => { setDestLocationId(e.target.value); setErrors((p) => ({ ...p, destLocationId: "" })); }} style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">Select destination</option>
                    {demoLocations.filter((l) => l.id !== sourceLocationId).map((loc) => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                  </select>
                </div>
                {errors.destLocationId && <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--color-error)" }}>{errors.destLocationId}</p>}
              </div>
              <div>
                <label style={labelStyle}>Scheduled Date</label>
                <div style={{ position: "relative" }}>
                  <CalendarDays size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                  <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Notes</label>
                <div style={{ position: "relative" }}>
                  <StickyNote size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--color-text-muted)" }} />
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." rows={2}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "60px" }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>Products to Transfer</h3>
              <button type="button" onClick={addLine} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 14px", borderRadius: "var(--radius-md)", background: "var(--color-primary-light)", color: "var(--color-primary)", border: "none", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <Plus size={14} /> Add Product
              </button>
            </div>
            {lines.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--color-text-muted)" }}>
                <Package size={48} style={{ marginBottom: "12px", opacity: 0.3 }} />
                <p style={{ fontSize: "14px", margin: "0 0 4px 0" }}>No products added yet</p>
                {errors.lines && <p style={{ fontSize: "12px", color: "var(--color-error)", marginTop: "8px" }}>{errors.lines}</p>}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {lines.map((line, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px", borderRadius: "var(--radius-lg)", background: "var(--color-background)", border: "1px solid var(--color-border)" }}>
                    <span style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--color-primary-light)", color: "var(--color-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 600, flexShrink: 0, marginTop: "4px" }}>{index + 1}</span>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ ...labelStyle, fontSize: "11px" }}>Product</label>
                        <select value={line.productId} onChange={(e) => updateLine(index, "productId", e.target.value)}
                          style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: `1px solid ${errors[`line_${index}_product`] ? "var(--color-error)" : "var(--color-border)"}`, fontSize: "13px", outline: "none", fontFamily: "inherit", cursor: "pointer" }}>
                          <option value="">Select product</option>
                          {demoProducts.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={{ ...labelStyle, fontSize: "11px" }}>Quantity</label>
                        <input type="number" value={line.quantity} min={1} onChange={(e) => updateLine(index, "quantity", parseInt(e.target.value) || 0)}
                          style={{ width: "100%", padding: "8px 12px", borderRadius: "var(--radius-md)", border: `1px solid ${errors[`line_${index}_qty`] ? "var(--color-error)" : "var(--color-border)"}`, fontSize: "13px", fontFamily: "var(--font-geist-mono)", outline: "none" }} />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeLine(index)} style={{ width: "32px", height: "32px", borderRadius: "var(--radius-md)", border: "none", background: "var(--color-error-light)", color: "var(--color-error)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: "4px" }}>
                      <Trash2 size={14} />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            style={{ maxWidth: "680px" }}>
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", padding: "24px", boxShadow: "var(--shadow-md)", marginBottom: "20px" }}>
              <h3 style={{ margin: "0 0 20px 0", fontSize: "16px", fontWeight: 600 }}>Review Transfer</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", padding: "16px", borderRadius: "var(--radius-lg)", background: "var(--color-background)" }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <p className="text-label" style={{ margin: "0 0 4px 0" }}>FROM</p>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{sourceLocation?.name}</p>
                </div>
                <ArrowRightLeft size={18} color="var(--color-primary)" />
                <div style={{ flex: 1, textAlign: "center" }}>
                  <p className="text-label" style={{ margin: "0 0 4px 0" }}>TO</p>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{destLocation?.name}</p>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Reference", value: reference },
                  { label: "Scheduled", value: scheduledDate || "Not set" },
                ].map((f) => (
                  <div key={f.label}>
                    <p className="text-label" style={{ margin: "0 0 4px 0" }}>{f.label}</p>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, fontFamily: f.label === "Reference" ? "var(--font-geist-mono)" : "inherit" }}>{f.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-xl)", border: "1px solid var(--color-border)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)" }}>
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>{lines.length} products</h4>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                    <th style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase" }}>Product</th>
                    <th style={{ padding: "10px 16px", textAlign: "right", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase" }}>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <td style={{ padding: "10px 16px" }}>
                        <p style={{ margin: 0, fontWeight: 500 }}>{line.productName}</p>
                        <p style={{ margin: "2px 0 0", fontSize: "11px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-muted)" }}>{line.productSku}</p>
                      </td>
                      <td style={{ padding: "10px 16px", textAlign: "right", fontFamily: "var(--font-geist-mono)", fontWeight: 600 }}>{line.quantity}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "var(--color-background)" }}>
                    <td style={{ padding: "12px 16px", fontWeight: 600 }}>Total</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontFamily: "var(--font-geist-mono)", fontWeight: 700, fontSize: "15px", color: "var(--color-primary)" }}>{lines.reduce((s, l) => s + l.quantity, 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px", maxWidth: currentStep === 1 ? "100%" : "680px" }}>
        <button onClick={prevStep} disabled={currentStep === 0}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface)", color: currentStep === 0 ? "var(--color-text-muted)" : "var(--color-text-primary)", fontSize: "14px", fontWeight: 500, cursor: currentStep === 0 ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: currentStep === 0 ? 0.5 : 1 }}>
          <ArrowLeft size={14} /> Previous
        </button>
        {currentStep < steps.length - 1 ? (
          <button onClick={nextStep} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", borderRadius: "var(--radius-md)", background: "var(--color-primary)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Next <ArrowRight size={14} />
          </button>
        ) : (
          <motion.button onClick={handleSubmit} disabled={isSubmitting} whileTap={{ scale: 0.97 }}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 24px", borderRadius: "var(--radius-md)", background: "var(--color-success)", color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
            {isSubmitting ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Save size={16} />}
            {isSubmitting ? "Saving..." : "Create Transfer"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
