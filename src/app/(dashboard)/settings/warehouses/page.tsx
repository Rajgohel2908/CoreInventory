"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Shield, CheckSquare, ArrowLeftRight, Truck, ClipboardCheck, SlidersHorizontal, Plus } from "lucide-react";

type PermissionKey = "transfers" | "picking" | "shelving" | "counting";

const defaultPermissions: Record<PermissionKey, boolean> = {
  transfers: true,
  picking: true,
  shelving: true,
  counting: true,
};

export default function WarehousesPage() {
  const [roleName, setRoleName] = useState("Warehouse Staff");
  const [permissions, setPermissions] = useState<Record<PermissionKey, boolean>>(defaultPermissions);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const togglePermission = (key: PermissionKey) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      // Placeholder for API call to persist role/permissions
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMessage("Role saved locally (wire to your API to persist).");
    } catch {
      setMessage("Failed to save role. Please retry.");
    } finally {
      setSaving(false);
    }
  };

  const items: { key: PermissionKey; label: string; description: string; icon: React.ReactNode }[] = [
    { key: "transfers", label: "Transfers", description: "Move stock between warehouses/zones", icon: <ArrowLeftRight className="h-4 w-4" /> },
    { key: "picking", label: "Picking", description: "Pick / pack delivery orders", icon: <Truck className="h-4 w-4" /> },
    { key: "shelving", label: "Shelving (Putaway)", description: "Receive and putaway inbound stock", icon: <ClipboardCheck className="h-4 w-4" /> },
    { key: "counting", label: "Counting", description: "Cycle counts & adjustments", icon: <SlidersHorizontal className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-slate-500">Settings / Warehouses</p>
          <h1 className="text-3xl font-bold text-slate-900">Warehouse Roles</h1>
          <p className="text-sm text-slate-500">Create and manage the dedicated Warehouse Staff role.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Add Warehouse
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
              <Shield className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Role</p>
              <h2 className="text-lg font-semibold text-slate-900">Warehouse Staff</h2>
              <p className="text-sm text-slate-500">Focused on on-floor execution: putaway, picking, transfers, counting.</p>
            </div>
          </div>

          <label className="block text-sm font-medium text-slate-700 mb-2">Role name</label>
          <input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none"
            placeholder="Warehouse Staff"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="h-5 w-5 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">Task Permissions</h3>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => togglePermission(item.key)}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition ${
                  permissions[item.key]
                    ? "border-indigo-200 bg-indigo-50/60 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg ${
                    permissions[item.key] ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.icon}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        permissions[item.key] ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {permissions[item.key] ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {saving ? "Saving..." : "Save Role"}
          </button>
          {message && <span className="text-sm text-slate-600">{message}</span>}
        </div>
      </form>
    </div>
  );
}
