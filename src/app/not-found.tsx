"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-background)",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            background: "var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
          }}
        >
          <FileQuestion size={48} color="var(--color-primary)" />
        </div>
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            margin: "0 0 8px 0",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            margin: "0 0 8px 0",
          }}
        >
          Page Not Found
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-secondary)",
            marginBottom: "32px",
            maxWidth: "400px",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            borderRadius: "var(--radius-md)",
            background: "var(--color-primary)",
            color: "#fff",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 600,
            transition: "background var(--duration-micro) ease",
          }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
