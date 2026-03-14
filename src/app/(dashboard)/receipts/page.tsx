"use client";

import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, Clock3, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";

const receiptQueue = [
  {
    ref: "REC/2026/0110",
    supplier: "Metro Steel Co",
    status: "Confirmed",
    dock: "Dock 2",
    putaway: "Rack A1",
    eta: "Today 14:30",
    lines: 6,
    cartons: 42,
    note: "Chilled items first",
  },
  {
    ref: "REC/2026/0109",
    supplier: "Allied Pipes Ltd",
    status: "Draft",
    dock: "Dock 1",
    putaway: "Rack C3",
    eta: "Today 16:00",
    lines: 4,
    cartons: 18,
    note: "Stack on pallets",
  },
  {
    ref: "REC/2026/0108",
    supplier: "SafeGear Inc",
    status: "Confirmed",
    dock: "Dock 3",
    putaway: "Mezzanine",
    eta: "Tomorrow 08:00",
    lines: 3,
    cartons: 12,
  },
  {
    ref: "REC/2026/0107",
    supplier: "ElectroBright",
    status: "In Transit",
    dock: "Dock 4",
    putaway: "Rack B2",
    eta: "Today 18:30",
    lines: 5,
    cartons: 20,
  },
];

const quickStats = [
  { label: "Pending to Shelve", value: 4 },
  { label: "Due within 2h", value: 2 },
  { label: "Draft / Confirmed", value: "3 / 1" },
];

export default function ReceiptsPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs />

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Warehouse Tasks</p>
          <h1 className="text-3xl font-bold text-slate-900">Shelving & Receipts</h1>
          <p className="text-sm text-slate-500">Draft and Confirmed receipts waiting for putaway.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <ClipboardCheck className="h-4 w-4" />
          Process next receipt
        </button>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {receiptQueue.map((receipt, idx) => {
          const isPending = !["Received", "Done"].includes(receipt.status);
          return (
            <motion.div
              key={receipt.ref}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <ClipboardCheck className="h-4 w-4" />
                  {receipt.ref}
                </span>
                <StatusBadge status={receipt.status} />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900">{receipt.supplier}</p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {receipt.dock} {"->"} {receipt.putaway}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {receipt.eta}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {receipt.lines} lines / {receipt.cartons} cartons
                    </span>
                  </div>
                  {receipt.note && (
                    <p className="text-xs font-semibold text-amber-700">{receipt.note}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 self-start sm:self-center">
                  <button
                    type="button"
                    className={`rounded-lg px-3 py-2 text-xs font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      isPending
                        ? "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-500"
                        : "bg-slate-100 text-slate-500"
                    }`}
                    disabled={!isPending}
                  >
                    Process
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
