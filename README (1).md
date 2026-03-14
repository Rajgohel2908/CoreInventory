<div align="center">

# 📦 CoreInventory

**A high-performance Inventory & Warehouse Management System**  
Real-time stock tracking · Multi-location logistics · Secure digital auditing

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=flat-square&logo=socket.io)](https://socket.io/)

</div>

---

## 👥 Team Members

| # | Name | Email |
|---|------|-------|
| 1 | **Raj Gohel** *(Lead)* | rajgohel2908@gmail.com |
| 2 | Aniket Rathod | rathodaniket907@gmail.com |
| 3 | Rudra Patel | rudrarp2006@gmail.com |
| 4 | Om Patel | om4630084@gmail.com |

---

## ✨ Features

- 🔐 **Multi-Factor Auth** — Secure login flow with OTP verification via SMS & Email
- 🏗️ **Warehouse Logistics** — Manage multiple storage locations and stock transfers
- 📦 **Dynamic Inventory** — Add, edit, and track product lifecycles in real-time
- 📑 **Digital Ledger** — Automated audit trails for every stock movement
- 🔔 **Instant Alerts** — Live notifications via Socket.io for critical stock updates
- 📊 **Smart Dashboard** — Role-based analytics views for Managers and Staff

---

## 🛠️ Tech Stack

### Frontend & Framework

| Technology | Purpose |
|------------|---------|
| [Next.js 15](https://nextjs.org/) (App Router) | SSR, Dynamic Routing, Server Components |
| [Tailwind CSS](https://tailwindcss.com/) | Modern utility-first UI styling |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe codebase to prevent runtime crashes |
| [Lucide React](https://lucide.dev/) | Clean, consistent vector icons |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management for UI & notifications |

### Backend & Infrastructure

| Technology | Purpose |
|------------|---------|
| Next.js API Routes | Serverless backend logic |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Document-based data modeling |
| [Socket.io](https://socket.io/) | Real-time push notifications for stock alerts |
| JWT + Secure Cookies | Production-grade authentication |
| [Twilio](https://www.twilio.com/) & [Nodemailer](https://nodemailer.com/) | Multi-channel OTP (SMS/Email) integration |

---

## 📁 Project Structure

```
CoreInventory/
├── src/
│   ├── app/                   # Next.js App Router (Pages & API)
│   │   ├── (auth)/            # Auth modules — Login, Signup, OTP
│   │   ├── (dashboard)/       # Core business logic pages
│   │   └── api/               # Serverless API endpoints
│   ├── components/            # Modular, reusable UI components
│   ├── context/               # Socket & Auth providers
│   ├── lib/                   # Config (DB, Mailer, Twilio, Auth)
│   ├── models/                # Mongoose schemas
│   ├── store/                 # Zustand global stores
│   └── types/                 # TypeScript definitions
└── next.config.ts             # Build configuration
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following:

- **Node.js** v18.17 or higher
- **MongoDB** instance — Local or [Atlas](https://www.mongodb.com/cloud/atlas)
- **Twilio** Account SID & Auth Token (for SMS OTP)
- **SMTP credentials** (for Email OTP)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/rajgohel2908/coreinventory.git
cd coreinventory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_password
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

---

## ▶️ Running the App

**Development Server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production Build:**

```bash
npm run build
npm start
```

---

## 🔌 API Endpoints

| Module | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| Auth | `POST` | `/api/auth/login` | Create user session |
| Auth | `POST` | `/api/auth/otp` | Dispatch OTP to user |
| Products | `GET` | `/api/products` | Fetch inventory list |
| Logistics | `POST` | `/api/transfers` | Record stock movement |
| Warehouses | `GET` | `/api/warehouses` | View all storage sites |

---

## 📄 License

This project is built for academic and demonstration purposes.  
© 2024 CoreInventory Team — Raj Gohel, Aniket Rathod, Rudra Patel, Om Patel.
