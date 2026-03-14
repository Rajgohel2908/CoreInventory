export interface LedgerEntry {
  id: string;
  timestamp: string;
  operationRef: string;
  operationType: "receipt" | "delivery" | "transfer" | "adjustment";
  productId: string;
  productName: string;
  productSku: string;
  locationName: string;
  quantityChange: number;
  balanceAfter: number;
  operatorName: string;
}
