import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { fail, handleError, ok } from "@/lib/http";
import { appointmentSchema } from "@/lib/validators";

export async function GET() {
  try {
    const user = await requireUser();
    const appointments = await prisma.appointment.findMany({
      where: user.role === "ADMIN" ? {} : { pet: { ownerId: user.id } },
      include: { pet: true, service: true },
      orderBy: { date: "asc" },
    });
    return ok({ appointments });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = appointmentSchema.parse(await req.json());
    const pet = await prisma.pet.findUnique({ where: { id: body.petId } });
    if (!pet) return fail("Mascota no encontrada", 404);
    if (user.role !== "ADMIN" && pet.ownerId !== user.id)
      return fail("No autorizado", 403);
    const appointment = await prisma.appointment.create({
      data: {
        petId: body.petId,
        serviceId: body.serviceId,
        date: new Date(body.date),
        notes: body.notes,
      },
      include: { service: true, pet: true },
    });
    await prisma.notification.create({
      data: {
        userId: pet.ownerId,
        appointmentId: appointment.id,
        message: `Recordatorio: cita de ${appointment.service.name} para ${appointment.pet.name} el ${appointment.date.toLocaleDateString("es-CO")}`,
      },
    });
    return ok({ appointment }, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requireUser();
    const { id } = await req.json();
    const appointmentId = Number(id);
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { pet: true },
    });
    if (!appointment) return fail("Cita no encontrada", 404);
    if (user.role !== "ADMIN" && appointment.pet.ownerId !== user.id)
      return fail("No autorizado", 403);
    const updated = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });
    return ok({ appointment: updated });
  } catch (error) {
    return handleError(error);
  }
}
