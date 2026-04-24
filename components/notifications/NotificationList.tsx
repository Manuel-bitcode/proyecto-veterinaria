import { Notification } from "@/lib/types";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => Promise<void>;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No tienes notificaciones pendientes.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`card ${!n.readAt ? "border-l-4 border-l-brand-500" : ""}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm">{n.message}</p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(n.sentAt).toLocaleString("es-CO")}
              </p>
            </div>
            {!n.readAt && (
              <button
                onClick={() => onMarkAsRead(n.id)}
                className="text-xs bg-brand-50 text-brand-700 px-3 py-1 rounded-full hover:bg-brand-100"
              >
                Marcar como leída
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}