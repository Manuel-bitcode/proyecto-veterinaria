"use client";
import { PageShell } from "@/components/PageShell";
import { CalendarDays, HeartPulse, PawPrint, Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "@/components/notifications/NotificationList";

export default function DashboardPage() {
  const { notifications, loading, markAsRead, unreadCount } = useNotifications();

  const cards = [
    [
      PawPrint,
      "Mascotas",
      "Registra y administra la información de tus caninos.",
    ],
    [CalendarDays, "Citas", "Agenda servicios veterinarios en pocos pasos."],
    [
      HeartPulse,
      "Historial",
      "Consulta los registros clínicos de cada mascota.",
    ],
    [Bell, "Recordatorios", "Recibe notificaciones asociadas a tus citas."],
  ] as const;

  return (
    <PageShell
      title="Panel principal"
      subtitle="Gestiona desde un solo lugar los procesos principales del cuidado canino."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(([Icon, title, desc]) => (
          <div className="card" key={title}>
            <Icon className="text-brand-700" />
            <h2 className="mt-4 text-xl font-bold">{title}</h2>
            <p className="mt-2 text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </div>

      {unreadCount > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Notificaciones ({unreadCount})</h3>
          {loading ? (
            <p>Cargando notificaciones...</p>
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkAsRead={markAsRead}
            />
          )}
        </div>
      )}

      {unreadCount === 0 && !loading && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4">Notificaciones</h3>
          <div className="card">
            <p className="text-slate-500">No tienes notificaciones pendientes. Las notificaciones aparecen cuando agendes citas para tus mascotas.</p>
          </div>
        </div>
      )}
    </PageShell>
  );
}
