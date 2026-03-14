import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { Receipt, StockLevel, StockLedgerModel } from "@/models/Operations";
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

    // 1. Create Receipt
    const receipt = new Receipt({
      ...data,
      createdBy: user.userId,
      status: "Received", // Automatically received for this flow
    });
    await receipt.save({ session });

    // 2. Update Stock Levels & Create Ledger Entries
    for (const line of receipt.lines) {
      const qty = line.receivedQuantity || line.expectedQuantity;

      // Update or Create StockLevel
      await StockLevel.findOneAndUpdate(
        {
          product: line.product,
          warehouse: receipt.warehouse,
          locationId: receipt.locationId,
        },
        { $inc: { quantity: qty } },
        { upsert: true, new: true, session }
      );

      // Create Ledger Entry
      await StockLedgerModel.create(
        [
          {
            operationRef: receipt.reference,
            operationType: "receipt",
            product: line.product,
            productName: line.productName,
            productSku: line.productSku,
            warehouse: receipt.warehouse,
            locationId: receipt.locationId,
            locationName: "Default Location", // Simplified for now
            quantityChange: qty,
            balanceAfter: 0, // In a real app, calculate balance
            operator: user.userId,
            operatorName: user.name,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return NextResponse.json({ receipt }, { status: 201 });
  } catch (error: any) {
    await session.abortTransaction();
    console.error("Receipt creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to process receipt" }, { status: 500 });
  } finally {
    session.endSession();
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const receipts = await Receipt.find().sort({ createdAt: -1 });
    return NextResponse.json({ receipts });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch receipts" }, { status: 500 });
  }
}
