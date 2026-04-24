import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ok, fail, handleError } from "@/lib/http";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) throw new Error("UNAUTHORIZED");

    const notifications = await prisma.notification.findMany({
      where: { userId: session.userId },
      orderBy: { sentAt: "desc" },
      include: {
        appointment: {
          include: {
            pet: true,
            service: true,
          },
        },
      },
    });

    return ok({ notifications });
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) throw new Error("UNAUTHORIZED");

    const { id } = await req.json();
    const notificationId = Number(id);

    if (!notificationId) {
      return fail("Id de notificación inválido", 400);
    }

    const notification = await prisma.notification.findFirst({
      where: {
        id: notificationId,
        userId: session.userId,
      },
    });

    if (!notification) {
      return fail("Notificación no encontrada", 404);
    }

    const updated = await prisma.notification.update({
      where: { id: notification.id },
      data: { readAt: new Date() },
    });

    return ok({ notification: updated });
  } catch (error) {
    return handleError(error);
  }
}