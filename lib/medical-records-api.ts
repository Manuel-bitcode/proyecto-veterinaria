export async function fetchMedicalRecordsData() {
  const [pRes, rRes] = await Promise.all([
    fetch("/api/pets"),
    fetch("/api/medical-records"),
  ]);

  if (!pRes.ok) throw new Error("Unauthorized");

  const pets = (await pRes.json()).pets;
  const recordsRes = await rRes.json();
  if (!rRes.ok) throw new Error(recordsRes.error);
  const records = recordsRes.records;

  return { pets, records };
}

export async function createMedicalRecord(data: {
  petId: number;
  diagnosis: string;
  treatment?: string;
  notes?: string;
  date: string;
}) {
  const res = await fetch("/api/medical-records", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      recordDate: new Date(data.date).toISOString(),
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear registro");
  }

  return res;
}

export async function updateMedicalRecord(data: {
  id: number;
  petId: number;
  diagnosis: string;
  treatment?: string;
  notes?: string;
  date: string;
}) {
  const res = await fetch("/api/medical-records", {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      recordDate: new Date(data.date).toISOString(),
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al actualizar registro");
  }

  return res;
}

export async function deleteMedicalRecord(id: number) {
  const res = await fetch("/api/medical-records", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al eliminar registro");
  }

  return res;
}