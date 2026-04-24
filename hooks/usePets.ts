"use client";
import { useEffect, useState } from "react";
import { Pet } from "@/lib/types";
import { fetchPets, createPet, updatePet, deletePet } from "@/lib/pets-api";

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [editing, setEditing] = useState<Pet | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setError("");
      const data = await fetchPets();
      setPets(data);
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
        breed: String(formData.get("breed") || ""),
        age: formData.get("age") ? Number(formData.get("age")) : undefined,
        weight: formData.get("weight") ? Number(formData.get("weight")) : undefined,
        sex: String(formData.get("sex") || ""),
      };

      if (editing) {
        await updatePet({ id: editing.id, ...data });
      } else {
        await createPet(data);
      }

      setEditing(null);
      (document.getElementById("petForm") as HTMLFormElement)?.reset();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar mascota?")) return;
    try {
      await deletePet(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    }
  };

  return { pets, editing, setEditing, error, loading, submit, remove };
}