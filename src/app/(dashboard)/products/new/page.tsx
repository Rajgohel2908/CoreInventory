"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import {
  Package,
  Barcode,
  Tag,
  Ruler,
  FileText,
  ImagePlus,
  AlertTriangle,
  ArrowLeft,
  Save,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { UNITS_OF_MEASURE } from "@/lib/constants";
import { generateSku } from "@/lib/reference";

const categories = [
  "Fasteners",
  "Piping",
  "PPE",
  "Electrical",
  "Metal",
  "Ropes",
  "Seals",
  "Welding",
  "Tools",
  "Lubricants",
];

export default function CreateProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    unitOfMeasure: "units",
    description: "",
    initialStock: "",
    reorderPoint: "",
    reorderQty: "",
  });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const autoGenerateSku = () => {
    if (form.name) {
      updateField("sku", generateSku(form.name));
    }
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: "Max file size is 5MB" }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
        setErrors((prev) => ({ ...prev, image: "" }));
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (!file) return;
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Only PNG, JPG, WEBP allowed",
        }));
        return;
      }
      const fakeEvent = {
        target: { files: [file] },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleImageUpload(fakeEvent);
    },
    [handleImageUpload]
  );

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Product name is required";
    if (!form.sku.trim()) newErrors.sku = "SKU is required";
    if (!form.category) newErrors.category = "Category is required";
    if (form.name.length > 120)
      newErrors.name = "Max 120 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/products");
    }, 1500);
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "10px 12px 10px 40px",
    borderRadius: "var(--radius-md)",
    border: `1px solid ${hasError ? "var(--color-error)" : "var(--color-border)"}`,
    fontSize: "14px",
    color: "var(--color-text-primary)",
    background: "var(--color-surface)",
    outline: "none",
    fontFamily: "inherit",
    transition:
      "border-color var(--duration-micro) ease, box-shadow var(--duration-micro) ease",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--color-text-primary)",
    marginBottom: "6px",
  };

  return (
    <div>
      <Breadcrumbs />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
          }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: "4px",
            }}
          >
            Create New Product
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-secondary)",
              margin: 0,
            }}
          >
            Add a new product to your inventory catalog
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Main Form */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Basic Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "24px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Basic Information
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {/* Product Name */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="productName" style={labelStyle}>
                    Product Name <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Package
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      id="productName"
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="e.g., Steel Bolts M10 Grade 8.8"
                      maxLength={120}
                      style={inputStyle(!!errors.name)}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "4px",
                    }}
                  >
                    {errors.name ? (
                      <p
                        style={{
                          margin: 0,
                          fontSize: "12px",
                          color: "var(--color-error)",
                        }}
                      >
                        {errors.name}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {form.name.length}/120
                    </span>
                  </div>
                </div>

                {/* SKU */}
                <div>
                  <label htmlFor="sku" style={labelStyle}>
                    SKU / Code <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Barcode
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <input
                      id="sku"
                      type="text"
                      value={form.sku}
                      onChange={(e) =>
                        updateField("sku", e.target.value.toUpperCase())
                      }
                      placeholder="STL-BLT-M10"
                      style={{
                        ...inputStyle(!!errors.sku),
                        paddingRight: "90px",
                        fontFamily: "var(--font-geist-mono)",
                      }}
                    />
                    <button
                      type="button"
                      onClick={autoGenerateSku}
                      style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "4px 10px",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--color-primary-light)",
                        color: "var(--color-primary)",
                        border: "none",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontFamily: "inherit",
                      }}
                    >
                      <Sparkles size={10} /> Auto
                    </button>
                  </div>
                  {errors.sku && (
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--color-error)",
                      }}
                    >
                      {errors.sku}
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" style={labelStyle}>
                    Category <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  {!showNewCategory ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{ position: "relative", flex: 1 }}
                      >
                        <Tag
                          size={16}
                          style={{
                            position: "absolute",
                            left: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--color-text-muted)",
                          }}
                        />
                        <select
                          id="category"
                          value={form.category}
                          onChange={(e) =>
                            updateField("category", e.target.value)
                          }
                          style={{
                            ...inputStyle(!!errors.category),
                            cursor: "pointer",
                          }}
                        >
                          <option value="">Select category</option>
                          {categories.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowNewCategory(true)}
                        style={{
                          padding: "10px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          cursor: "pointer",
                          color: "var(--color-text-muted)",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          fontFamily: "inherit",
                        }}
                      >
                        + New
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ position: "relative", flex: 1 }}>
                        <Tag
                          size={16}
                          style={{
                            position: "absolute",
                            left: "12px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--color-text-muted)",
                          }}
                        />
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="New category name"
                          style={inputStyle(false)}
                          autoFocus
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (newCategory.trim()) {
                            updateField("category", newCategory.trim());
                          }
                          setShowNewCategory(false);
                          setNewCategory("");
                        }}
                        style={{
                          padding: "10px 14px",
                          borderRadius: "var(--radius-md)",
                          background: "var(--color-primary)",
                          color: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontFamily: "inherit",
                        }}
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewCategory(false);
                          setNewCategory("");
                        }}
                        style={{
                          padding: "10px",
                          borderRadius: "var(--radius-md)",
                          border: "1px solid var(--color-border)",
                          background: "var(--color-surface)",
                          cursor: "pointer",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {errors.category && (
                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "var(--color-error)",
                      }}
                    >
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Unit of Measure */}
                <div>
                  <label htmlFor="unit" style={labelStyle}>
                    Unit of Measure <span style={{ color: "var(--color-error)" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <Ruler
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <select
                      id="unit"
                      value={form.unitOfMeasure}
                      onChange={(e) =>
                        updateField("unitOfMeasure", e.target.value)
                      }
                      style={{
                        ...inputStyle(false),
                        cursor: "pointer",
                      }}
                    >
                      {UNITS_OF_MEASURE.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label htmlFor="description" style={labelStyle}>
                    Description
                  </label>
                  <div style={{ position: "relative" }}>
                    <FileText
                      size={16}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "14px",
                        color: "var(--color-text-muted)",
                      }}
                    />
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      placeholder="Optional product description..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "10px 12px 10px 40px",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--color-border)",
                        fontSize: "14px",
                        color: "var(--color-text-primary)",
                        background: "var(--color-surface)",
                        outline: "none",
                        fontFamily: "inherit",
                        resize: "vertical",
                        minHeight: "80px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stock & Reorder Section */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "24px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 20px 0",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Stock & Reorder Rules
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "16px",
                }}
              >
                {/* Initial Stock */}
                <div>
                  <label style={labelStyle}>Initial Stock</label>
                  <input
                    type="number"
                    value={form.initialStock}
                    onChange={(e) =>
                      updateField("initialStock", e.target.value)
                    }
                    placeholder="0"
                    min={0}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      fontSize: "14px",
                      fontFamily: "var(--font-geist-mono)",
                      outline: "none",
                    }}
                  />
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Only during creation
                  </p>
                </div>

                {/* Reorder Point */}
                <div>
                  <label style={labelStyle}>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Reorder Point
                      <AlertTriangle
                        size={12}
                        color="var(--color-warning)"
                      />
                    </span>
                  </label>
                  <input
                    type="number"
                    value={form.reorderPoint}
                    onChange={(e) =>
                      updateField("reorderPoint", e.target.value)
                    }
                    placeholder="0"
                    min={0}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      fontSize: "14px",
                      fontFamily: "var(--font-geist-mono)",
                      outline: "none",
                    }}
                  />
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Triggers low-stock alert
                  </p>
                </div>

                {/* Reorder Quantity */}
                <div>
                  <label style={labelStyle}>Reorder Quantity</label>
                  <input
                    type="number"
                    value={form.reorderQty}
                    onChange={(e) => updateField("reorderQty", e.target.value)}
                    placeholder="0"
                    min={0}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      fontSize: "14px",
                      fontFamily: "var(--font-geist-mono)",
                      outline: "none",
                    }}
                  />
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    Suggested order quantity
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar — Image + Actions */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "24px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                Product Image
              </h3>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                style={{
                  border: "2px dashed var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "32px 16px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "border-color var(--duration-micro) ease",
                  background: imagePreview
                    ? "transparent"
                    : "var(--color-background)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
                onClick={() =>
                  document.getElementById("imageUpload")?.click()
                }
              >
                {imagePreview ? (
                  <div style={{ position: "relative" }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "var(--radius-md)",
                        objectFit: "contain",
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                      }}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.6)",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  <>
                    <ImagePlus
                      size={32}
                      color="var(--color-text-muted)"
                      style={{ marginBottom: "8px" }}
                    />
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        fontWeight: 500,
                      }}
                    >
                      Drop image here or click to upload
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      PNG, JPG, WEBP — Max 5MB
                    </p>
                  </>
                )}
              </div>
              <input
                id="imageUpload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {errors.image && (
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: "12px",
                    color: "var(--color-error)",
                  }}
                >
                  {errors.image}
                </p>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "var(--color-surface)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                padding: "24px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-primary)",
                  color: "#fff",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontFamily: "inherit",
                  marginBottom: "8px",
                }}
              >
                {isLoading ? (
                  <Loader2
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  <Save size={16} />
                )}
                {isLoading ? "Creating..." : "Create Product"}
              </motion.button>
              <button
                type="button"
                onClick={() => router.back()}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
            </motion.div>
          </div>
        </div>
      </form>

      <style jsx global>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 768px) {
          form > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
