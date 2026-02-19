# Co-do Backend

A NestJS backend for Co-do, built with Prisma, PostgreSQL, and JWT-based authentication.

## Tech Stack

- **NestJS 11** – Node.js framework
- **Prisma** – Type-safe ORM with PostgreSQL
- **argon2** – Password hashing
- **JWT** – Token-based authentication
- **class-validator** – DTO validation

## Prerequisites

- Node.js 18+
- PostgreSQL (or a hosted Postgres, e.g. Supabase)

## Setup

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root with:

   ```env
   # Database – direct connection (used for Prisma migrations)
   DATABASE_URL="postgresql://user:password@host:5432/postgres"

   # Database – connection pooling (used at runtime)
   DATABASE_POOLING="postgresql://user:password@host:6543/postgres?pgbouncer=true"

   # JWT signing secret (use a strong, random value in production)
   JWT_SECRET="your-secret-key"

   # Optional – server port (default: 3000)
   PORT=3000
   ```

   | Variable           | Required | Description                                                                |
   | ------------------ | -------- | -------------------------------------------------------------------------- |
   | `DATABASE_URL`     | Yes      | Direct Postgres connection for migrations (`prisma migrate`)               |
   | `DATABASE_POOLING` | Yes      | Pooled connection for the app runtime (e.g. PgBouncer when using Supabase) |
   | `JWT_SECRET`       | Yes      | Secret used to sign and verify JWT access tokens                           |
   | `PORT`             | No       | HTTP port (default: `3000`)                                                |

3. **Run database migrations**

   ```bash
   npx prisma migrate deploy
   ```

4. **Start the server**

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`.

## Environment Variables Summary

| Variable           | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `DATABASE_URL`     | Prisma migrations (direct DB connection) |
| `DATABASE_POOLING` | App runtime (connection pooling)         |
| `JWT_SECRET`       | Signing secret for JWT access tokens     |
| `PORT`             | Server port (default: `3000`)            |

## Authentication

### Overview

Authentication is JWT-based. Users sign up or log in and receive an `accessToken`, which they must send as a Bearer token on protected endpoints.

### Endpoints

| Method | Endpoint       | Auth required | Description                                     |
| ------ | -------------- | ------------- | ----------------------------------------------- |
| `POST` | `/auth/signup` | No            | Register a new user and receive an access token |
| `POST` | `/auth/login`  | No            | Authenticate and receive an access token        |
| `GET`  | `/auth/me`     | Yes           | Return the current user info from the token     |

### Sign Up

**Request body:**

```json
{
  "userName": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "passwordConfirmation": "securePassword123",
  "phoneNumber": "+36123456789"
}
```

**Response:**

```json
{
  "id": "uuid",
  "email": "john@example.com",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login

**Request body:**

```json
{
  "email": "john@example.com",
  "passwordAttempt": "securePassword123"
}
```

**Response:** Same shape as sign up (id, email, accessToken).

### Protected Routes

To access protected routes (e.g. `GET /auth/me`), include the JWT in the `Authorization` header:

```
Authorization: Bearer <accessToken>
```

Example with `curl`:

```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" http://localhost:3000/auth/me
```

**Response:**

```json
{
  "userId": "uuid",
  "email": "john@example.com"
}
```

### Flow

1. **Sign up / Login** – The service validates credentials, hashes passwords with argon2 (signup), and issues a JWT with `sub` (user id) and `email`. Tokens expire after 1 hour.
2. **Protected routes** – The `AuthGuard` reads the Bearer token, verifies it with `JWT_SECRET`, and attaches `userId` and `email` to `request.user`. Invalid or missing tokens result in `401 Unauthorized`.

### Security Details

- Passwords are hashed with **argon2** before storage.
- JWT payload: `{ sub: userId, email }`.
- JWT expiry: **1 hour** (`signOptions.expiresIn` in `auth.module.ts`).

## Scripts

| Command              | Description            |
| -------------------- | ---------------------- |
| `npm run start`      | Start the server       |
| `npm run start:dev`  | Start in watch mode    |
| `npm run start:prod` | Start production build |
| `npm run build`      | Build for production   |
| `npm run lint`       | Run ESLint             |
| `npm run test`       | Run unit tests         |

## Project Structure

```
src/
├── auth/           # Auth controller, service, guards, DTOs
├── users/          # Users service and DTOs
├── database/       # Prisma database service
├── app.module.ts
└── main.ts
```
