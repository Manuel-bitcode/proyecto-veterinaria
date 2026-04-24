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
  price: string;
  duration: number;
};

export type Appointment = {
  id: number;
  date: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes: string;
  pet: Pet;
  service: Service;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export type MedicalRecord = {
  id: number;
  petId: number;
  vetId: number;
  diagnosis: string;
  treatment: string;
  notes: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};

export type Notification = {
  id: number;
  userId: number;
  appointmentId?: number;
  message: string;
  sentAt: string;
  readAt?: string;
  appointment?: {
    id: number;
    pet: Pet;
    service: Service;
    date: string;
  };
};