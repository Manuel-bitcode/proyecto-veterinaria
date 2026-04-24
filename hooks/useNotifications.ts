"use client";
import { useEffect, useState } from "react";
import { Notification } from "@/lib/types";
import { fetchNotifications, markNotificationAsRead } from "@/lib/notifications-api";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      console.log("Cargando notificaciones...");
      const data = await fetchNotifications();
      console.log("Notificaciones cargadas:", data.length);
      setNotifications(data);
    } catch (err) {
      console.error("Error loading notifications:", err);
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
        prev.map((n) => (n.id === id ? { ...n, readAt: new Date().toISOString() } : n))
      );
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  return { notifications, loading, markAsRead, unreadCount, reload: load };
}