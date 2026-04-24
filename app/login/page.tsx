"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { handleLogin, error, loading } = useAuth();

  async function submit(formData: FormData) {
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    await handleLogin(email, password);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-50 to-white px-6">
      <form action={submit} className="card w-full max-w-md">
        <h1 className="text-3xl font-black">Iniciar sesión</h1>
        <p className="mt-2 text-slate-500">
          Accede a SIGSC para gestionar mascotas y citas.
        </p>
        <div className="mt-6 space-y-4">
          <input name="email" type="email" placeholder="Correo" required />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button className="btn-primary mt-6 w-full" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link className="font-bold text-brand-700" href="/register">
            Regístrate
          </Link>
        </p>
        <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs text-slate-500">
          Admin de prueba: admin@sigsc.com / Admin123*
        </p>
      </form>
    </main>
  );
}
