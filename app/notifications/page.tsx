"use client";

import { PageShell } from "@/components/PageShell";
import NotificationList from "@/components/notifications/NotificationList";
import { useNotifications } from "@/hooks/useNotifications";

export default function NotificationsPage() {
  const {
    notifications,
    loading,
    error,
    markAsRead,
    unreadCount,
    reload,
  } = useNotifications();

  return (
    <PageShell
      title="Notificaciones"
      subtitle="Consulta los recordatorios generados por tus citas y actividades del sistema."
    >
      <div className="card">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Centro de notificaciones
            </h2>
            <p className="text-sm text-slate-500">
              {unreadCount > 0
                ? `Tienes ${unreadCount} notificación${unreadCount !== 1 ? "es" : ""
                } sin leer.`
                : "Todas tus notificaciones están al día."}
            </p>
          </div>

          <button type="button" onClick={reload} className="btn-secondary">
            Actualizar
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Cargando notificaciones...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
          />
        )}
      </div>
    </PageShell>
  );
}