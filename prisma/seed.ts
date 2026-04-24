import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const services = [
  ["Consulta general", "Evaluación médica inicial o de control para caninos.", "Salud preventiva", 65000],
  ["Vacunación", "Aplicación de vacunas según esquema veterinario.", "Salud preventiva", 55000],
  ["Desparasitación", "Tratamiento preventivo contra parásitos internos y externos.", "Salud preventiva", 45000],
  ["Esterilización", "Procedimiento quirúrgico preventivo para control reproductivo.", "Cirugía", 280000],
  ["Radiología", "Imagen diagnóstica para evaluación ósea o interna.", "Diagnóstico", 120000],
  ["Ecografía", "Estudio diagnóstico por ultrasonido.", "Diagnóstico", 135000],
  ["Laboratorio clínico", "Pruebas de sangre, orina u otros análisis básicos.", "Diagnóstico", 95000],
  ["Cirugía correctiva", "Procedimiento quirúrgico según valoración médica.", "Cirugía", 450000],
  ["Peluquería", "Baño, corte y arreglo estético para caninos.", "Estética", 60000],
  ["Corte de uñas", "Cuidado y corte seguro de uñas.", "Estética", 25000],
  ["Limpieza bucal", "Higiene dental y revisión bucal preventiva.", "Estética y salud", 85000],
  ["Masaje terapéutico", "Sesión de relajación y bienestar muscular.", "Bienestar", 70000],
  ["Asesoría nutricional", "Orientación sobre alimentación adecuada del canino.", "Nutrición", 90000],
  ["Guardería pasa día", "Cuidado temporal durante el día.", "Cuidado temporal", 50000],
  ["Hotel canino", "Hospedaje y cuidado nocturno para caninos.", "Cuidado temporal", 95000]
];

async function main() {
  const adminPassword = await bcrypt.hash("Admin123*", 12);
  const userPassword = await bcrypt.hash("User123*", 12);

  await prisma.user.upsert({
    where: { email: "admin@sigsc.com" },
    update: {},
    create: {
      name: "Administrador SIGSC",
      email: "admin@sigsc.com",
      passwordHash: adminPassword,
      phone: "3000000000",
      role: Role.ADMIN
    }
  });

  const users = [
    {
      name: "Laura Pérez",
      email: "laura.vet@sigsc.com",
      passwordHash: adminPassword,
      phone: "3001111111",
      role: Role.ADMIN
    },
    {
      name: "Carlos Gómez",
      email: "carlos.vet@sigsc.com",
      passwordHash: adminPassword,
      phone: "3002222222",
      role: Role.ADMIN
    },
    {
      name: "Ana Torres",
      email: "ana@sigsc.com",
      passwordHash: userPassword,
      phone: "3003333333",
      role: Role.USER
    },
    {
      name: "Juan Martínez",
      email: "juan@sigsc.com",
      passwordHash: userPassword,
      phone: "3004444444",
      role: Role.USER
    },
    {
      name: "María Rodríguez",
      email: "maria@sigsc.com",
      passwordHash: userPassword,
      phone: "3005555555",
      role: Role.USER
    },
    {
      name: "Pedro López",
      email: "pedro@sigsc.com",
      passwordHash: userPassword,
      phone: "3006666666",
      role: Role.USER
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user
    });
  }

  for (const [name, description, category, price] of services) {
    await prisma.service.upsert({
      where: { id: services.findIndex((s) => s[0] === name) + 1 },
      update: {
        name: String(name),
        description: String(description),
        category: String(category),
        price: Number(price),
        active: true
      },
      create: {
        name: String(name),
        description: String(description),
        category: String(category),
        price: Number(price),
        active: true
      }
    });
  }

  console.log("Seed ejecutado correctamente");
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
