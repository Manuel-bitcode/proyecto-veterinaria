"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

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
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-50 to-white px-6">
      <form action={submit} className="card w-full max-w-md">
        <h1 className="text-3xl font-black">Crear cuenta</h1>
        <p className="mt-2 text-slate-500">
          Registra tus datos y empieza a gestionar tus caninos.
        </p>
        <div className="mt-6 space-y-4">
          <input name="name" placeholder="Nombre completo" required />
          <input name="email" type="email" placeholder="Correo" required />
          <input name="phone" placeholder="Teléfono" />
          <input
            name="password"
            type="password"
            placeholder="Contraseña mínimo 8 caracteres"
            required
          />
        </div>
        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <button className="btn-primary mt-6 w-full" disabled={loading}>
          {loading ? "Registrando..." : "Registrarme"}
        </button>
        <p className="mt-4 text-center text-sm text-slate-500">
          ¿Ya tienes cuenta?{" "}
          <Link className="font-bold text-brand-700" href="/login">
            Ingresa
          </Link>
        </p>
      </form>
    </main>
  );
}
