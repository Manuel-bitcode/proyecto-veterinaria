"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { UserPlus, PawPrint } from "lucide-react";

export default function RegisterPage() {
  const { handleRegister, error, loading } = useAuth();

  async function submit(formData: FormData) {
    const data = {
      name: String(formData.get("name")),
      email: String(formData.get("email")),
      phone: String(formData.get("phone")),
      password: String(formData.get("password")),
    };
    await handleRegister(data);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-50 via-white to-amber-50 px-6 py-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-brand-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-info rounded-full opacity-20 blur-3xl"></div>
      </div>

      <form
        action={submit}
        className="card w-full max-w-md relative z-10 animate-slideInUp"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-brand-700" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Crear cuenta</h1>
            <p className="text-xs text-slate-500">Únete a SIGSC</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6">
          Registra tus datos y empieza a gestionar tus caninos hoy mismo.
        </p>

        <div className="space-y-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Nombre completo
            </label>
            <input
              name="name"
              placeholder="Juan Pérez"
              required
              className="focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              placeholder="tu@email.com"
              required
              className="focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Teléfono
            </label>
            <input
              name="phone"
              placeholder="+57 300 000 0000"
              className="focus:ring-brand-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
              className="focus:ring-brand-100"
            />
            <p className="text-xs text-slate-500 mt-1">
              Usa mayúsculas, números y caracteres especiales
            </p>
          </div>
        </div>

        {error && (
          <div
            className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium animate-slideInDown"
            style={{ animation: `slideInDown 0.4s ease-out` }}
          >
            {error}
          </div>
        )}

        <button
          className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
          disabled={loading}
        >
          <UserPlus className="w-4 h-4" />
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>

        <div className="border-t border-slate-200 pt-4">
          <p className="text-center text-sm text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              className="font-bold text-brand-700 hover:text-brand-800 transition-colors"
              href="/login"
            >
              Ingresa aquí
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
