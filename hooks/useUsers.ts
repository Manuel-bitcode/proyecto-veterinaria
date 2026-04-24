"use client";
import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import { fetchUsers, createUser, updateUser, deleteUser } from "@/lib/users-api";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setError("");
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar");
      if (err instanceof Error && err.message === "Unauthorized") {
        location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const submit = async (formData: FormData) => {
    try {
      setError("");
      const data = {
        name: String(formData.get("name")),
        email: String(formData.get("email")),
        phone: String(formData.get("phone") || ""),
        role: formData.get("role") as "USER" | "ADMIN",
        password: String(formData.get("password") || ""),
      };

      if (editing) {
        await updateUser({ id: editing.id, ...data });
      } else {
        await createUser(data);
      }

      setEditing(null);
      (document.getElementById("userForm") as HTMLFormElement)?.reset();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await deleteUser(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    }
  };

  return { users, editing, setEditing, error, loading, submit, remove };
}