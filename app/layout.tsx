import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIGSC | Gestión de Servicios Caninos",
  description: "Sistema Integral de Gestión de Servicios Caninos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
