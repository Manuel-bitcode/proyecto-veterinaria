"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, PawPrint } from "lucide-react";

export default function LoginPage() {
  const { handleLogin, error, loading } = useAuth();

  async function submit(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    await handleLogin(email, password);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-50 via-white to-amber-50 px-6 py-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-brand-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-info rounded-full opacity-20 blur-3xl"></div>
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
            <h1 className="text-2xl font-black">Iniciar sesión</h1>
            <p className="text-xs text-slate-500">Bienvenido a SIGSC</p>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6">
          Accede para gestionar mascotas, citas y servicios veterinarios.
        </p>

        <div className="space-y-3 mb-4">
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
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="focus:ring-brand-100"
            />
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
          <LogIn className="w-4 h-4" />
          {loading ? "Ingresando..." : "Ingresar"}
        </button>

        <div className="border-t border-slate-200 pt-4">
          <p className="text-center text-sm text-slate-600 mb-4">
            ¿No tienes cuenta?{" "}
            <Link
              className="font-bold text-brand-700 hover:text-brand-800 transition-colors"
              href="/register"
            >
              Regístrate aquí
            </Link>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 text-xs">
            <p className="font-semibold text-blue-900 mb-2">🔑 Credenciales de prueba:</p>
            <div className="space-y-1 text-blue-800 font-mono text-xs">
              <p>Admin: admin@sigsc.com / Admin123*</p>
              <p>Usuario: ana@sigsc.com / User123*</p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
