"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Grid3X3,
  List,
  Filter,
  Package,
  ChevronDown,
} from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  reorderPoint: number;
  unit: string;
  warehouse: string;
  image: string;
};

// Demo data
const demoProducts: Product[] = [
  { id: "1", name: "Steel Bolts M10", sku: "STL-BLT-M10", category: "Fasteners", stock: 2450, reorderPoint: 500, unit: "units", warehouse: "Main Warehouse", image: "/assets/images/products/steel-bolts-m10.svg" },
  { id: "2", name: "Copper Pipes 2m", sku: "CPR-PIP-2M", category: "Piping", stock: 89, reorderPoint: 100, unit: "meters", warehouse: "East Wing", image: "/assets/images/products/copper-pipes-2m.svg" },
  { id: "3", name: "Safety Gloves XL", sku: "SFT-GLV-XL", category: "PPE", stock: 1200, reorderPoint: 200, unit: "units", warehouse: "Main Warehouse", image: "/assets/images/products/safety-gloves-xl.svg" },
  { id: "4", name: "LED Panels 60W", sku: "LED-PNL-60W", category: "Electrical", stock: 0, reorderPoint: 50, unit: "units", warehouse: "West Storage", image: "/assets/images/products/led-panels-60w.svg" },
  { id: "5", name: "Aluminum Sheets 4x8", sku: "ALM-SHT-4X8", category: "Metal", stock: 340, reorderPoint: 75, unit: "units", warehouse: "Main Warehouse", image: "/assets/images/products/aluminum-sheets-4x8.svg" },
  { id: "6", name: "PVC Connectors T-Joint", sku: "PVC-CON-TJ", category: "Piping", stock: 5600, reorderPoint: 500, unit: "units", warehouse: "South Dock", image: "/assets/images/products/pvc-connectors-tjoint.svg" },
  { id: "7", name: "Nylon Ropes 10m", sku: "NYL-ROP-10M", category: "Ropes", stock: 45, reorderPoint: 50, unit: "units", warehouse: "South Dock", image: "/assets/images/products/nylon-ropes-10m.svg" },
  { id: "8", name: "Rubber Seals 50mm", sku: "RBR-SEL-50", category: "Seals", stock: 3200, reorderPoint: 300, unit: "units", warehouse: "East Wing", image: "/assets/images/products/rubber-seals-50mm.svg" },
  { id: "9", name: "Hex Nuts M12", sku: "HEX-NUT-M12", category: "Fasteners", stock: 8900, reorderPoint: 1000, unit: "units", warehouse: "Main Warehouse", image: "/assets/images/products/hex-nuts-m12.svg" },
  { id: "10", name: "Stainless Welding Rods", sku: "STN-WLD-ROD", category: "Welding", stock: 0, reorderPoint: 100, unit: "kg", warehouse: "West Storage", image: "/assets/images/products/stainless-welding-rods.svg" },
  { id: "11", name: "Carbon Steel Plates", sku: "CRB-STL-PLT", category: "Metal", stock: 25, reorderPoint: 30, unit: "units", warehouse: "East Wing", image: "/assets/images/products/carbon-steel-plates.svg" },
  { id: "12", name: "Industrial Fans 24in", sku: "IND-FAN-24", category: "Electrical", stock: 67, reorderPoint: 20, unit: "units", warehouse: "West Storage", image: "/assets/images/products/industrial-fans-24in.svg" },
];

