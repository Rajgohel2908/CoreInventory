"use client";

import React from "react";

type StatusType = "Draft" | "Waiting" | "Ready" | "Done" | "Canceled" | "Confirmed" | "In Transit" | "Received" | "Picking" | "Packed" | "Dispatched" | string;

const statusStyles: Record<string, { bg: string; text: string }> = {
  Draft: { bg: "var(--color-draft-bg)", text: "var(--color-draft-text)" },
  Waiting: { bg: "var(--color-warning-light)", text: "var(--color-warning-text)" },
  Ready: { bg: "var(--color-info-light)", text: "var(--color-info-text)" },
  Done: { bg: "var(--color-success-light)", text: "var(--color-success-text)" },
  Canceled: { bg: "var(--color-error-light)", text: "var(--color-error-text)" },
  Confirmed: { bg: "var(--color-info-light)", text: "var(--color-info-text)" },
  "In Transit": { bg: "var(--color-warning-light)", text: "var(--color-warning-text)" },
  Received: { bg: "var(--color-success-light)", text: "var(--color-success-text)" },
  Picking: { bg: "var(--color-warning-light)", text: "var(--color-warning-text)" },
  Packed: { bg: "var(--color-info-light)", text: "var(--color-info-text)" },
  Dispatched: { bg: "var(--color-success-light)", text: "var(--color-success-text)" },
};

interface StatusBadgeProps {
  status: StatusType;
  style?: React.CSSProperties;
}

export default function StatusBadge({ status, style }: StatusBadgeProps) {
  const styles = statusStyles[status] || statusStyles.Draft;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 8px",
        borderRadius: "var(--radius-full)",
        fontSize: "11px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        background: styles.bg,
        color: styles.text,
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {status}
    </span>
  );
}
