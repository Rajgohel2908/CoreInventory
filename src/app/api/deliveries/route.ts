import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { DeliveryOrder, StockLevel, StockLedgerModel } from "@/models/Operations";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const data = await req.json();

    // 1. Create Delivery Order
    const delivery = new DeliveryOrder({
      ...data,
      createdBy: user.userId,
      status: "Done",
    });
    await delivery.save({ session });

    // 2. Update Stock Levels (Decrement)
    for (const line of delivery.lines) {
      const qty = line.quantity;

      // Check availability first
      const stock = await StockLevel.findOne({
        product: line.product,
        warehouse: delivery.warehouse,
        locationId: delivery.locationId,
      }).session(session);

      if (!stock || stock.quantity < qty) {
        throw new Error(`Insufficient stock for product ${line.productSku}`);
      }

      stock.quantity -= qty;
      await stock.save({ session });

      // Create Ledger Entry
      await StockLedgerModel.create(
        [
          {
            operationRef: delivery.reference,
            operationType: "delivery",
            product: line.product,
            productName: line.productName,
            productSku: line.productSku,
            warehouse: delivery.warehouse,
            locationId: delivery.locationId,
            locationName: "Pick-up Location",
            quantityChange: -qty,
            balanceAfter: stock.quantity,
            operator: user.userId,
            operatorName: user.name,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return NextResponse.json({ delivery }, { status: 201 });
  } catch (error: any) {
    await session.abortTransaction();
    return NextResponse.json({ error: error.message || "Failed to process delivery" }, { status: 500 });
  } finally {
    session.endSession();
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const deliveries = await DeliveryOrder.find().sort({ createdAt: -1 });
    return NextResponse.json({ deliveries });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch deliveries" }, { status: 500 });
  }
}
