"use client";

import React, { useState, useEffect } from "react";
import { Bell, X, Check, Info, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { useSocket } from "@/context/SocketContext";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  isRead: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const { socket, isConnected } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!socket) return;

    socket.on("new-notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    // Initial fetch of notifications could go here
    return () => {
      socket.off("new-notification");
    };
  }, [socket]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
    // Emit read event to server if needed
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "SUCCESS": return <CheckCircle size={16} color="var(--color-success)" />;
      case "WARNING": return <AlertTriangle size={16} color="var(--color-warning)" />;
      case "ERROR": return <AlertCircle size={16} color="var(--color-error)" />;
      default: return <Info size={16} color="var(--color-primary)" />;
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "var(--radius-md)",
          color: isConnected ? "var(--color-text-secondary)" : "var(--color-text-muted)",
          transition: "background var(--duration-micro) ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-background)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "var(--color-error)",
              border: "2px solid var(--color-surface)",
              color: "#fff",
              fontSize: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              right: 0,
              width: "360px",
              maxHeight: "480px",
              background: "var(--color-surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-xl)",
              zIndex: 100,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "16px", borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>Notifications</h3>
              <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ overflowY: "auto", flex: 1, padding: "8px" }}>
              {notifications.length === 0 ? (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--color-text-muted)" }}>
                  <Bell size={32} style={{ marginBottom: "12px", opacity: 0.2 }} />
                  <p style={{ fontSize: "13px", margin: 0 }}>No new notifications</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-lg)",
                      marginBottom: "4px",
                      cursor: "pointer",
                      background: n.isRead ? "transparent" : "var(--color-primary-light)",
                      transition: "background 0.2s ease",
                      display: "flex",
                      gap: "12px",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-background)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = n.isRead ? "transparent" : "var(--color-primary-light)"; }}
                  >
                    <div style={{ marginTop: "2px" }}>{getIcon(n.type)}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, margin: "0 0 2px" }}>{n.title}</p>
                      <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0 0 6px", lineHeight: 1.4 }}>{n.message}</p>
                      <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {!n.isRead && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-primary)", marginTop: "6px" }} />}
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: "12px", borderTop: "1px solid var(--color-border)", textAlign: "center" }}>
              <button style={{ background: "none", border: "none", color: "var(--color-primary)", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
                View all notifications
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
