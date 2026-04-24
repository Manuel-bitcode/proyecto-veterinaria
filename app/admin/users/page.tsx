"use client";
import { PageShell } from "@/components/PageShell";
import { useUsers } from "@/hooks/useUsers";
import UserForm from "@/components/admin/UserForm";
import UserList from "@/components/admin/UserList";

export default function AdminUsersPage() {
  const { users, editing, setEditing, error, loading, submit, remove } = useUsers();

  if (loading) return <PageShell title="Gestión de usuarios"><p>Cargando...</p></PageShell>;

  return (
    <PageShell
      title="Gestión de usuarios"
      subtitle="Administración de cuentas y roles del sistema SIGSC."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <UserForm
          editing={editing}
          onSubmit={submit}
          onCancelEdit={() => setEditing(null)}
          error={error}
        />
        <UserList users={users} onEdit={setEditing} onDelete={remove} />
      </div>
    </PageShell>
  );
}
