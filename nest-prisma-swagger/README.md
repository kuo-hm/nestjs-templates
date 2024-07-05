# NestJS Template with Prisma, Swagger, JWT Auth, Class Validation, and Repository Pattern

This template provides a robust starting point for building scalable and maintainable NestJS applications. It includes the following features:

## Features

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Prisma**: Next-generation ORM for Node.js and TypeScript.
- **Swagger**: API documentation and testing tool.
- **JWT Authentication**: Secure your endpoints with JSON Web Tokens.
- **Class Validation**: Validate incoming data using decorators.
- **Repository Pattern**: Abstraction layer between the domain and data mapping layers.

## Getting Started

```console
npm i
```

```console
npm migrate
```

```console
npm start
npm run dev
```

## Project Structure

The project follows a modular and feature-based structure:
```
project-root/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── common/
│   │   ├── decorators/
│   │   ├── enum/
│   │   ├── guards/
│   │   ├── helpers/
│   │   ├── pipes/
│   │   └── constants.ts
│   ├── models/
│   │   └── module/
│   │       ├── controller/
│   │       ├── entities/
│   │       ├── errors/
│   │       ├── interface/
│   │       ├── repository/
│   │       ├── service/
│   │       └── module.module.ts
│   ├── prisma/
│   │   ├── dto/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
```
Key components:

- `prisma/`: Contains Prisma schema and migrations.
- `src/common/`: Houses global functions, helpers, decorators, and constants.
- `src/models/`: Feature-specific modules (e.g., auth, user).
  - Each module has its own controllers, services, entities, and repositories.
- `src/prisma/`: Prisma-related configurations and services.
- `app.module.ts`: The root application module.
- `main.ts`: The entry point of the application.

This structure promotes modularity, making it easier to maintain and scale the application as it grows.
## Configuration

[Details on how to configure the various components]

