import { Pet } from "@/lib/types";
import { Edit, Trash2, PawPrint } from "lucide-react";

interface PetGridProps {
  pets: Pet[];
  onEdit: (pet: Pet) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function PetGrid({ pets, onEdit, onDelete }: PetGridProps) {
  if (pets.length === 0) {
    return (
      <div className="col-span-full">
        <div className="card bg-gradient-to-br from-brand-50 to-brand-100/50 border-brand-200 text-center py-16">
          <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-soft">
            <PawPrint className="w-10 h-10 text-brand-700" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Sin mascotas</h3>
          <p className="text-slate-500 mt-2">
            Comienza registrando tu primera mascota
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {pets.map((p, i) => (
        <div
          key={p.id}
          className="card-interactive card group"
          style={{
            animation: `slideInUp 0.5s ease-out ${i * 0.1}s both`,
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg shadow-soft">
                {p.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                <p className="text-xs text-slate-500">
                  {p.breed || "Sin raza"} · {p.sex || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3 mb-4 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Edad:</span>
              <span className="font-semibold text-slate-900">
                {p.age ?? "-"} años
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Peso:</span>
              <span className="font-semibold text-slate-900">
                {p.weight ?? "-"} kg
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(p)}
              className="flex-1 flex items-center justify-center gap-2 btn-secondary group-hover:bg-brand-50 group-hover:text-brand-700 group-hover:border-brand-300"
            >
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-2xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-sm font-semibold"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}