export const dynamic = "force-dynamic";
import { PageShell } from "@/components/PageShell";
import { prisma } from "@/lib/prisma";
import { Heart, ShieldAlert, Sparkles } from "lucide-react";

const categoryIcons: Record<string, any> = {
  "Preventiva": ShieldAlert,
  "Correctiva": Heart,
  "Bienestar": Sparkles,
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const groupedByCategory = services.reduce(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s);
      return acc;
    },
    {} as Record<string, typeof services>
  );

  return (
    <PageShell
      title="Catálogo de servicios"
      subtitle="Servicios disponibles para atención preventiva, correctiva y bienestar canino."
    >
      {Object.entries(groupedByCategory).map(([category, items], sectionIdx) => {
        const Icon = categoryIcons[category] || Heart;

        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{category}</h2>
                <p className="text-sm text-slate-500">{items.length} servicios disponibles</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((s, idx) => (
                <article
                  key={s.id}
                  className="card-interactive card group"
                  style={{
                    animation: `slideInUp 0.5s ease-out ${(sectionIdx * 0.3 + idx * 0.1)}s both`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-100 text-brand-700 uppercase tracking-wide">
                      {s.category}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 text-brand-700 text-lg transition-opacity">
                      →
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{s.name}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {s.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Valor aproximado</p>
                      <p className="text-2xl font-black text-brand-700">
                        ${Number(s.price).toLocaleString("es-CO")}
                      </p>
                    </div>
                    <div className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity">
                      🐾
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </PageShell>
  );
}
