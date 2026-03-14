"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Clock3, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";

const transferQueue = [
  {
    ref: "TRF/2026/0042",
    from: "Rack B2",
    to: "East Wing B",
    status: "Confirmed",
    scheduled: "Today 13:30",
    pallets: 2,
    units: 480,
    note: "Requires forklift",
  },
  {
    ref: "TRF/2026/0041",
    from: "Main Rack C",
    to: "Dock Buffer",
    status: "Draft",
    scheduled: "Today 15:00",
    pallets: 1,
    units: 180,
  },
  {
    ref: "TRF/2026/0040",
    from: "West Zone",
    to: "QC Area",
    status: "In Transit",
    scheduled: "Now",
    pallets: 3,
    units: 260,
  },
  {
    ref: "TRF/2026/0039",
    from: "South Dock",
    to: "Rack D1",
    status: "Done",
    scheduled: "Today 09:30",
    pallets: 1,
    units: 90,
  },
];

const quickStats = [
  { label: "Transfers pending", value: 3 },
  { label: "Scheduled today", value: 3 },
  { label: "In transit", value: 1 },
];

export default function TransfersPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs />

      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Warehouse Tasks</p>
          <h1 className="text-3xl font-bold text-slate-900">Stock Transfers</h1>
          <p className="text-sm text-slate-500">Move pallets and totes between zones with clear statuses.</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <ArrowLeftRight className="h-4 w-4" />
          Start transfer
        </button>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {quickStats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {transferQueue.map((transfer, idx) => {
          const isPending = ["Draft", "Confirmed", "In Transit"].includes(transfer.status);
          return (
            <motion.div
              key={transfer.ref}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.2 }}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  <ArrowLeftRight className="h-4 w-4" />
                  {transfer.ref}
                </span>
                <StatusBadge status={transfer.status} />
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-900">
                    {transfer.from} {"->"} {transfer.to}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Route planned
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {transfer.scheduled}
                    </span>
                    <span className="font-semibold text-slate-700">
                      {transfer.pallets} pallets / {transfer.units} units
                    </span>
                  </div>
                  {transfer.note && (
                    <p className="text-xs font-semibold text-amber-700">{transfer.note}</p>
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
                    Execute
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
