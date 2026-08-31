# RiwiMediCare Plus - Supply Request API

## Coder Information

* **Coder Name:** Kevin Villalobos
* **Clan:** Magdalena

## Technologies Used

Node.js 18+, Express, TypeScript, PostgreSQL, Sequelize ORM, JWT, Multer, Swagger, Jest.

## Architecture

```text
Routes → Middlewares → Controllers → Services → Repositories → Sequelize → PostgreSQL
```

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and change the values for your environment:

```text
PORT=3000

DB_NAME=riwimedicare_plus

DB_USER=postgres

DB_PASSWORD=postgres

DB_HOST=localhost

DB_PORT=5432

JWT_SECRET=use_a_long_and_secure_secret_key

JWT_EXPIRES_IN=1d
```

## Run the Project

```bash
npm run dev
```

This connects to PostgreSQL and creates or updates the database tables based on the models.

## Seeders - JSON Data Upload

This project loads the initial data using a **protected endpoint**. The endpoint receives a `.json` file using `multer`.

1. Log in as an ADMIN using `POST /api/auth/login` and copy the token.

2. Using Postman or Swagger UI, make a request:

   * `POST /api/seed/upload`
   * Header: `Authorization: Bearer <token>`
   * Body: `form-data`
   * Field: `file`
   * File type: `.json`

3. You can use this example file:

```text
src/seeders/sample-data/seed-data.json
```

The endpoint is idempotent and uses `findOrCreate`. You can upload the same file more than once without creating duplicate data.

## Swagger Documentation

Start the server and open:

```text
http://localhost:3000/api-docs
```

## Unit Tests (Jest)

Run:

```bash
npm test -- --coverage
```

The project includes 2 tests for important features:

* Duplicate NIT validation when creating a clinic.
* Insufficient inventory validation and stock reduction when creating a supply request.

## Docker Deployment (Optional)

```bash
docker-compose up --build
```

This starts two containers:

* API on port `3000`
* PostgreSQL on port `5432`

The project also uses a persistent volume and an internal network between the containers.

## Suggested Test Flow

1. `POST /api/auth/register` → Create an ADMIN user.

2. `POST /api/auth/login` → Get the JWT token.

3. `POST /api/seed/upload` → Upload example clinics, warehouses, and medications.

4. `POST /api/requests` → Create a supply request and validate the inventory.

5. `GET /api/requests/active` → Get active supply requests.

6. `GET /api/requests/clinic/1/history` → Get the history of a clinic.

7. `PUT /api/requests/{id}/status` → Change the request status:

   * `PENDIENTE`
   * `APROBADA`
   * `RECHAZADA`
   * `ENTREGADA`

## Repository URL

[Add your public GitHub repository URL here]

## Branch Strategy (GitFlow)

```text
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

Commits use Conventional Commits:

```text
feat:
fix:
docs:
refactor:
```

