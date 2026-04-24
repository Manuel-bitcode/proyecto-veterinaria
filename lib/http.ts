import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function handleError(error: unknown) {
  if (error instanceof ZodError) return fail(error.errors[0]?.message ?? "Datos inválidos", 422);
  if (error instanceof Error && error.message === "UNAUTHORIZED") return fail("No autenticado", 401);
  if (error instanceof Error && error.message === "FORBIDDEN") return fail("No autorizado", 403);
  console.error(error);
  return fail("Error interno del servidor", 500);
}
