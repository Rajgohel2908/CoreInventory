"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Trash2, 
  AlertCircle,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  User,
  History
} from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";

export default function AdjustmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [count, setCount] = useState(22);
  const [reason, setReason] = useState("Count Error");
  const [saving, setSaving] = useState(false);

  // Mock data for the adjustment
  const adjustment = {
    ref: decodeURIComponent(id),
    product: "Carbon Steel Plates",
    location: "Main Rack A",
    recorded: 22,
    status: "Draft",
    operator: "Jane Smith",
    time: "Today 09:10",
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/adjustments");
    }, 1000);
  };

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
          <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold text-slate-900">{adjustment.ref}</h1>
             <StatusBadge status={adjustment.status} />
          </div>
          <p className="text-sm text-slate-500">Executing manual cycle count adjustment.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <Trash2 size={16} />
            Discard
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            {saving ? "Saving..." : <><Save size={16} /> Complete Count</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Package size={20} className="text-indigo-600" />
              Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Product</p>
                  <p className="text-base font-medium text-slate-900">{adjustment.product}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Current Inventory</p>
                  <p className="text-2xl font-bold text-slate-900">{adjustment.recorded} Units</p>
                  <p className="text-xs text-slate-500 mt-1">Status: In Stock</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Storage Location</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="text-base font-medium text-slate-900">{adjustment.location}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Operator</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User size={16} className="text-slate-400" />
                    <span className="text-base font-medium text-slate-900">{adjustment.operator}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Actual Count Input</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Physical Counted Quantity</label>
                <input 
                  type="number" 
                  value={count}
                  onChange={(e) => setCount(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-lg font-bold text-slate-900 focus:border-indigo-500 focus:outline-none"
                />
                <p className="text-xs text-slate-500">Enter the exact quantity found in the bin.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Reason for Variance</label>
                <select 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Count Error">Count Error</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Missing">Missing</option>
                  <option value="Expired">Expired</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-lg bg-amber-50 p-4 border border-amber-100">
              <AlertCircle className="text-amber-600 shrink-0" size={18} />
              <p className="text-sm text-amber-800">
                A delta of <span className="font-bold">{count - adjustment.recorded}</span> will be recorded in the system logs.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <History size={18} className="text-indigo-600" />
              History
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-0.5 bg-slate-100 relative">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Task Assigned</p>
                  <p className="text-xs text-slate-500">{adjustment.time}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-0.5 bg-slate-100 relative" />
                <div>
                  <p className="text-sm font-semibold text-slate-900 text-slate-400 font-normal">Count Execution</p>
                  <p className="text-xs text-slate-400">Waiting for input...</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-emerald-600" size={20} />
                <h3 className="text-base font-semibold text-slate-900">Compliance</h3>
             </div>
             <p className="text-xs text-slate-600 leading-relaxed">
               All inventory adjustments are logged for audit purposes. High-value deltas may require manager approval.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
