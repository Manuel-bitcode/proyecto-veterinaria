import { User } from "@/lib/types";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => Promise<void>;
}

export default function UserList({ users, onEdit, onDelete }: UserListProps) {
  return (
    <div className="space-y-4">
      {users.map((u) => (
        <article
          key={u.id}
          className="card flex items-center justify-between gap-4"
        >
          <div>
            <span className="badge">{u.role}</span>
            <h3 className="mt-3 text-lg font-bold">{u.name}</h3>
            <p className="text-sm text-slate-500">{u.email}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onEdit(u)} className="btn-secondary">
              Editar
            </button>
            <button
              onClick={() => onDelete(u.id)}
              className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}