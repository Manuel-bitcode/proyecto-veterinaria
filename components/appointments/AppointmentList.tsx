import { Appointment } from "@/lib/types";
import { Calendar, Clock, Pill, AlertCircle, CheckCircle } from "lucide-react";

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: number) => Promise<void>;
}

const statusConfig = {
  PENDING: {
    label: "Pendiente",
    icon: AlertCircle,
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
  },
  SCHEDULED: {
    label: "Agendada",
    icon: Clock,
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  CONFIRMED: {
    label: "Confirmada",
    icon: CheckCircle,
    color: "bg-green-50 border-green-200 text-green-700",
  },
  COMPLETED: {
    label: "Completada",
    icon: CheckCircle,
    color: "bg-slate-50 border-slate-200 text-slate-700",
  },
  CANCELLED: {
    label: "Cancelada",
    icon: AlertCircle,
    color: "bg-red-50 border-red-200 text-red-700",
  },
};

export default function AppointmentList({
  appointments,
  onCancel,
}: AppointmentListProps) {
  if (appointments.length === 0) {
    return (
      <div className="card bg-gradient-to-br from-brand-50 to-brand-100/50 border-brand-200 text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-soft">
          <Calendar className="w-8 h-8 text-brand-700" />
        </div>
        <p className="text-slate-600 font-medium">No tienes citas agendadas</p>
        <p className="text-sm text-slate-500 mt-2">Agenda una cita con tus mascotas</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((a, i) => {
        const status = statusConfig[a.status as keyof typeof statusConfig] || statusConfig.PENDING;
        const StatusIcon = status.icon;
        const isUpcoming = new Date(a.date) > new Date();

        return (
          <div
            key={a.id}
            className={`card transform transition-all duration-350 border-l-4 ${status.color}`}
            style={{
              animation: `slideInUp 0.4s ease-out ${i * 0.05}s both`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <StatusIcon className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    {status.label}
                  </span>
                  {isUpcoming && (
                    <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-semibold">
                      Próxima
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {a.service.name}
                </h3>

                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-slate-600">
                    🐾 Mascota: <span className="font-semibold">{a.pet.name}</span>
                  </p>
                  <p className="text-slate-600">
                    📅 {new Date(a.date).toLocaleString("es-CO", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {a.notes && (
                    <p className="text-slate-500 italic">
                      Notas: {a.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {a.status === "SCHEDULED" && isUpcoming && (
              <button
                onClick={() => onCancel(a.id)}
                className="mt-4 w-full px-4 py-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-sm font-semibold"
              >
                Cancelar cita
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}