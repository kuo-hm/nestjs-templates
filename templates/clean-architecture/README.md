# project_name

NestJS API project following Clean Architecture principles.

## Project Structure

This project follows a feature-based organization with clean architecture:

- `src/features/` - Feature modules (domain-driven)
- `src/core/` - Core/shared services
- `src/common/` - Common utilities

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

```bash
npm install
```

### Database Setup

```bash
npm run prisma:generate
npm run prisma:migrate
```

### Running the Application

```bash
# Development
npm run dev

# Production
npm run build
npm run start:prod
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Documentation

Once the application is running, visit:
- Swagger UI: http://localhost:3000/api

## Environment Variables

Copy `.env.example` to `.env` and configure your environment variables.

## License

MIT

