import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { fail, handleError, ok } from "@/lib/http";
import { z } from "zod";

const userAdminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  role: z.enum(["USER", "ADMIN"]),
  password: z.string().min(8).optional().or(z.literal("")),
});

export async function GET() {
  try {
    await requireAdmin();
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return ok({ users });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = userAdminSchema.parse(await req.json());
    const exists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (exists) return fail("El correo ya existe", 409);
    const passwordHash = await bcrypt.hash(body.password || "Usuario123*", 12);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone ?? undefined,
        role: body.role,
        passwordHash,
      },
      select: { id: true, name: true, email: true, role: true },
    });
    return ok({ user }, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: Request) {
  try {
    await requireAdmin();
    const data = await req.json();
    const id = Number(data.id);
    if (!id) return fail("Id requerido", 400);
    const body = userAdminSchema.parse(data);
    const updateData: {
      name: string;
      email: string;
      phone: string | null;
      role: "USER" | "ADMIN";
      passwordHash?: string;
    } = {
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      role: body.role,
    };
    if (body.password)
      updateData.passwordHash = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
    return ok({ user });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: Request) {
  try {
    const admin = await requireAdmin();
    const { id } = await req.json();
    const userId = Number(id);
    if (userId === admin.id)
      return fail("No puedes eliminar tu propio usuario", 400);
    await prisma.user.delete({ where: { id: userId } });
    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}
