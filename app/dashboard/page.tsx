"use client";

import Link from "next/link";
import {
  CalendarDays,
  HeartPulse,
  PawPrint,
  Bell,
  ArrowRight,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationList from "@/components/notifications/NotificationList";

export default function DashboardPage() {
  const {
    notifications,
    loading,
    error,
    markAsRead,
    unreadCount,
  } = useNotifications();

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
      "/pets",
    ],
    [
      Bell,
      "Recordatorios",
      "Consulta tus notificaciones y recordatorios.",
      "/notifications",
    ],
  ] as const;

  return (
    <PageShell
      title="Panel principal"
      subtitle="Gestiona tus mascotas, citas y recordatorios desde un solo lugar."
    >
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map(([Icon, title, desc, href]) => (
          <Link
            key={title}
            href={href}
            className="card card-interactive group block"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
              <Icon className="icon" size={24} />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{desc}</p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700">
              Ver más <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </section>

      <section className="card mt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Últimas notificaciones
            </h3>
            <p className="text-sm text-slate-500">
              {unreadCount > 0
                ? `Tienes ${unreadCount} notificación${unreadCount !== 1 ? "es" : ""
                } pendiente${unreadCount !== 1 ? "s" : ""}.`
                : "No tienes notificaciones pendientes."}
            </p>
          </div>

          <Link href="/notifications" className="btn-secondary">
            Ver todas
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Cargando notificaciones...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <NotificationList
            notifications={notifications.slice(0, 5)}
            onMarkAsRead={markAsRead}
          />
        )}
      </section>
    </PageShell>
  );
}