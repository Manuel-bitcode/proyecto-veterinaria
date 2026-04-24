"use client";
import { PageShell } from "@/components/PageShell";
import { usePets } from "@/hooks/usePets";
import PetForm from "@/components/pets/PetForm";
import PetGrid from "@/components/pets/PetGrid";

export default function PetsPage() {
  const { pets, editing, setEditing, error, loading, submit, remove } = usePets();

  if (loading) return <PageShell title="Mascotas"><p>Cargando...</p></PageShell>;

  return (
    <PageShell
      title="Mascotas"
      subtitle="Registra, edita y elimina las mascotas asociadas a tu cuenta."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <PetForm
          editing={editing}
          onSubmit={submit}
          onCancelEdit={() => setEditing(null)}
          error={error}
        />
        <PetGrid pets={pets} onEdit={setEditing} onDelete={remove} />
      </div>
    </PageShell>
  );
}
