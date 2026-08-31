# RiwiMediCare Plus - API de Solicitudes de Abastecimiento

## Datos del coder

- **Nombre del Coder:** Kevin [Apellido]
- **Clan:** [Nombre del clan]

## Tecnologías utilizadas

Node.js 18+, Express, TypeScript, PostgreSQL, Sequelize ORM, JWT, Multer, Swagger, Jest.

## Arquitectura

```
Routes → Middlewares → Controllers → Services → Repositories → Sequelize → PostgreSQL
```

## Instructivo de instalación

```bash
npm install
```

## Variables de entorno (ejemplo)

Copia `.env.example` a `.env` y ajusta según tu entorno:

```
PORT=3000

DB_NAME=riwimedicare_plus
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=una_clave_secreta_bien_larga_y_dificil_de_adivinar
JWT_EXPIRES_IN=1d
```

## Ejecución del proyecto

```bash
npm run dev
```

Esto conecta a PostgreSQL y crea/ajusta las tablas automáticamente según los modelos.

## Ejecución de los seeders (carga de datos JSON)

A diferencia de un seeder tradicional por script, este proyecto carga los
datos base mediante un **endpoint protegido** que recibe un archivo `.json`
usando `multer`.

1. Inicia sesión como ADMIN (`POST /api/auth/login`) y copia el token.
2. Con Postman (o Swagger UI), haz una petición:
   - `POST /api/seed/upload`
   - Header: `Authorization: Bearer <token>`
   - Body tipo `form-data`, campo `file` = archivo `.json` (tipo File)
   - Usa como ejemplo el archivo `src/seeders/sample-data/seed-data.json`
     incluido en este repo.
3. El endpoint es idempotente (usa `findOrCreate`): puedes subirlo varias
   veces sin duplicar información.

## Documentación Swagger

Con el servidor corriendo:

```
http://localhost:3000/api-docs
```

## Pruebas unitarias (Jest)

```bash
npm test -- --coverage
```

Incluye 2 pruebas sobre las funcionalidades críticas:
- Validación de NIT duplicado al crear una clínica.
- Validación de inventario insuficiente / descuento de stock al crear una solicitud.

## Despliegue con Docker (opcional)

```bash
docker-compose up --build
```

Esto levanta dos contenedores: la API (puerto 3000) y PostgreSQL (puerto 5432),
con volumen de persistencia y red interna entre ambos.

## Flujo de prueba sugerido

1. `POST /api/auth/register` → crea un usuario ADMIN.
2. `POST /api/auth/login` → obtén el token.
3. `POST /api/seed/upload` → carga clínicas, almacenes y medicamentos de ejemplo.
4. `POST /api/requests` → crea una solicitud de abastecimiento (valida stock).
5. `GET /api/requests/active` → consulta solicitudes activas.
6. `GET /api/requests/clinic/1/history` → historial de una clínica.
7. `PUT /api/requests/{id}/status` → cambia el estado (PENDIENTE, APROBADA, RECHAZADA, ENTREGADA).

## URL del repositorio

[Pega aquí la URL de tu repositorio público en GitHub]

## Estrategia de ramas (GitFlow)

```
main
 │
develop
 │
 ├── feature/auth
 ├── feature/clinics
 ├── feature/warehouses
 ├── feature/medications
 ├── feature/supply-requests
 └── feature/seed-endpoint
```

Commits siguiendo Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`).
