"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Truck, Clock3, MapPin, Search, Filter } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";

const deliveryQueue = [
  {
    ref: "DEL/2026/0046",
    customer: "BuildMax Ltd",
    status: "Picking",
    dock: "Bay 6",
    carrier: "Courier X",
    due: "Today 15:00",
    totes: 7,
    lines: 32,
    priority: "Urgent",
  },
  {
    ref: "DEL/2026/0047",
    customer: "GreenBuild Co",
    status: "Confirmed",
    dock: "Bay 2",
    carrier: "Linehaul",
    due: "Today 18:00",
    totes: 5,
    lines: 24,
    priority: "Normal",
  },
  {
    ref: "DEL/2026/0045",
    customer: "SafetyFirst Inc",
    status: "Packed",
    dock: "Bay 4",
    carrier: "Carrier Z",
    due: "Dispatch 17:00",
    totes: 3,
    lines: 12,
    priority: "Normal",
  },
  {
    ref: "DEL/2026/0044",
    customer: "AquaPipes",
    status: "Draft",
    dock: "Bay 1",
    carrier: "Courier Y",
    due: "Tomorrow 09:00",
    totes: 4,
    lines: 18,
    priority: "Urgent",
  },
];

const quickStats = [
  { label: "Orders to pick", value: 4 },
  { label: "Urgent", value: 2 },
  { label: "Picking / Confirmed", value: "1 / 1" },
];

export default function DeliveriesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredQueue = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return deliveryQueue.filter((order) => {
      const matchesSearch =
        q.length === 0 ||
        order.ref.toLowerCase().includes(q) ||
        order.customer.toLowerCase().includes(q) ||
        order.carrier.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const nextPending = filteredQueue.find((order) => ["Draft", "Confirmed", "Picking"].includes(order.status));

  return (
    <div className="space-y-6">
      <Breadcrumbs />

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Warehouse Tasks</p>
          <h1 className="text-3xl font-bold text-slate-900">Picking & Deliveries</h1>
          <p className="text-sm text-slate-500">Picking and packing queue with status-aware actions.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (nextPending) {
              router.push(`/deliveries/${encodeURIComponent(nextPending.ref)}`);
            }
          }}
          disabled={!nextPending}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <Truck className="h-4 w-4" />
          Start picking
        </button>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order, customer, carrier..."
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
            <option value="Confirmed">Confirmed</option>
            <option value="Picking">Picking</option>
            <option value="Packed">Packed</option>
            <option value="Dispatched">Dispatched</option>
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
        {filteredQueue.map((order, idx) => {
          const isPending = ["Draft", "Confirmed", "Picking"].includes(order.status);
          return (
            <motion.div
              key={order.ref}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  <Truck className="h-4 w-4" />
                  {order.ref}
                </span>
                <StatusBadge status={order.status} />
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                    order.priority === "Urgent"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {order.priority}
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900">{order.customer}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {order.dock} - {order.carrier}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {order.due}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {order.totes} totes / {order.lines} lines
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    onClick={() => router.push(`/deliveries/${encodeURIComponent(order.ref)}`)}
                    className={`rounded-lg px-3 py-2 text-xs font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isPending
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-500"
                        : "bg-slate-100 text-slate-500"
                    }`}
                    disabled={!isPending}
                  >
                    {order.status === "Picking" ? "Resume picking" : "Process"}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push(`/deliveries/${encodeURIComponent(order.ref)}`)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
        {filteredQueue.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500 shadow-sm">
            No deliveries match your search/filter.
          </div>
        )}
      </div>
    </div>
  );
}
