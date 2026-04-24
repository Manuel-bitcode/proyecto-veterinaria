import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { fail, handleError, ok } from "@/lib/http";
import { registerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = registerSchema.parse(await req.json());
    const exists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (exists) return fail("El correo ya está registrado", 409);
    const passwordHash = await bcrypt.hash(body.password, 12);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        passwordHash,
        phone: body.phone,
      },
      select: { id: true, name: true, email: true, role: true },
    });
    await createSession({
      userId: user.id,
      role: user.role,
      email: user.email,
    });
    return ok({ user }, 201);
  } catch (error) {
    return handleError(error);
  }
}