function getStockStatus(stock: number, reorderPoint: number): { label: string; type: string } {
  if (stock === 0) return { label: "Out of Stock", type: "error" };
  if (stock < reorderPoint) return { label: "Low Stock", type: "warning" };
  return { label: "In Stock", type: "success" };
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("search") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [unitFilter, setUnitFilter] = useState("All");
  const [warehouseFilter, setWarehouseFilter] = useState("All");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Update internal search state if URL changes
  useEffect(() => {
    const q = searchParams?.get("search");
    if (typeof q === "string") {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filterOptions = useMemo(() => {
    const categories = Array.from(new Set(demoProducts.map((p) => p.category))).sort();
    const units = Array.from(new Set(demoProducts.map((p) => p.unit))).sort();
    const warehouses = Array.from(new Set(demoProducts.map((p) => p.warehouse))).sort();
    return { categories, units, warehouses };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return demoProducts.filter((p) => {
      const status = getStockStatus(p.stock, p.reorderPoint).label;
      const matchesQuery =
        query.length === 0 ||
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
      const matchesStock = stockFilter === "All" || status === stockFilter;
      const matchesUnit = unitFilter === "All" || p.unit === unitFilter;
      const matchesWarehouse = warehouseFilter === "All" || p.warehouse === warehouseFilter;
      return matchesQuery && matchesCategory && matchesStock && matchesUnit && matchesWarehouse;
    });
  }, [searchQuery, categoryFilter, stockFilter, unitFilter, warehouseFilter]);

  const handleResetFilters = () => {
    setCategoryFilter("All");
    setStockFilter("All");
    setUnitFilter("All");
    setWarehouseFilter("All");
  };

  return (
    <div>
      <Breadcrumbs />

      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "4px" }}>
            Products
          </h1>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
            {filteredProducts.length} products in catalog
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "var(--radius-md)",
            background: "var(--color-primary)",
            color: "#fff",
            border: "none",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            boxShadow: "0 1px 3px rgba(26,86,219,0.3)",
          }}
        >
          <Plus size={16} />
          Add Product
        </motion.button>
      </div>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: 1,
            minWidth: "240px",
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              color: "var(--color-text-muted)",
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or SKU..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 40px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              fontSize: "14px",
              color: "var(--color-text-primary)",
              background: "var(--color-surface)",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color var(--duration-micro) ease, box-shadow var(--duration-micro) ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-primary)";
              e.currentTarget.style.boxShadow = "0 0 0 3px var(--color-primary-ring)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "10px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            background: showFilters ? "var(--color-primary-light)" : "var(--color-surface)",
            color: showFilters ? "var(--color-primary)" : "var(--color-text-secondary)",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Filter size={14} />
          Filters
          <ChevronDown size={14} style={{ transform: showFilters ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms" }} />
        </button>

        {/* View Toggle */}
        <div
          style={{
            display: "flex",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setViewMode("grid")}
            style={{
              padding: "8px 12px",
              background: viewMode === "grid" ? "var(--color-primary)" : "var(--color-surface)",
              color: viewMode === "grid" ? "#fff" : "var(--color-text-muted)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <Grid3X3 size={16} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            style={{
              padding: "8px 12px",
              background: viewMode === "list" ? "var(--color-primary)" : "var(--color-surface)",
              color: viewMode === "list" ? "#fff" : "var(--color-text-muted)",
              border: "none",
              borderLeft: "1px solid var(--color-border)",
              cursor: "pointer",
            }}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)",
            padding: "16px 20px",
            marginBottom: "24px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
              color: "var(--color-text-primary)",
              background: "var(--color-surface)",
              fontFamily: "inherit",
              cursor: "pointer",
              minWidth: "160px",
            }}
          >
            <option value="All">All Categories</option>
            {filterOptions.categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
              color: "var(--color-text-primary)",
              background: "var(--color-surface)",
              fontFamily: "inherit",
              cursor: "pointer",
              minWidth: "160px",
            }}
          >
            <option value="All">All Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
              color: "var(--color-text-primary)",
              background: "var(--color-surface)",
              fontFamily: "inherit",
              cursor: "pointer",
              minWidth: "160px",
            }}
          >
            <option value="All">All Units</option>
            {filterOptions.units.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              fontSize: "13px",
              color: "var(--color-text-primary)",
              background: "var(--color-surface)",
              fontFamily: "inherit",
              cursor: "pointer",
              minWidth: "160px",
            }}
          >
            <option value="All">All Warehouses</option>
            {filterOptions.warehouses.map((warehouse) => (
              <option key={warehouse} value={warehouse}>{warehouse}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleResetFilters}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              background: "var(--color-background)",
              color: "var(--color-text-secondary)",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Reset
          </button>
        </motion.div>
      )}

      {/* Products Grid */}
      {viewMode === "grid" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredProducts.map((product, index) => {
            const status = getStockStatus(product.stock, product.reorderPoint);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -2, boxShadow: "var(--shadow-lg)" }}
                style={{
                  background: "var(--color-surface)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "box-shadow var(--duration-micro) ease",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Product Image Placeholder */}
                <div
                  style={{
                    height: "140px",
                    background: "linear-gradient(135deg, var(--color-background), var(--color-border))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottom: "1px solid var(--color-border)",
                    overflow: "hidden",
                  }}
                >
                  {product.image && !failedImages[product.id] ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={() => setFailedImages((prev) => ({ ...prev, [product.id]: true }))}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Package size={40} color="var(--color-text-muted)" style={{ opacity: 0.4 }} />
                  )}
                </div>
                {/* Card Content */}
                <div style={{ padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.4 }}>
                      {product.name}
                    </h4>
                    <StatusBadge
                      status={status.label === "In Stock" ? "Done" : status.label === "Low Stock" ? "Waiting" : "Canceled"}
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      margin: "0 0 12px 0",
                      fontSize: "12px",
                      fontFamily: "var(--font-geist-mono)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {product.sku}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p className="text-label" style={{ margin: "0 0 2px 0", fontSize: "10px" }}>Stock</p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "18px",
                          fontWeight: 700,
                          fontFamily: "var(--font-geist-mono)",
                          color: status.type === "error" ? "var(--color-error)" : status.type === "warning" ? "var(--color-warning)" : "var(--color-text-primary)",
                        }}
                      >
                        {product.stock.toLocaleString()}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "4px 8px",
                        borderRadius: "var(--radius-full)",
                        background: "var(--color-background)",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {product.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-background)" }}>
                {["Product", "SKU", "Category", "Stock", "Status", "Unit"].map((h) => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, color: "var(--color-text-muted)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, i) => {
                const status = getStockStatus(product.stock, product.reorderPoint);
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    style={{ borderBottom: "1px solid var(--color-border)", cursor: "pointer", height: "52px", transition: "background var(--duration-micro) ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-background)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: 500, color: "var(--color-text-primary)" }}>{product.name}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", color: "var(--color-text-muted)", fontSize: "12px" }}>{product.sku}</td>
                    <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{product.category}</td>
                    <td style={{ padding: "12px 16px", fontFamily: "var(--font-geist-mono)", fontWeight: 600, color: status.type === "error" ? "var(--color-error)" : status.type === "warning" ? "var(--color-warning)" : "var(--color-text-primary)" }}>
                      {product.stock.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <StatusBadge status={status.label === "In Stock" ? "Done" : status.label === "Low Stock" ? "Waiting" : "Canceled"} />
                    </td>
                    <td style={{ padding: "12px 16px", color: "var(--color-text-secondary)" }}>{product.unit}</td>
                  </motion.tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: "20px", textAlign: "center", color: "var(--color-text-secondary)" }}>
                    No products match your current search and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "grid" && filteredProducts.length === 0 && (
        <div
          style={{
            padding: "20px",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-lg)",
            background: "var(--color-surface)",
            color: "var(--color-text-secondary)",
            textAlign: "center",
          }}
        >
          No products match your current search and filters.
        </div>
      )}
    </div>
  );
}
