import { Appointment } from "@/lib/types";

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: number) => Promise<void>;
}

export default function AppointmentList({
  appointments,
  onCancel,
}: AppointmentListProps) {
  return (
    <div className="space-y-4">
      {appointments.map((a) => (
        <div className="card" key={a.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="badge">{a.status}</span>
              <h3 className="mt-3 text-xl font-bold">{a.service.name}</h3>
              <p className="text-sm text-slate-500">Mascota: {a.pet.name}</p>
              <p className="text-sm text-slate-500">
                {new Date(a.date).toLocaleString("es-CO")}
              </p>
            </div>
            {a.status === "PENDING" && (
              <button
                onClick={() => onCancel(a.id)}
                className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}