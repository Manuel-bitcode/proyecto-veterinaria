export const dynamic = "force-dynamic";
import { PageShell } from "@/components/PageShell";
import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  return (
    <PageShell
      title="Catálogo de servicios"
      subtitle="Servicios disponibles para atención preventiva, correctiva y bienestar canino."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article key={s.id} className="card">
            <span className="badge">{s.category}</span>
            <h2 className="mt-4 text-xl font-bold">{s.name}</h2>
            <p className="mt-2 text-sm text-slate-500">{s.description}</p>
            <p className="mt-5 text-2xl font-black text-brand-700">
              ${Number(s.price).toLocaleString("es-CO")}
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
