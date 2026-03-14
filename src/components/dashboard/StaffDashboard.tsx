"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Truck,
  ArrowLeftRight,
  SlidersHorizontal,
  Clock3,
  MapPin,
  ScanBarcode,
} from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

type MetricCard = {
  title: string;
  value: number | string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
  statuses: string[];
  accent: string;
  trend?: string;
};

interface TaskLaneItem {
  ref: string;
  title: string;
  status: string;
  location: string;
  qty: string;
  eta: string;
  note?: string;
}

interface TaskLane {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  statuses: string[];
  accent: string;
  action: string;
  tasks: TaskLaneItem[];
}

const metricCards: MetricCard[] = [
  {
    title: "Pending Receipts to Shelve",
    value: 8,
    helper: "Draft / Confirmed waiting at inbound docks",
    icon: ClipboardCheck,
    statuses: ["Draft", "Confirmed"],
    accent: "bg-indigo-50 text-indigo-700",
    trend: "+3 arriving within 1h",
  },
  {
    title: "Pending Orders to Pick",
    value: 11,
    helper: "Picking / Confirmed orders in your lane",
    icon: Truck,
    statuses: ["Picking", "Confirmed"],
    accent: "bg-amber-50 text-amber-700",
    trend: "2 due within 60m",
  },
  {
    title: "Pending Transfers",
    value: 5,
    helper: "Moves waiting between racks / zones",
    icon: ArrowLeftRight,
    statuses: ["Draft", "Confirmed"],
    accent: "bg-teal-50 text-teal-700",
    trend: "3 scheduled today",
  },
  {
    title: "Recent Stock Adjustments",
    value: 4,
    helper: "Counts logged in the last 24 hours",
    icon: SlidersHorizontal,
    statuses: ["Done"],
    accent: "bg-slate-100 text-slate-700",
    trend: "Cycle count in progress",
  },
];

const taskLanes: TaskLane[] = [
  {
    title: "Shelving & Receipts",
    icon: ClipboardCheck,
    href: "/receipts",
    statuses: ["Draft", "Confirmed"],
    accent: "bg-indigo-50 text-indigo-700",
    action: "Process",
    tasks: [
      {
        ref: "REC/2026/0110",
        title: "Metro Steel Co - 42 pallets",
        status: "Confirmed",
        location: "Dock 2 -> Rack A1",
        qty: "6 lines - 42 pallets",
        eta: "Due in 35m",
        note: "Unload to cold storage first",
      },
      {
        ref: "REC/2026/0109",
        title: "Allied Pipes Ltd - 18 cartons",
        status: "Draft",
        location: "Dock 1 -> Rack C3",
        qty: "4 lines - 18 cartons",
        eta: "Due in 1h",
      },
      {
        ref: "REC/2026/0108",
        title: "SafeGear Inc - 12 crates",
        status: "Confirmed",
        location: "Dock 3 -> Mezzanine",
        qty: "3 lines - 12 crates",
        eta: "Tomorrow 08:00",
      },
    ],
  },
  {
    title: "Picking & Deliveries",
    icon: Truck,
    href: "/deliveries",
    statuses: ["Picking", "Confirmed"],
    accent: "bg-amber-50 text-amber-700",
    action: "Start Picking",
    tasks: [
      {
        ref: "DEL/2026/0046",
        title: "BuildMax - 5 drops",
        status: "Picking",
        location: "Bay 6 - Courier X",
        qty: "7 totes - 32 lines",
        eta: "Due in 50m",
        note: "Priority: refrigerate items",
      },
      {
        ref: "DEL/2026/0047",
        title: "GreenBuild - 4 drops",
        status: "Confirmed",
        location: "Bay 2 - Linehaul",
        qty: "5 totes - 24 lines",
        eta: "Due in 2h",
      },
      {
        ref: "DEL/2026/0045",
        title: "SafetyFirst - 2 drops",
        status: "Packed",
        location: "Bay 4 - Carrier Z",
        qty: "3 totes - 12 lines",
        eta: "Dispatch at 17:00",
      },
    ],
  },
  {
    title: "Stock Transfers",
    icon: ArrowLeftRight,
    href: "/transfers",
    statuses: ["Draft", "Confirmed"],
    accent: "bg-teal-50 text-teal-700",
    action: "Execute",
    tasks: [
      {
        ref: "TRF/2026/0042",
        title: "Move gloves to East Wing",
        status: "Confirmed",
        location: "Rack B2 -> East Wing B",
        qty: "2 pallets - 480 units",
        eta: "Today 13:30",
      },
      {
        ref: "TRF/2026/0041",
        title: "Shift coils to Dock buffer",
        status: "Draft",
        location: "Main Rack C -> Dock Buffer",
        qty: "1 pallet - 180 units",
        eta: "Today 15:00",
      },
      {
        ref: "TRF/2026/0040",
        title: "Interco move for QC",
        status: "In Transit",
        location: "West Zone -> QC Area",
        qty: "3 pallets - 260 units",
        eta: "Driver en route",
      },
    ],
  },
];

