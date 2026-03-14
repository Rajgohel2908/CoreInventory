// Operation types (Receipts, Deliveries, Transfers)

export type OperationStatus = "Draft" | "Confirmed" | "Waiting" | "Ready" | "Done" | "Canceled";
export type ReceiptStatus = "Draft" | "Confirmed" | "In Transit" | "Received" | "Done";
export type DeliveryStatus = "Draft" | "Confirmed" | "Picking" | "Packed" | "Dispatched" | "Done";
export type TransferStatus = "Draft" | "Confirmed" | "In Transit" | "Done";
export type Priority = "Normal" | "Urgent" | "Critical";
export type AdjustmentReason = "Damaged" | "Expired" | "Count Error" | "Theft" | "Other";

// Receipt
export interface ReceiptLine {
  id?: string;
  productId: string;
  productName: string;
  productSku: string;
  expectedQuantity: number;
  receivedQuantity?: number;
}

export interface Receipt {
  id: string;
  reference: string;
  supplierName: string;
  expectedDate: string;
  locationId: string;
  locationName: string;
  warehouseName: string;
  notes?: string;
  status: ReceiptStatus;
  lines: ReceiptLine[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReceiptFormData {
  supplierName: string;
  expectedDate: string;
  locationId: string;
  notes?: string;
  lines: Omit<ReceiptLine, "id">[];
}

// Delivery Order
export interface DeliveryLine {
  id?: string;
  productId: string;
  productName: string;
  productSku: string;
  quantity: number;
  pickedQuantity: number;
  isPicked: boolean;
}

export interface DeliveryOrder {
  id: string;
  reference: string;
  customerName: string;
  deliveryAddress?: string;
  scheduledDate: string;
  locationId: string;
  locationName: string;
  warehouseName: string;
  priority: Priority;
  notes?: string;
  status: DeliveryStatus;
  lines: DeliveryLine[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeliveryFormData {
  customerName: string;
  deliveryAddress?: string;
  scheduledDate: string;
  locationId: string;
  priority: Priority;
  notes?: string;
  lines: Omit<DeliveryLine, "id" | "pickedQuantity" | "isPicked">[];
}
