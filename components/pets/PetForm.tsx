import { Pet } from "@/lib/types";
import { PawPrint } from "lucide-react";

interface PetFormProps {
  editing: Pet | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancelEdit: () => void;
  error: string;
}

export default function PetForm({
  editing,
  onSubmit,
  onCancelEdit,
  error,
}: PetFormProps) {
  return (
    <form id="petForm" action={onSubmit} className="card space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
          <PawPrint className="w-5 h-5 text-brand-700" />
        </div>
        <h2 className="text-xl font-bold">
          {editing ? "Editar mascota" : "Nueva mascota"}
        </h2>
      </div>

      <div className="space-y-3">
        <input
          name="name"
          placeholder="Nombre de la mascota"
          defaultValue={editing?.name}
          required
          className="focus:ring-brand-100"
        />

        <input
          name="breed"
          placeholder="Raza"
          defaultValue={editing?.breed}
          className="focus:ring-brand-100"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="age"
            type="number"
            placeholder="Edad"
            defaultValue={editing?.age}
            className="focus:ring-brand-100"
          />
          <input
            name="weight"
            type="number"
            step="0.1"
            placeholder="Peso (kg)"
            defaultValue={editing?.weight}
            className="focus:ring-brand-100"
          />
        </div>

        <select name="sex" defaultValue={editing?.sex} className="focus:ring-brand-100">
          <option value="">Selecciona sexo</option>
          <option>Macho</option>
          <option>Hembra</option>
        </select>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 font-medium">
          {error}
        </div>
      )}

      <button className="btn-primary w-full">
        {editing ? "Actualizar mascota" : "Agregar mascota"}
      </button>

      {editing && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="btn-secondary w-full"
        >
          Cancelar edición
        </button>
      )}
    </form>
  );
}