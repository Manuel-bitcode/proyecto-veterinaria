import { prisma } from "@/lib/prisma";
import { handleError, ok } from "@/lib/http";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    return ok({ services });
  } catch (error) {
    return handleError(error);
  }
}
