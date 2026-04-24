import Link from "next/link";
import { PawPrint, CalendarDays, ShieldCheck, Stethoscope } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <span className="badge">SIGSC</span>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
            Cuidado canino más simple, humano y organizado.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Plataforma monolítica para registrar mascotas, consultar servicios,
            agendar citas y controlar el historial clínico desde una experiencia
            clara y moderna.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register" className="btn-primary">
              Crear cuenta
            </Link>
            <Link href="/login" className="btn-secondary">
              Iniciar sesión
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="card grid gap-5 bg-white/90">
            {[PawPrint, CalendarDays, Stethoscope, ShieldCheck].map(
              (Icon, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-3xl bg-slate-50 p-5"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="font-bold">
                      {
                        [
                          "Gestión de mascotas",
                          "Citas inteligentes",
                          "Historial clínico",
                          "Seguridad y roles",
                        ][i]
                      }
                    </h3>
                    <p className="text-sm text-slate-500">
                      {
                        [
                          "Registro y edición de caninos",
                          "Agenda por servicio y fecha",
                          "CRUD para administración",
                          "Sesión con cookie segura",
                        ][i]
                      }
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
