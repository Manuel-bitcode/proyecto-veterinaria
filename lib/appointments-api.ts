export async function fetchAppointmentsData() {
  const [pRes, sRes, aRes] = await Promise.all([
    fetch("/api/pets"),
    fetch("/api/services"),
    fetch("/api/appointments"),
  ]);

  if (!pRes.ok) throw new Error("Unauthorized");

  const pets = (await pRes.json()).pets;
  const services = (await sRes.json()).services;
  const appointments = (await aRes.json()).appointments;

  return { pets, services, appointments };
}

export async function createAppointment(data: {
  petId: string;
  serviceId: string;
  date: string;
  notes: string;
}) {
  const res = await fetch("/api/appointments", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      date: new Date(data.date).toISOString(),
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al crear cita");
  }

  return res;
}

export async function cancelAppointment(id: number) {
  const res = await fetch("/api/appointments", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al cancelar cita");
  }

  return res;
}