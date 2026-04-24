import { Pet } from "@/lib/types";

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
      <h2 className="text-xl font-bold">
        {editing ? "Editar mascota" : "Nueva mascota"}
      </h2>
      <input
        name="name"
        placeholder="Nombre"
        defaultValue={editing?.name}
        required
      />
      <input
        name="breed"
        placeholder="Raza"
        defaultValue={editing?.breed}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="age"
          type="number"
          placeholder="Edad"
          defaultValue={editing?.age}
        />
        <input
          name="weight"
          type="number"
          step="0.1"
          placeholder="Peso"
          defaultValue={editing?.weight}
        />
      </div>
      <select name="sex" defaultValue={editing?.sex}>
        <option value="">Sexo</option>
        <option>Macho</option>
        <option>Hembra</option>
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full">Guardar</button>
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