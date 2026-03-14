import mongoose, { Schema, Document, Model } from "mongoose";

// Common transform for all models
const transform = (_doc: unknown, ret: Record<string, unknown>) => {
  if (ret._id) {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString();
  }
  delete ret._id;
  delete ret.__v;
  return ret;
};

const baseOptions = {
  timestamps: true,
  toJSON: { transform },
};

/* ─── StockLevel ─── */
export interface IStockLevel extends Document {
  product: mongoose.Types.ObjectId;
  warehouse: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  quantity: number;
  updatedAt: Date;
}

const StockLevelSchema = new Schema<IStockLevel>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    locationId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, default: 0 },
  },
  baseOptions
);

StockLevelSchema.index({ product: 1, warehouse: 1, locationId: 1 }, { unique: true });

export const StockLevel: Model<IStockLevel> =
  mongoose.models.StockLevel || mongoose.model<IStockLevel>("StockLevel", StockLevelSchema);

/* ─── Receipt ─── */
export interface IReceiptLine {
  product: mongoose.Types.ObjectId;
  productName: string;
  productSku: string;
  expectedQuantity: number;
  receivedQuantity?: number;
}

export interface IReceipt extends Document {
  reference: string;
  supplierName: string;
  expectedDate?: Date;
  warehouse: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  notes?: string;
  status: "Draft" | "Confirmed" | "In Transit" | "Received" | "Done" | "Canceled";
  lines: IReceiptLine[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReceiptLineSchema = new Schema<IReceiptLine>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  productSku: { type: String, required: true },
  expectedQuantity: { type: Number, required: true, min: 1 },
  receivedQuantity: { type: Number },
});

