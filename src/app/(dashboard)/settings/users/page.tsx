"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Shield, 
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StatusBadge from "@/components/shared/StatusBadge";

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: "MANAGER" | "STAFF";
  status: "Active" | "Inactive" | "Pending";
  lastActive: string;
};

const demoUsers: AppUser[] = [
  { id: "1", name: "John Doe", email: "john@coreinventory.com", role: "MANAGER", status: "Active", lastActive: "Just now" },
  { id: "2", name: "Jane Smith", email: "jane@coreinventory.com", role: "STAFF", status: "Active", lastActive: "15m ago" },
  { id: "3", name: "Robert Wilson", email: "robert@coreinventory.com", role: "STAFF", status: "Inactive", lastActive: "2 days ago" },
  { id: "4", name: "Alice Brown", email: "alice@coreinventory.com", role: "STAFF", status: "Pending", lastActive: "Never" },
];

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return demoUsers.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [searchTerm, roleFilter]);

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
          <p className="text-sm text-slate-500">Manage team members and their access levels.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-transparent text-sm text-slate-700 outline-none"
          >
            <option value="All">All Roles</option>
            <option value="MANAGER">Manager</option>
            <option value="STAFF">Staff</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 font-semibold text-slate-900">User</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Role</th>
              <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${user.role === 'MANAGER' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="font-medium text-slate-700">{user.role}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={user.status === 'Active' ? 'Done' : user.status === 'Pending' ? 'Waiting' : 'Canceled'} />
                  <p className="mt-1 text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock size={10} /> {user.lastActive}
                  </p>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-slate-200 mb-3" />
            <p className="text-slate-500">No users found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
