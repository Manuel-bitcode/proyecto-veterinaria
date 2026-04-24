export async function fetchNotifications() {
  const res = await fetch("/api/notifications");
  if (!res.ok) throw new Error("Unauthorized");
  return (await res.json()).notifications;
}

export async function markNotificationAsRead(id: number) {
  const res = await fetch("/api/notifications", {
    method: "PATCH",
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al marcar como leída");
  }

  return res;
}