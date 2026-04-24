import { Notification } from "@/lib/types";
import { Check, X } from "lucide-react";

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
    <div className="space-y-3">
      {notifications.map((n, i) => (
        <div
          key={n.id}
          className={`card transform transition-all duration-350 ${
            !n.readAt
              ? "border-l-4 border-l-brand-500 bg-brand-50/30 hover:bg-brand-50"
              : "opacity-75"
          }`}
          style={{
            animation: `slideInUp 0.4s ease-out ${i * 0.05}s both`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{n.message}</p>
              <p className="text-xs text-slate-500 mt-2">
                {new Date(n.sentAt).toLocaleString("es-CO", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {!n.readAt ? (
              <button
                onClick={() => onMarkAsRead(n.id)}
                className="flex-shrink-0 group/btn relative"
              >
                <div className="absolute -inset-2 bg-brand-500/20 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                <Check className="w-5 h-5 text-brand-600 relative group-hover/btn:scale-110 transition-transform" />
              </button>
            ) : (
              <div className="flex-shrink-0 text-slate-400">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}