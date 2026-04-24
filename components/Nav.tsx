"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PawPrint, LogOut } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationBell from "@/components/notifications/NotificationBell";

type User = { id: number; name: string; email: string; role: "USER" | "ADMIN" } | null;

export function Nav() {
  const [user, setUser] = useState<User>(null);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    fetch("/api/me").then(r => r.json()).then(d => setUser(d.user));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-3 font-bold text-slate-900">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-700 text-white"><PawPrint size={21}/></span>
          <span>SIGSC</span>
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
          <Link href="/dashboard">Inicio</Link>
          <Link href="/pets">Mascotas</Link>
          <Link href="/services">Servicios</Link>
          <Link href="/appointments">Citas</Link>
          {user?.role === "ADMIN" && <Link href="/admin/medical-records">Historial clínico</Link>}
          {user?.role === "ADMIN" && <Link href="/admin/users">Usuarios</Link>}
        </nav>
        {user ? (
          <div className="flex items-center gap-3">
            <NotificationBell unreadCount={unreadCount} onClick={() => location.href = "/dashboard"} />
            <span className="hidden text-right text-xs text-slate-500 sm:block"><b className="block text-slate-800">{user.name}</b>{user.role}</span>
            <button onClick={logout} className="btn-secondary flex items-center gap-2"><LogOut size={16}/>Salir</button>
          </div>
        ) : <Link className="btn-primary" href="/login">Ingresar</Link>}
      </div>
    </header>
  );
}
