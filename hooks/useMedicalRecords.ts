"use client";
import { useEffect, useState } from "react";
import { Pet, MedicalRecord } from "@/lib/types";
import {
  fetchMedicalRecordsData,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
} from "@/lib/medical-records-api";

export function useMedicalRecords() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [editing, setEditing] = useState<MedicalRecord | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setError("");
      const data = await fetchMedicalRecordsData();
      setPets(data.pets);
      setRecords(data.records);
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
        petId: Number(formData.get("petId")),
        diagnosis: String(formData.get("diagnosis")),
        treatment: String(formData.get("treatment") || ""),
        notes: String(formData.get("observations") || ""),
        date: String(formData.get("recordDate") || new Date().toISOString()),
      };

      if (editing) {
        await updateMedicalRecord({ id: editing.id, ...data });
      } else {
        await createMedicalRecord(data);
      }

      setEditing(null);
      (document.getElementById("recordForm") as HTMLFormElement)?.reset();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  const remove = async (id: number) => {
    if (!confirm("¿Eliminar registro clínico?")) return;
    try {
      await deleteMedicalRecord(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    }
  };

  return { pets, records, editing, setEditing, error, loading, submit, remove };
}