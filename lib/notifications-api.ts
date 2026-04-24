export async function fetchNotifications() {
  const res = await fetch("/api/notifications", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error ?? "Error al consultar notificaciones");
  }

  const data = await res.json();
  return data.notifications ?? [];
}

export async function markNotificationAsRead(id: number) {
  const res = await fetch("/api/notifications", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error ?? "Error al marcar como leída");
  }

  return res.json();
}