const recentAdjustments = [
  {
    ref: "ADJ/2026/0021",
    product: "LED Panels 60W",
    location: "West Storage - Zone A",
    delta: -12,
    reason: "Damaged",
    operator: "Jane Smith",
    status: "Done",
    time: "10m ago",
  },
  {
    ref: "ADJ/2026/0020",
    product: "Nylon Ropes 10m",
    location: "South Dock - Bay 1",
    delta: -5,
    reason: "Count Error",
    operator: "John Doe",
    status: "Done",
    time: "1h ago",
  },
  {
    ref: "ADJ/2026/0019",
    product: "Carbon Steel Plates",
    location: "Main Rack A",
    delta: 3,
    reason: "Count Error",
    operator: "Jane Smith",
    status: "Done",
    time: "Yesterday",
  },
];

export default function StaffDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Warehouse Staff</p>
          <h1 className="text-3xl font-bold text-slate-900">Staff Dashboard</h1>
          <p className="text-sm text-slate-500">
            Live queues for receipts, picking, transfers, and counts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/receipts"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <ClipboardCheck className="h-4 w-4" />
            Process next
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
            type="button"
          >
            <ScanBarcode className="h-4 w-4" />
            Scan tote / pallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric, idx) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.25 }}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.accent}`}
              >
                <metric.icon className="h-5 w-5" />
              </span>
              {metric.trend && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                  {metric.trend}
                </span>
              )}
            </div>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</p>
            <p className="text-sm text-slate-500">{metric.helper}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {metric.statuses.map((status) => (
                <span
                  key={status}
                  className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600"
                >
                  {status}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">My Task Queues</h2>
          <span className="text-xs text-slate-500">Optimized for handhelds</span>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {taskLanes.map((lane, laneIndex) => (
            <motion.div
              key={lane.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + laneIndex * 0.05, duration: 0.25 }}
              className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${lane.accent}`}>
                    <lane.icon className="h-5 w-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                      Warehouse Tasks
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">{lane.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {lane.statuses.map((status) => (
                        <span
                          key={status}
                          className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600"
                        >
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  href={lane.href}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  View all
                </Link>
              </div>

              <div className="space-y-3">
                {lane.tasks.map((task) => (
                  <div
                    key={task.ref}
                    className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                        {task.ref}
                      </span>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                          <StatusBadge status={task.status} />
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {task.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            {task.eta}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">{task.qty}</span>
                        </div>
                        {task.note && (
                          <p className="text-xs font-semibold text-amber-700">{task.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        {lane.action}
                      </button>
                      <Link
                        href={lane.href}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-800"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent Stock Adjustments</h2>
            <p className="text-sm text-slate-500">Most recent cycle counts and corrections.</p>
          </div>
          <Link
            href="/adjustments"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Open adjustments
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.25 }}
          className="space-y-3"
        >
          {recentAdjustments.map((adj) => (
            <div
              key={adj.ref}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-slate-900">{adj.product}</p>
                  <StatusBadge status={adj.status} />
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ScanBarcode className="h-3.5 w-3.5" />
                    {adj.ref}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {adj.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {adj.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600">Reason: {adj.reason} - Operator: {adj.operator}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    adj.delta >= 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {adj.delta > 0 ? "+" : ""}
                  {adj.delta}
                </span>
                <Link
                  href="/adjustments"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400"
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
