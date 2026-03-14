"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import StaffDashboard from "@/components/dashboard/StaffDashboard";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      {user?.role === "MANAGER" ? <ManagerDashboard /> : <StaffDashboard />}
    </div>
  );
}
