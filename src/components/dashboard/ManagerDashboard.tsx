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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

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

const inventoryValueData = [
  { month: "Jan", value: 850000 },
  { month: "Feb", value: 880000 },
  { month: "Mar", value: 920000 },
  { month: "Apr", value: 890000 },
  { month: "May", value: 1050000 },
  { month: "Jun", value: 1120000 },
  { month: "Jul", value: 1200000 },
];

const warehousePerformanceData = [
  { name: "Main A", inbound: 400, outbound: 240, amt: 2400 },
  { name: "Storage B", inbound: 300, outbound: 139, amt: 2210 },
  { name: "Cold C", inbound: 200, outbound: 980, amt: 2290 },
  { name: "Buffer D", inbound: 278, outbound: 390, amt: 2000 },
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
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Inventory Value (Last 7 Months)</h3>
          <div className="h-64 flex items-center justify-center rounded-xl">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={inventoryValueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(value) => `$${value / 1000}k`} />
                 <Tooltip
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Inventory Value']}
                 />
                 <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </section>

        {/* Warehouse Performance */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Throughput Details</h3>
          <div className="h-44 w-full mb-4">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={warehousePerformanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Bar dataKey="inbound" fill="#10b981" radius={[4, 4, 0, 0]} name="Inbound (Units)" />
                  <Bar dataKey="outbound" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Outbound (Units)" />
                </BarChart>
             </ResponsiveContainer>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-4">
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
