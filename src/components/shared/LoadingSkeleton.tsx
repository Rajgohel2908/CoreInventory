"use client";

import React from "react";

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
  style?: React.CSSProperties;
}

export default function LoadingSkeleton({
  width = "100%",
  height = "20px",
  borderRadius = "var(--radius-md)",
  count = 1,
  style,
}: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-shimmer"
          style={{
            width,
            height,
            borderRadius,
            marginBottom: i < count - 1 ? "8px" : 0,
            ...style,
          }}
        />
      ))}
    </>
  );
}
