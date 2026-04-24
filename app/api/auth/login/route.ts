import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { fail, handleError, ok } from "@/lib/http";
import { loginSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const body = loginSchema.parse(await req.json());
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) return fail("Credenciales inválidas", 401);
    const valid = await bcrypt.compare(body.password, user.passwordHash);
    if (!valid) return fail("Credenciales inválidas", 401);
    await createSession({
      userId: user.id,
      role: user.role,
      email: user.email,
    });
    return ok({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
