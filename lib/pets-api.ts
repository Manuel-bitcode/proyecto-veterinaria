export async function fetchPets() {
  const res = await fetch("/api/pets");
  if (!res.ok) throw new Error("Unauthorized");
  return (await res.json()).pets;
}

export async function createPet(data: {
  name: string;
  breed?: string;
  age?: number;
  weight?: number;
  sex?: string;
}) {
  const res = await fetch("/api/pets", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear mascota");
  }

  return res;
}

export async function updatePet(data: {
  id: number;
  name: string;
  breed?: string;
  age?: number;
  weight?: number;
  sex?: string;
}) {
  const res = await fetch("/api/pets", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al actualizar mascota");
  }

  return res;
}

export async function deletePet(id: number) {
  const res = await fetch("/api/pets", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al eliminar mascota");
  }

  return res;
}