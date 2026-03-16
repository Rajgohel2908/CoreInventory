"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Clock3, MapPin, Search, Filter, Plus } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";

const adjustments = [
  // ... (keeping existing data)
  {
    ref: "ADJ/2026/0021",
    product: "LED Panels 60W",
    status: "Done",
    location: "West Storage - Zone A",
    recorded: 12,
    counted: 0,
    delta: -12,
    reason: "Damaged",
    time: "10m ago",
    operator: "Jane Smith",
  },
  {
    ref: "ADJ/2026/0020",
    product: "Nylon Ropes 10m",
    status: "Done",
    location: "South Dock - Bay 1",
    recorded: 50,
    counted: 45,
    delta: -5,
    reason: "Count Error",
    time: "1h ago",
    operator: "John Doe",
  },
  {
    ref: "ADJ/2026/0019",
    product: "Carbon Steel Plates",
    status: "Draft",
    location: "Main Rack A",
    recorded: 22,
    counted: 25,
    delta: 3,
    reason: "Count Error",
    time: "Today 09:10",
    operator: "Jane Smith",
  },
  {
    ref: "ADJ/2026/0018",
    product: "Rubber Seals 50mm",
    status: "Draft",
    location: "East Wing - Zone B",
    recorded: 3250,
    counted: 3200,
    delta: -50,
    reason: "Expired",
    time: "Yesterday",
    operator: "John Doe",
  },
];

const quickStats = [
  { label: "Counts logged today", value: 3 },
  { label: "Open drafts", value: 2 },
  { label: "Net delta", value: "-64" },
];

export default function AdjustmentsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAdjustments = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return adjustments.filter((adj) => {
      const matchesSearch =
        q.length === 0 ||
        adj.ref.toLowerCase().includes(q) ||
        adj.product.toLowerCase().includes(q) ||
        adj.location.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || adj.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <Breadcrumbs />

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Warehouse Tasks</p>
          <h1 className="text-3xl font-bold text-slate-900">Inventory Counting</h1>
          <p className="text-sm text-slate-500">Cycle counts and corrective adjustments.</p>
        </div>
        <button
          type="button"
          onClick={() => router.push("/adjustments/new")}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <Plus className="h-4 w-4" />
          New count
        </button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ref, product, location..."
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500"
          />
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2">
          <Filter className="h-4 w-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-none bg-transparent text-sm text-slate-700 outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Done">Done</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {filteredAdjustments.map((adj, idx) => {
          const isPending = adj.status === "Draft";
          return (
            <motion.div
              key={adj.ref}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  <SlidersHorizontal className="h-4 w-4" />
                  {adj.ref}
                </span>
                <StatusBadge status={adj.status} />
                <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                   {adj.reason}
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900">{adj.product}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {adj.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {adj.time}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {adj.recorded} recorded / {adj.counted} counted
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">Operator: {adj.operator}</p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-semibold ${
                      adj.delta >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {adj.delta > 0 ? "+" : ""}
                    {adj.delta}
                  </span>
                  <button
                    type="button"
                    onClick={() => router.push(`/adjustments/${encodeURIComponent(adj.ref)}`)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isPending
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-500"
                        : "bg-slate-100 text-slate-500"
                    }`}
                    disabled={!isPending}
                  >
                    {isPending ? "Execute count" : "Reviewed"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filteredAdjustments.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
            No adjustments match your search/filter.
          </div>
        )}
      </div>
    </div>
  );
}
