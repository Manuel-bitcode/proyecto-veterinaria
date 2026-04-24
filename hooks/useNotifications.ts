"use client";

import { useEffect, useState } from "react";
import type { Notification } from "@/lib/types";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "@/lib/notifications-api";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchNotifications();
      setNotifications(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible cargar las notificaciones"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, readAt: new Date().toISOString() } : n
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible marcar la notificación como leída"
      );
    }
  };

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    reload: load,
  };
}