import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { ok, unauthorized, handleError } from "@/lib/http";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return unauthorized();

    console.log("Session userId:", session.userId);

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

    console.log("Notifications found:", notifications.length);

    return ok({ notifications });
  } catch (error) {
    console.error("Error in notifications API:", error);
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return unauthorized();

    const { id } = await req.json();
    const notificationId = Number(id);

    await prisma.notification.update({
      where: { id: notificationId, userId: session.userId },
      data: { readAt: new Date() },
    });

    return ok({ success: true });
  } catch (error) {
    return handleError(error);
  }
}