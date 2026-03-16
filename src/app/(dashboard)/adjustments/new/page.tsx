"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Search,
  Plus,
  Package,
  MapPin,
  ClipboardList
} from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function NewAdjustmentPage() {
  const router = useRouter();
  const [productSearch, setProductSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const demoProducts = [
    { id: 1, name: "LED Panels 60W", sku: "LED-60W-001", location: "Zone A-1", current: 12 },
    { id: 2, name: "Nylon Ropes 10m", sku: "NYL-10M-002", location: "Dock B-2", current: 50 },
    { id: 3, name: "Carbon Steel Plates", sku: "STE-PLT-003", location: "Rack C-3", current: 22 },
  ];

  const filteredProducts = demoProducts.filter(p => 
    p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <Breadcrumbs />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">New Cycle Count</h1>
          <p className="text-sm text-slate-500">Initiate a manual inventory adjustment for a product.</p>
        </div>
        <button 
          disabled={!selectedProduct}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
            selectedProduct ? "bg-indigo-600 hover:bg-indigo-700" : "bg-slate-300 cursor-not-allowed"
          }`}
        >
          <Plus size={16} />
          Create Count Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Package size={20} className="text-indigo-600" />
              1. Select Product
            </h3>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search by product name or SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              {filteredProducts.map(product => (
                <div 
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedProduct?.id === product.id 
                    ? "border-indigo-600 bg-indigo-50/30 ring-1 ring-indigo-600" 
                    : "border-slate-100 hover:border-indigo-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                     <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                        <Package size={20} />
                     </div>
                     <div>
                        <p className="font-semibold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500">{product.sku}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-medium text-slate-900">{product.current} in stock</p>
                     <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin size={12} /> {product.location}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <ClipboardList size={18} className="text-indigo-600" />
              Summary
            </h3>
            {selectedProduct ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Target Product</p>
                  <p className="text-sm font-medium text-slate-900">{selectedProduct.name}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Expected Qty</p>
                  <p className="text-sm font-medium text-slate-900">{selectedProduct.current} Units</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  Creating this task will alert the warehouse staff to perform a physical count at {selectedProduct.location}.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                 <Package className="mx-auto text-slate-200 mb-2" size={32} />
                 <p className="text-sm text-slate-400">Select a product to see details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
