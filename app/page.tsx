import Link from "next/link";
import { PawPrint, CalendarDays, ShieldCheck, Stethoscope, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: PawPrint,
      title: "Gestión de mascotas",
      desc: "Registro y edición de caninos",
    },
    {
      icon: CalendarDays,
      title: "Citas inteligentes",
      desc: "Agenda por servicio y fecha",
    },
    {
      icon: Stethoscope,
      title: "Historial clínico",
      desc: "CRUD para administración",
    },
    {
      icon: ShieldCheck,
      title: "Seguridad y roles",
      desc: "Sesión con cookie segura",
    },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-brand-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="animate-slideInUp">
          <span className="badge">SIGSC</span>
          <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
            Cuidado canino más simple, humano y organizado.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Plataforma monolítica para registrar mascotas, consultar servicios,
            agendar citas y controlar el historial clínico desde una experiencia
            clara y moderna.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="btn-primary group flex items-center gap-2"
            >
              Crear cuenta
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="btn-secondary">
              Iniciar sesión
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
            {[
              { label: "Mascotas", value: "∞" },
              { label: "Citas", value: "∞" },
              { label: "Seguro", value: "✓" },
            ].map((stat, i) => (
              <div key={i} className="animate-slideInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="text-2xl font-black text-brand-700">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-slideInUp" style={{ animationDelay: "0.2s" }}>
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-info rounded-full opacity-50 blur-3xl"></div>

          <div className="card grid gap-4 bg-white/95 backdrop-blur relative z-10">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group cursor-pointer flex items-center gap-4 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 hover:from-brand-50 hover:to-brand-100 transition-all duration-350"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${0.3 + i * 0.1}s both`,
                  }}
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-white group-hover:bg-brand-100 flex items-center justify-center text-brand-700 group-hover:scale-110 transition-transform shadow-soft">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-500">{feature.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-900 py-16 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black text-white">
            ¿Listo para transformar el cuidado de tu mascota?
          </h2>
          <p className="mt-4 text-brand-100">
            Únete a cientos de propietarios que confían en SIGSC
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-brand-900 font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            Comienza ahora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