const ReceiptSchema = new Schema<IReceipt>(
  {
    reference: { type: String, required: true, unique: true },
    supplierName: { type: String, required: true },
    expectedDate: { type: Date },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    locationId: { type: Schema.Types.ObjectId, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["Draft", "Confirmed", "In Transit", "Received", "Done", "Canceled"],
      default: "Draft",
    },
    lines: [ReceiptLineSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  baseOptions
);

export const Receipt: Model<IReceipt> =
  mongoose.models.Receipt || mongoose.model<IReceipt>("Receipt", ReceiptSchema);

/* ─── DeliveryOrder ─── */
export interface IDeliveryLine {
  product: mongoose.Types.ObjectId;
  productName: string;
  productSku: string;
  quantity: number;
  pickedQuantity: number;
  isPicked: boolean;
}

export interface IDeliveryOrder extends Document {
  reference: string;
  customerName: string;
  deliveryAddress?: string;
  scheduledDate?: Date;
  warehouse: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  priority: "Normal" | "Urgent" | "Critical";
  notes?: string;
  status: "Draft" | "Confirmed" | "Picking" | "Packed" | "Dispatched" | "Done" | "Canceled";
  lines: IDeliveryLine[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DeliveryLineSchema = new Schema<IDeliveryLine>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  productSku: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  pickedQuantity: { type: Number, default: 0 },
  isPicked: { type: Boolean, default: false },
});

const DeliveryOrderSchema = new Schema<IDeliveryOrder>(
  {
    reference: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    deliveryAddress: { type: String },
    scheduledDate: { type: Date },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    locationId: { type: Schema.Types.ObjectId, required: true },
    priority: { type: String, enum: ["Normal", "Urgent", "Critical"], default: "Normal" },
    notes: { type: String },
    status: {
      type: String,
      enum: ["Draft", "Confirmed", "Picking", "Packed", "Dispatched", "Done", "Canceled"],
      default: "Draft",
    },
    lines: [DeliveryLineSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  baseOptions
);

export const DeliveryOrder: Model<IDeliveryOrder> =
  mongoose.models.DeliveryOrder || mongoose.model<IDeliveryOrder>("DeliveryOrder", DeliveryOrderSchema);

/* ─── InternalTransfer ─── */
export interface ITransferLine {
  product: mongoose.Types.ObjectId;
  productName: string;
  productSku: string;
  quantity: number;
}

export interface IInternalTransfer extends Document {
  reference: string;
  sourceWarehouse: mongoose.Types.ObjectId;
  sourceLocationId: mongoose.Types.ObjectId;
  destWarehouse: mongoose.Types.ObjectId;
  destLocationId: mongoose.Types.ObjectId;
  scheduledDate?: Date;
  notes?: string;
  status: "Draft" | "Confirmed" | "In Transit" | "Done" | "Canceled";
  lines: ITransferLine[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TransferLineSchema = new Schema<ITransferLine>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  productSku: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const InternalTransferSchema = new Schema<IInternalTransfer>(
  {
    reference: { type: String, required: true, unique: true },
    sourceWarehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    sourceLocationId: { type: Schema.Types.ObjectId, required: true },
    destWarehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    destLocationId: { type: Schema.Types.ObjectId, required: true },
    scheduledDate: { type: Date },
    notes: { type: String },
    status: {
      type: String,
      enum: ["Draft", "Confirmed", "In Transit", "Done", "Canceled"],
      default: "Draft",
    },
    lines: [TransferLineSchema],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  baseOptions
);

export const InternalTransfer: Model<IInternalTransfer> =
  mongoose.models.InternalTransfer || mongoose.model<IInternalTransfer>("InternalTransfer", InternalTransferSchema);

/* ─── StockAdjustment ─── */
export interface IStockAdjustment extends Document {
  reference: string;
  product: mongoose.Types.ObjectId;
  warehouse: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  recordedQty: number;
  actualQty: number;
  reason: "Damaged" | "Expired" | "Count Error" | "Theft" | "Other";
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const StockAdjustmentSchema = new Schema<IStockAdjustment>(
  {
    reference: { type: String, required: true, unique: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    locationId: { type: Schema.Types.ObjectId, required: true },
    recordedQty: { type: Number, required: true },
    actualQty: { type: Number, required: true },
    reason: {
      type: String,
      enum: ["Damaged", "Expired", "Count Error", "Theft", "Other"],
      required: true,
    },
    notes: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  baseOptions
);

export const StockAdjustment: Model<IStockAdjustment> =
  mongoose.models.StockAdjustment || mongoose.model<IStockAdjustment>("StockAdjustment", StockAdjustmentSchema);

/* ─── StockLedger (Immutable Audit Log) ─── */
export interface IStockLedger extends Document {
  operationRef: string;
  operationType: "receipt" | "delivery" | "transfer" | "adjustment";
  product: mongoose.Types.ObjectId;
  productName: string;
  productSku: string;
  warehouse: mongoose.Types.ObjectId;
  locationId: mongoose.Types.ObjectId;
  locationName: string;
  quantityChange: number;
  balanceAfter: number;
  operator: mongoose.Types.ObjectId;
  operatorName: string;
  timestamp: Date;
}

const StockLedgerSchema = new Schema<IStockLedger>(
  {
    operationRef: { type: String, required: true },
    operationType: {
      type: String,
      enum: ["receipt", "delivery", "transfer", "adjustment"],
      required: true,
    },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    productSku: { type: String, required: true },
    warehouse: { type: Schema.Types.ObjectId, ref: "Warehouse", required: true },
    locationId: { type: Schema.Types.ObjectId, required: true },
    locationName: { type: String, required: true },
    quantityChange: { type: Number, required: true },
    balanceAfter: { type: Number, required: true },
    operator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    operatorName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  baseOptions
);

StockLedgerSchema.index({ product: 1, timestamp: -1 });
StockLedgerSchema.index({ operationRef: 1 });

export const StockLedgerModel: Model<IStockLedger> =
  mongoose.models.StockLedger || mongoose.model<IStockLedger>("StockLedger", StockLedgerSchema);
