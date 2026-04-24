import { Pet, Service } from "@/lib/types";

interface AppointmentFormProps {
  pets: Pet[];
  services: Service[];
  onSubmit: (formData: FormData) => Promise<void>;
  error: string;
}

export default function AppointmentForm({
  pets,
  services,
  onSubmit,
  error,
}: AppointmentFormProps) {
  return (
    <form id="appointmentForm" action={onSubmit} className="card space-y-4">
      <h2 className="text-xl font-bold">Agendar cita</h2>
      <select name="petId" required>
        <option value="">Selecciona mascota</option>
        {pets.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <select name="serviceId" required>
        <option value="">Selecciona servicio</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} - ${Number(s.price).toLocaleString("es-CO")}
          </option>
        ))}
      </select>
      <input name="date" type="datetime-local" required />
      <textarea name="notes" placeholder="Notas adicionales" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn-primary w-full">Agendar</button>
    </form>
  );
}