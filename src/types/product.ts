// Product types
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryId?: string;
  unitOfMeasure: string;
  description?: string;
  image?: string;
  reorderPoint?: number;
  reorderQty?: number;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockByLocation {
  locationId: string;
  locationName: string;
  warehouseName: string;
  quantity: number;
}

export interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  unitOfMeasure: string;
  description?: string;
  image?: File | null;
  initialStock?: number;
  reorderPoint?: number;
  reorderQty?: number;
}
