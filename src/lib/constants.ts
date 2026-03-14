export const APP_NAME = "CoreInventory";
export const APP_DESCRIPTION = "Real-time Inventory Management System";

export const UNITS_OF_MEASURE = [
  { value: "units", label: "Units" },
  { value: "kg", label: "Kilograms (kg)" },
  { value: "g", label: "Grams (g)" },
  { value: "liters", label: "Liters" },
  { value: "meters", label: "Meters" },
  { value: "boxes", label: "Boxes" },
  { value: "pallets", label: "Pallets" },
] as const;

export const OPERATION_STATUSES = {
  DRAFT: "Draft",
  WAITING: "Waiting",
  READY: "Ready",
  DONE: "Done",
  CANCELED: "Canceled",
} as const;

export const RECEIPT_STATUSES = {
  DRAFT: "Draft",
  CONFIRMED: "Confirmed",
  IN_TRANSIT: "In Transit",
  RECEIVED: "Received",
  DONE: "Done",
} as const;

export const DELIVERY_STATUSES = {
  DRAFT: "Draft",
  CONFIRMED: "Confirmed",
  PICKING: "Picking",
  PACKED: "Packed",
  DISPATCHED: "Dispatched",
  DONE: "Done",
} as const;

export const PRIORITY_LEVELS = {
  NORMAL: "Normal",
  URGENT: "Urgent",
  CRITICAL: "Critical",
} as const;

export const ADJUSTMENT_REASONS = [
  "Damaged",
  "Expired",
  "Count Error",
  "Theft",
  "Other",
] as const;

export const PAGE_SIZES = [10, 25, 50, 100] as const;

export const NAV_ITEMS = [
  {
    section: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
    ],
  },
  {
    section: "Inventory",
    items: [
      { label: "Products", href: "/products", icon: "Package" },
      { label: "Stock Ledger", href: "/ledger", icon: "BookOpen" },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Receipts", href: "/receipts", icon: "ClipboardCheck" },
      { label: "Delivery Orders", href: "/deliveries", icon: "Truck" },
      { label: "Internal Transfers", href: "/transfers", icon: "ArrowLeftRight" },
      { label: "Adjustments", href: "/adjustments", icon: "SlidersHorizontal" },
    ],
  },
  {
    section: "Configuration",
    items: [
      { label: "Warehouses", href: "/settings/warehouses", icon: "Warehouse" },
      { label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
] as const;
