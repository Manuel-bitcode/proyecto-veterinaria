"use client";
import { PageShell } from "@/components/PageShell";
import { useAppointments } from "@/hooks/useAppointments";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import AppointmentList from "@/components/appointments/AppointmentList";

export default function AppointmentsPage() {
  const { pets, services, appointments, error, loading, submit, cancel } =
    useAppointments();

  if (loading) return <PageShell title="Citas"><p>Cargando...</p></PageShell>;

  return (
    <PageShell
      title="Citas"
      subtitle="Agenda servicios del catálogo para tus mascotas y consulta tus reservas."
    >
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <AppointmentForm
          pets={pets}
          services={services}
          onSubmit={submit}
          error={error}
        />
        <AppointmentList appointments={appointments} onCancel={cancel} />
      </div>
    </PageShell>
  );
}
