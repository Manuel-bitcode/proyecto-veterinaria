"use client";
import { PageShell } from "@/components/PageShell";
import { useMedicalRecords } from "@/hooks/useMedicalRecords";
import RecordForm from "@/components/medical/RecordForm";
import RecordList from "@/components/medical/RecordList";

export default function MedicalRecordsPage() {
  const { pets, records, editing, setEditing, error, loading, submit, remove } = useMedicalRecords();

  if (loading) return <PageShell title="Historial clínico"><p>Cargando...</p></PageShell>;

  return (
    <PageShell
      title="Historial clínico"
      subtitle="CRUD administrativo para registrar diagnósticos, tratamientos y observaciones clínicas."
    >
      <div className="grid gap-6 lg:grid-cols-[460px_1fr]">
        <RecordForm
          pets={pets}
          editing={editing}
          onSubmit={submit}
          onCancelEdit={() => setEditing(null)}
          error={error}
        />
        <RecordList records={records} onEdit={setEditing} onDelete={remove} />
      </div>
    </PageShell>
  );
}
