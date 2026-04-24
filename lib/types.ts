export type Pet = {
  id: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  ownerId: number;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  category?: string;
  price: number;
  duration?: number;
  active?: boolean;
};

export type AppointmentStatus = "SCHEDULED" | "CANCELLED" | "COMPLETED";

export type Appointment = {
  id: number;
  date: string;
  status: AppointmentStatus;
  notes: string | null;
  pet: Pet;
  service: Service;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export type MedicalRecord = {
  id: number;
  petId: number;
  vetId: number;
  diagnosis: string;
  treatment: string;
  notes: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: number;
  userId: number;
  appointmentId?: number | null;
  message: string;
  sentAt: string;
  readAt?: string | null;
  appointment?: {
    id: number;
    date: string;
    pet: Pet;
    service: Service;
  } | null;
};