"use client";
import { useEffect, useState } from "react";
import { Appointment, Pet, Service } from "@/lib/types";
import {
  fetchAppointmentsData,
  createAppointment,
  cancelAppointment,
} from "@/lib/appointments-api";

export function useAppointments() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setError("");
      const data = await fetchAppointmentsData();
      setPets(data.pets);
      setServices(data.services);
      setAppointments(data.appointments);
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
      await createAppointment({
        petId: String(formData.get("petId")),
        serviceId: String(formData.get("serviceId")),
        date: String(formData.get("date")),
        notes: String(formData.get("notes") || ""),
      });
      (document.getElementById("appointmentForm") as HTMLFormElement)?.reset();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agendar");
    }
  };

  const cancel = async (id: number) => {
    try {
      await cancelAppointment(id);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cancelar");
    }
  };

  return { pets, services, appointments, error, loading, submit, cancel };
}