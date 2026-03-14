import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { InternalTransfer, StockLevel, StockLedgerModel } from "@/models/Operations";
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

    // 1. Create Transfer Record
    const transfer = new InternalTransfer({
      ...data,
      createdBy: user.userId,
      status: "Done",
    });
    await transfer.save({ session });

    // 2. Process each line: decrement source, increment dest
    for (const line of transfer.lines) {
      const qty = line.quantity;

      // Source Adjustment (Decrement)
      const sourceStock = await StockLevel.findOne({
        product: line.product,
        warehouse: transfer.sourceWarehouse,
        locationId: transfer.sourceLocationId,
      }).session(session);

      if (!sourceStock || sourceStock.quantity < qty) {
        throw new Error(`Insufficient stock for ${line.productSku} at source`);
      }

      sourceStock.quantity -= qty;
      await sourceStock.save({ session });

      // Destination Adjustment (Increment)
      await StockLevel.findOneAndUpdate(
        {
          product: line.product,
          warehouse: transfer.destWarehouse,
          locationId: transfer.destLocationId,
        },
        { $inc: { quantity: qty } },
        { upsert: true, new: true, session }
      );

      // Ledger entries for both sides
      await StockLedgerModel.create([
        {
          operationRef: transfer.reference,
          operationType: "transfer",
          product: line.product,
          productName: line.productName,
          productSku: line.productSku,
          warehouse: transfer.sourceWarehouse,
          locationId: transfer.sourceLocationId,
          locationName: "Source Location",
          quantityChange: -qty,
          balanceAfter: sourceStock.quantity,
          operator: user.userId,
          operatorName: user.name,
        },
        {
          operationRef: transfer.reference,
          operationType: "transfer",
          product: line.product,
          productName: line.productName,
          productSku: line.productSku,
          warehouse: transfer.destWarehouse,
          locationId: transfer.destLocationId,
          locationName: "Target Location",
          quantityChange: qty,
          balanceAfter: 0, // Placeholder
          operator: user.userId,
          operatorName: user.name,
        }
      ], { session });
    }

    await session.commitTransaction();
    return NextResponse.json({ transfer }, { status: 201 });
  } catch (error: any) {
    await session.abortTransaction();
    return NextResponse.json({ error: error.message || "Failed to process transfer" }, { status: 500 });
  } finally {
    session.endSession();
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const transfers = await InternalTransfer.find().sort({ createdAt: -1 });
    return NextResponse.json({ transfers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transfers" }, { status: 500 });
  }
}
