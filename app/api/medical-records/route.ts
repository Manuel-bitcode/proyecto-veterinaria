import { prisma } from "@/lib/prisma";
import { requireAdmin, requireUser } from "@/lib/auth";
import { fail, handleError, ok } from "@/lib/http";
import { medicalRecordSchema } from "@/lib/validators";

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const petId = Number(searchParams.get("petId"));
    const where =
      user.role === "ADMIN"
        ? petId
          ? { petId }
          : {}
        : petId
          ? { petId, pet: { ownerId: user.id } }
          : { pet: { ownerId: user.id } };
    const records = await prisma.medicalRecord.findMany({
      where,
      include: {
        pet: { include: { owner: { select: { name: true, email: true } } } },
        createdBy: { select: { name: true, role: true } },
      },
      orderBy: { recordDate: "desc" },
    });
    return ok({ records });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdmin();
    const body = medicalRecordSchema.parse(await req.json());
    const record = await prisma.medicalRecord.create({
      data: {
        ...body,
        recordDate: body.recordDate ? new Date(body.recordDate) : new Date(),
        createdById: admin.id,
      },
    });
    return ok({ record }, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await requireAdmin();
    const data = await req.json();
    const id = Number(data.id);
    if (!id) return fail("Id requerido", 400);
    const body = medicalRecordSchema.parse(data);
    const record = await prisma.medicalRecord.update({
      where: { id },
      data: {
        ...body,
        recordDate: body.recordDate ? new Date(body.recordDate) : undefined,
        createdById: admin.id,
      },
    });
    return ok({ record });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    await requireAdmin();
    const { id } = await req.json();
    await prisma.medicalRecord.delete({ where: { id: Number(id) } });
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
