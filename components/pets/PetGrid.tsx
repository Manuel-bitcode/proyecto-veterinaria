import { Pet } from "@/lib/types";

interface PetGridProps {
  pets: Pet[];
  onEdit: (pet: Pet) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function PetGrid({ pets, onEdit, onDelete }: PetGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {pets.map((p) => (
        <div className="card" key={p.id}>
          <h3 className="text-xl font-bold">{p.name}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {p.breed || "Sin raza"} · {p.age ?? "-"} años ·{" "}
            {p.weight ?? "-"} kg
          </p>
          <div className="mt-5 flex gap-2">
            <button className="btn-secondary" onClick={() => onEdit(p)}>
              Editar
            </button>
            <button
              className="rounded-2xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-700"
              onClick={() => onDelete(p.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}