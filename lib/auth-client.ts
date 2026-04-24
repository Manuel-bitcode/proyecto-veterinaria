export async function login(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al iniciar sesión");
  }

  return res;
}

export async function register(data: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error ?? "Error al registrar");
  }

  return res;
}