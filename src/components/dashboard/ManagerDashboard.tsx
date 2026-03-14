"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertTriangle,
  Warehouse,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  BarChart3,
} from "lucide-react";

const managerMetrics = [
  {
    title: "Total Inventory Value",
    value: "$1.2M",
    trend: "+12.5%",
    trendUp: true,
    icon: BarChart3,
    accent: "bg-blue-50 text-blue-700",
  },
  {
    title: "Low Stock Alerts",
    value: "24",
    trend: "-4 from yesterday",
    trendUp: true,
    icon: AlertTriangle,
    accent: "bg-amber-50 text-amber-700",
  },
  {
    title: "Active Warehouses",
    value: "6",
    trend: "2 reach capacity",
    trendUp: false,
    icon: Warehouse,
    accent: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Total products",
    value: "1,842",
    trend: "+12 new this week",
    trendUp: true,
    icon: Package,
    accent: "bg-indigo-50 text-indigo-700",
  },
];

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-500">Inventory Manager</p>
          <h1 className="text-3xl font-bold text-slate-900">Manager Dashboard</h1>
          <p className="text-sm text-slate-500">
            High-level overview of global inventory, value, and warehouse performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {managerMetrics.map((metric, idx) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.25 }}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${metric.accent}`}>
                <metric.icon className="h-5 w-5" />
              </span>
              <div className={`flex items-center gap-1 text-xs font-semibold ${metric.trendUp ? "text-emerald-600" : "text-amber-600"}`}>
                {metric.trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {metric.trend}
              </div>
            </div>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</p>
            <p className="text-sm text-slate-500">{metric.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Inventory Distribution */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Inventory Distribution</h3>
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50">
            <p className="text-sm text-slate-400">Inventory chart visualization</p>
          </div>
        </section>

        {/* Warehouse Performance */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Warehouse Performance</h3>
          <div className="space-y-4">
            {[
              { name: "Main Warehouse A", capacity: 85, color: "bg-emerald-500" },
              { name: "Secondary Storage B", capacity: 42, color: "bg-blue-500" },
              { name: "Cold Storage C", capacity: 92, color: "bg-amber-500" },
              { name: "Buffer Zone D", capacity: 15, color: "bg-slate-300" },
            ].map((wh) => (
              <div key={wh.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">{wh.name}</span>
                  <span className="text-slate-500">{wh.capacity}% capacity</span>
                </div>
                <div className="h-2 w-100 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${wh.color}`} style={{ width: `${wh.capacity}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Fixed missing icon import barChart3 -> BarChart3
