# CoreInventory — Bug Report & TODO

> Tested on: 2026-03-16 | Both roles tested: Inventory Manager & Warehouse Staff

---

## 🔴 Critical / Broken

### 1. "Add Product" Button — Does Nothing
- **Page**: `/products`
- **Role**: Manager
- **Steps to reproduce**: Go to Products page → click "Add Product" button
- **Expected**: Open a modal or navigate to a form
- **Actual**: Nothing happens — no modal, no navigation, no error

---

### 2. Settings → "User Management" → 404 Error
- **Page**: `/settings` → "User Management"
- **Role**: Manager
- **Steps to reproduce**: Go to Settings → click "User Management"
- **Expected**: A page to view/manage app users
- **Actual**: Redirects to `/settings/users` which returns a 404 Page Not Found

---

### 3. "New Count" Button — Does Nothing
- **Page**: `/adjustments` (Inventory Counting)
- **Role**: Manager & Staff
- **Steps to reproduce**: Go to Adjustments/Inventory Counting page → click "New count"
- **Expected**: Open a modal or form to create a new inventory count
- **Actual**: Nothing happens

---

### 4. "Execute Count" Button — Times Out / Frozen
- **Page**: `/adjustments` (Inventory Counting)
- **Role**: Manager & Staff
- **Steps to reproduce**: Go to Adjustments → click "Execute count" on any row
- **Expected**: Navigate to a count form for that specific adjustment
- **Actual**: The browser action times out — button appears completely frozen/unresponsive

---

## 🟠 Partially Working / Broken Buttons

### 5. "Details" Button — Does Nothing (All Operations Pages)
- **Pages**: `/receipts`, `/deliveries`, `/transfers`
- **Role**: Manager & Staff
- **Steps to reproduce**: On any of the above pages, click the "Details" button on any row
- **Expected**: Navigate to a detail view for that specific record
- **Actual**: Nothing happens — no navigation, no modal

---

### 6. "Scan Tote / Pallet" Button — Does Nothing
- **Page**: `/dashboard` (Staff Dashboard)
- **Role**: Warehouse Staff
- **Steps to reproduce**: Login as staff → Dashboard → click "Scan tote / pallet"
- **Expected**: Open a barcode scanner modal or similar UI
- **Actual**: Nothing happens

---

### 7. "Add New Receipt" Button — Does Nothing
- **Page**: `/receipts`
- **Role**: Manager
- **Steps to reproduce**: Go to Receipts page → click "Add New Receipt"
- **Expected**: Open a form to create a new receipt
- **Actual**: Nothing happens

---

### 8. "Add Warehouse" Button — Does Nothing
- **Page**: `/settings/warehouses`
- **Role**: Manager
- **Steps to reproduce**: Go to Warehouses (under Configuration) → click "Add Warehouse"
- **Expected**: Open a form to add a new warehouse
- **Actual**: Nothing happens

---

## 🟡 UX / Navigation Issues

### 9. "My Profile" Sidebar Link — Not Clickable
- **Location**: Sidebar bottom section
- **Role**: Manager & Staff
- **Issue**: The "My Profile" link in the sidebar bottom section is not reliably clickable. Users must navigate to `/profile` directly via the URL bar.

---

### 10. Staff Profile Shows "Inventory Manager" Role Label
- **Page**: `/profile`
- **Role**: Warehouse Staff
- **Issue**: The profile page shows "Inventory Manager" in the role label for a warehouse staff account. The role label is not role-aware.

---

### 11. "Execute" on Stock Transfers Goes to New Transfer (Not the Specific One)
- **Page**: `/transfers`
- **Role**: Staff / Manager
- **Issue**: Clicking "Execute" on an existing transfer row navigates to `/transfers/new` instead of the detail page for that specific transfer. This means there's no way to act on an existing transfer from the list view.

---

## ✅ Working Features (Confirmed)

| Feature | Pages |
|---|---|
| Password Login (both roles) | `/login` |
| Dashboard stats & charts load | `/dashboard` |
| Product search bar | `/products` |
| Stock Ledger search & table | `/ledger` |
| Receipts → "Process" opens detail view | `/receipts` |
| Receipt validation form & "Validate & Receive" | `/receipts/[id]` |
| Delivery Orders status filter dropdown | `/deliveries` |
| Deliveries → "Resume/Start picking" navigates correctly | `/deliveries/[id]` |
| "Start Transfer" button works | `/transfers` |
| Profile page edit & Save Changes | `/profile` |
| Logout (both roles) | Global |
| Staff Dashboard task queues and metrics load | `/dashboard` |
| "Process next" button on staff dashboard | `/dashboard` |
| Sidebar Dashboard link for Staff (fixed today) | Sidebar |
