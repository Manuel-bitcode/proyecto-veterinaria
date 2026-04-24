import { Nav } from "./Nav";

export function PageShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="badge mb-3 inline-flex">Sistema Integral de Gestión de Servicios Caninos</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-3 max-w-2xl text-slate-600">{subtitle}</p>}
        </div>
        {children}
      </section>
    </main>
  );
}
