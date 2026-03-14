import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Warehouse from "@/models/Warehouse";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const warehouses = await Warehouse.find({ isActive: true });
    return NextResponse.json({ warehouses });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch warehouses" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "MANAGER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    const warehouse = await Warehouse.create(data);
    return NextResponse.json({ warehouse }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create warehouse" }, { status: 500 });
  }
}
