# Arquitectura SIGSC

SIGSC se diseñó como un monolito modular con Next.js. La aplicación contiene frontend, backend y acceso a datos dentro del mismo proyecto, pero separados por responsabilidades.

## Capas

1. Presentación: páginas en `app/` y componentes en `components/`.
2. API: rutas en `app/api/`, responsables de validar solicitudes, aplicar reglas de negocio y responder JSON.
3. Dominio/Datos: modelo Prisma en `prisma/schema.prisma` y cliente centralizado en `lib/prisma.ts`.
4. Seguridad: helpers de autenticación en `lib/auth.ts`, JWT HTTP-only y control de roles.

## Reglas de acceso

- Usuarios autenticados pueden gestionar sus mascotas, consultar servicios, agendar citas y consultar historial de sus mascotas.
- Administradores pueden gestionar usuarios y realizar CRUD completo del historial clínico.

## Relación con requerimientos

- RF01-RF02: autenticación en `/api/auth/*`.
- RF03 y RF07: módulo de mascotas en `/api/pets`.
- RF04: catálogo de servicios en `/api/services`.
- RF05: agendamiento en `/api/appointments`.
- RF06: historial clínico en `/api/medical-records`.
- RF08: notificaciones creadas al registrar citas.
- RF09: administración de usuarios en `/api/users`.
