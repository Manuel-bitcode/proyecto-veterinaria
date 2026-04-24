import { MedicalRecord } from "@/lib/types";

interface RecordListProps {
  records: MedicalRecord[];
  onEdit: (record: MedicalRecord) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function RecordList({ records, onEdit, onDelete }: RecordListProps) {
  return (
    <div className="space-y-4">
      {records.map((r) => (
        <article key={r.id} className="card">
          <span className="badge">
            {new Date(r.date).toLocaleDateString("es-CO")}
          </span>
          <h3 className="mt-3 text-xl font-bold">{r.petId}</h3>
          <p className="mt-2 text-sm">
            <b>Diagnóstico:</b> {r.diagnosis}
          </p>
          {r.treatment && (
            <p className="mt-1 text-sm">
              <b>Tratamiento:</b> {r.treatment}
            </p>
          )}
          {r.notes && (
            <p className="mt-1 text-sm text-slate-500">
              <b>Observaciones:</b> {r.notes}
            </p>
          )}
          <div className="mt-5 flex gap-2">
            <button className="btn-secondary" onClick={() => onEdit(r)}>
              Editar
            </button>
            <button
              className="rounded-2xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-700"
              onClick={() => onDelete(r.id)}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}