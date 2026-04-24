import { prisma } from "@/lib/prisma";
import { getSession, requireUser } from "@/lib/auth";
import { fail, handleError, ok } from "@/lib/http";
import { petSchema } from "@/lib/validators";

export async function GET() {
  try {
    const user = await requireUser();
    const where = user.role === "ADMIN" ? {} : { ownerId: user.id };
    const pets = await prisma.pet.findMany({
      where,
      include: { owner: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return ok({ pets });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = petSchema.parse(await req.json());
    const pet = await prisma.pet.create({
      data: { ...body, ownerId: user.id },
    });
    return ok({ pet }, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: Request) {
  try {
    const user = await requireUser();
    const data = await req.json();
    const id = Number(data.id);
    if (!id) return fail("Id requerido", 400);
    const body = petSchema.parse(data);
    const pet = await prisma.pet.findUnique({ where: { id } });
    if (!pet) return fail("Mascota no encontrada", 404);
    if (user.role !== "ADMIN" && pet.ownerId !== user.id)
      return fail("No autorizado", 403);
    const updated = await prisma.pet.update({ where: { id }, data: body });
    return ok({ pet: updated });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const user = await requireUser();
    const { id } = await req.json();
    const petId = Number(id);
    if (!petId) return fail("Id requerido", 400);
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    if (!pet) return fail("Mascota no encontrada", 404);
    if (user.role !== "ADMIN" && pet.ownerId !== user.id)
      return fail("No autorizado", 403);
    await prisma.pet.delete({ where: { id: petId } });
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
