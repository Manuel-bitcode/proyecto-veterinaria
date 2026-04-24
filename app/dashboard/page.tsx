"use client";
import { PageShell } from "@/components/PageShell";
import { CalendarDays, HeartPulse, PawPrint, Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "@/components/notifications/NotificationList";
import Link from "next/link";

export default function DashboardPage() {
  const { notifications, loading, markAsRead, unreadCount } =
    useNotifications();

  const cards = [
    [
      PawPrint,
      "Mascotas",
      "Registra y administra la información de tus caninos.",
      "/pets",
    ],
    [
      CalendarDays,
      "Citas",
      "Agenda servicios veterinarios en pocos pasos.",
      "/appointments",
    ],
    [
      HeartPulse,
      "Historial",
      "Consulta los registros clínicos de cada mascota.",
      "/dashboard",
    ],
    [
      Bell,
      "Recordatorios",
      "Recibe notificaciones asociadas a tus citas.",
      "/dashboard",
    ],
  ] as const;

  return (
    <PageShell
      title="Panel principal"
      subtitle="Gestiona desde un solo lugar los procesos principales del cuidado canino."
    >
      {/* Grid de tarjetas mejorado */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map(([Icon, title, desc, href], i) => (
          <Link href={href} key={title}>
            <div
              className="card-interactive card group"
              style={{
                animation: `slideInUp 0.5s ease-out ${i * 0.1}s both`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="icon grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                  <Icon className="w-6 h-6" />
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-700">
                  →
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-500 line-clamp-2">{desc}</p>
              <div className="mt-4 flex items-center text-xs font-semibold text-brand-700 opacity-0 group-hover:opacity-100 transition-opacity">
                Ver más →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Sección de notificaciones mejorada */}
      {unreadCount > 0 && (
        <div
          className="mt-8 animate-slideInUp"
          style={{ animation: `slideInUp 0.5s ease-out 0.4s both` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Notificaciones</h3>
              <p className="text-sm text-slate-500">
                Tienes {unreadCount} notificación
                {unreadCount !== 1 ? "es" : ""} pendiente
                {unreadCount !== 1 ? "s" : ""}
              </p>
            </div>
            <span className="bg-pet px-3 py-1 rounded-full text-white text-sm font-bold animate-bounce">
              {unreadCount}
            </span>
          </div>
          {loading ? (
            <div className="card flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-brand-700 border-transparent border-t-brand-700"></div>
            </div>
          ) : (
            <NotificationList
              notifications={notifications}
              onMarkAsRead={markAsRead}
            />
          )}
        </div>
      )}

      {/* Estado vacío de notificaciones */}
      {unreadCount === 0 && !loading && (
        <div
          className="mt-8 animate-fadeIn"
          style={{ animation: `fadeIn 0.5s ease-out 0.4s both` }}
        >
          <h3 className="text-2xl font-bold mb-4">Notificaciones</h3>
          <div className="card bg-gradient-to-br from-brand-50 to-brand-100/50 border-brand-200 text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-soft">
              <Bell className="w-8 h-8 text-brand-700" />
            </div>
            <p className="text-slate-600 font-medium">
              No tienes notificaciones pendientes
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Las notificaciones aparecen cuando agendes citas para tus mascotas
            </p>
          </div>
        </div>
      )}
    </PageShell>
  );
}
