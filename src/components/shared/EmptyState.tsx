"use client";

import React from "react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 24px",
        textAlign: "center",
      }}
      className="animate-fade-in"
    >
      {icon && (
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "var(--color-primary-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            color: "var(--color-primary)",
          }}
        >
          {icon}
        </div>
      )}
      <h3
        style={{
          margin: "0 0 8px 0",
          fontSize: "18px",
          fontWeight: 600,
          color: "var(--color-text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: "0 0 24px 0",
          fontSize: "14px",
          color: "var(--color-text-secondary)",
          maxWidth: "400px",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
      {action}
    </div>
  );
}
