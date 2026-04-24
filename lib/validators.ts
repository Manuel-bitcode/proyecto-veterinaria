import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(8, "La contraseña debe tener mínimo 8 caracteres"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const petSchema = z.object({
  name: z.string().min(1, "El nombre de la mascota es obligatorio"),
  breed: z.string().optional(),
  age: z.coerce.number().int().min(0).optional().nullable(),
  weight: z.coerce.number().min(0).optional().nullable(),
  sex: z.string().optional(),
});

export const appointmentSchema = z.object({
  petId: z.coerce.number().int().positive(),
  serviceId: z.coerce.number().int().positive(),
  date: z.string().datetime(),
  notes: z.string().optional(),
});

export const medicalRecordSchema = z.object({
  petId: z.coerce.number().int().positive(),
  diagnosis: z.string().min(3, "El diagnóstico es obligatorio"),
  treatment: z.string().optional(),
  observations: z.string().optional(),
  recordDate: z.string().datetime().optional(),
});
