import type { Notification } from "@/lib/types";
import { Check, Bell } from "lucide-react";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => Promise<void>;
  showOnlyUnread?: boolean;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
  showOnlyUnread = false,
}: NotificationListProps) {
  const visibleNotifications = showOnlyUnread
    ? notifications.filter((n) => !n.readAt)
    : notifications;

  if (visibleNotifications.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-100 bg-white p-6 text-sm text-slate-500 shadow-soft">
        No tienes notificaciones por mostrar.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visibleNotifications.map((n) => (
        <div
          key={n.id}
          className={`rounded-3xl border p-4 shadow-soft transition-all duration-350 ${n.readAt
              ? "border-slate-100 bg-white"
              : "border-brand-100 bg-brand-50"
            }`}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-brand-100 p-2 text-brand-700">
              <Bell size={18} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium text-slate-800">{n.message}</p>

              {n.appointment && (
                <p className="mt-1 text-xs text-slate-500">
                  {n.appointment.pet.name} · {n.appointment.service.name}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-400">
                {new Date(n.sentAt).toLocaleString("es-CO", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {!n.readAt && (
              <button
                type="button"
                onClick={() => onMarkAsRead(n.id)}
                className="rounded-full border border-brand-100 bg-white p-2 text-brand-700 transition hover:bg-brand-100"
                title="Marcar como leída"
              >
                <Check size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}