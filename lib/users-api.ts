export async function fetchUsers() {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Unauthorized");
  return (await res.json()).users;
}

export async function createUser(data: {
  name: string;
  email: string;
  phone?: string;
  role: "USER" | "ADMIN";
  password?: string;
}) {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear usuario");
  }

  return res;
}

export async function updateUser(data: {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "USER" | "ADMIN";
  password?: string;
}) {
  const res = await fetch("/api/users", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al actualizar usuario");
  }

  return res;
}

export async function deleteUser(id: number) {
  const res = await fetch("/api/users", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al eliminar usuario");
  }

  return res;
}