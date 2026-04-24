import { User } from "@/lib/types";

interface UserFormProps {
  editing: User | null;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancelEdit: () => void;
  error: string;
}

export default function UserForm({
  editing,
  onSubmit,
  onCancelEdit,
  error,
}: UserFormProps) {
  return (
    <form id="userForm" action={onSubmit} className="card space-y-4">
      <h2 className="text-xl font-bold">
        {editing ? "Editar usuario" : "Nuevo usuario"}
      </h2>
      <input
        name="name"
        placeholder="Nombre"
        defaultValue={editing?.name}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Correo"
        defaultValue={editing?.email}
        required
      />
      <input
        name="phone"
        placeholder="Teléfono"
        defaultValue={editing?.phone}
      />
      <select name="role" defaultValue={editing?.role || "USER"}>
        <option value="USER">Usuario</option>
        <option value="ADMIN">Administrador</option>
      </select>
      <input
        name="password"
        type="password"
        placeholder={
          editing
            ? "Nueva contraseña (opcional)"
            : "Contraseña (opcional: Usuario123*)"
        }
      />
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