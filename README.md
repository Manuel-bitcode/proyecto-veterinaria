# SIGSC - Sistema Integral de Gestión de Servicios Caninos

Proyecto monolítico en **Next.js + TypeScript** con frontend y backend en la misma aplicación, autenticación propia, PostgreSQL y Prisma ORM.

## Funcionalidades incluidas

- Registro de usuarios propietarios de mascotas.
- Inicio de sesión con correo y contraseña validados contra PostgreSQL.
- Roles: `USER` y `ADMIN`.
- Registro, edición y eliminación de mascotas.
- Catálogo fijo de 15 servicios veterinarios.
- Agendamiento y cancelación de citas.
- Notificaciones automáticas al agendar citas.
- Consulta de historial clínico por usuarios.
- CRUD completo de historial clínico para administradores.
- CRUD de usuarios para administradores.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- bcryptjs
- JWT con cookie HTTP-only usando jose

## Requisitos

- Node.js 20 o superior
- Docker Desktop o PostgreSQL local

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo `.env` desde `.env.example`:

```bash
cp .env.example .env
```

3. Levantar PostgreSQL con Docker:

```bash
docker compose up -d
```

4. Ejecutar migraciones:

```bash
npx prisma migrate dev --name init
```

5. Cargar catálogo de servicios y usuario administrador:

```bash
npm run db:seed
```

6. Ejecutar aplicación:

```bash
npm run dev
```

Abrir: http://localhost:3000

## Usuario administrador de prueba

ADMIN / Veterinarios:
admin@sigsc.com / Admin123*
laura.vet@sigsc.com / Admin123*
carlos.vet@sigsc.com / Admin123*

Usuarios:
ana@sigsc.com / User123*
juan@sigsc.com / User123*
maria@sigsc.com / User123*
pedro@sigsc.com / User123*

## Arquitectura

El proyecto usa arquitectura monolítica modular:

- `app/`: páginas y rutas API del sistema.
- `app/api/`: backend mediante Route Handlers.
- `components/`: componentes reutilizables de UI.
- `lib/`: Prisma, autenticación, validadores y respuestas HTTP.
- `prisma/`: modelo relacional y seed inicial.

## Módulos principales

- Autenticación
- Usuarios
- Mascotas
- Servicios
- Citas
- Historial clínico
- Notificaciones

## Seguridad básica implementada

- Contraseñas hasheadas con bcrypt.
- Sesión mediante JWT en cookie HTTP-only.
- Validación de entradas con Zod.
- Control de acceso por rol para endpoints administrativos.
