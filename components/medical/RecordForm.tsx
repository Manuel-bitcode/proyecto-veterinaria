import { Pet, MedicalRecord } from "@/lib/types";

interface RecordFormProps {
  pets: Pet[];
  editing: MedicalRecord | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancelEdit: () => void;
  error: string;
}

export default function RecordForm({
  pets,
  editing,
  onSubmit,
  onCancelEdit,
  error,
}: RecordFormProps) {
  return (
    <form id="recordForm" action={onSubmit} className="card space-y-4">
      <h2 className="text-xl font-bold">
        {editing ? "Editar registro" : "Nuevo registro clínico"}
      </h2>
      <select name="petId" defaultValue={editing?.petId} required>
        <option value="">Selecciona mascota</option>
        {pets.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        name="recordDate"
        type="datetime-local"
        defaultValue={
          editing
            ? new Date(editing.date).toISOString().slice(0, 16)
            : ""
        }
      />
      <textarea
        name="diagnosis"
        placeholder="Diagnóstico"
        defaultValue={editing?.diagnosis}
        required
      />
      <textarea
        name="treatment"
        placeholder="Tratamiento"
        defaultValue={editing?.treatment}
      />
      <textarea
        name="observations"
        placeholder="Observaciones"
        defaultValue={editing?.notes || ""}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full">Guardar historial</button>
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