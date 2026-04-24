"use client";
import { useState } from "react";
import { login, register } from "@/lib/auth-client";

export function useAuth() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(email: string, password: string) {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    setLoading(true);
    setError("");
    try {
      await register(data);
      location.href = "/login";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, handleRegister, error, loading };
}