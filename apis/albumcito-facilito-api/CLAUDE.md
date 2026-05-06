# Albumcito Facilito — Backend API

The REST API for the Albumcito Facilito sticker album experience.

## Stack

| Concern | Tool |
|---------|------|
| Runtime | Node.js ≥ 18 |
| Framework | NestJS v11 |
| Language | TypeScript 5.x |
| Testing | Jest + `@nestjs/testing` + Supertest |
| Linting | ESLint v9 (flat config) + `typescript-eslint` |
| Formatting | Prettier |
| Build | `@nestjs/cli` (`nest build`) |

## Project Structure

```
src/
  main.ts              # Bootstrap — creates the NestJS app and starts listening
  app.module.ts        # Root module
  app.controller.ts    # Root controller
  app.service.ts       # Root service
  app.controller.spec.ts  # Unit test for root controller
test/
  app.e2e-spec.ts      # End-to-end tests (Supertest against full app)
  jest-e2e.json        # Jest config for e2e suite
eslint.config.mjs      # ESLint flat config (ESLint v9 + typescript-eslint)
nest-cli.json          # NestJS CLI config (sourceRoot, compilerOptions)
tsconfig.json          # TypeScript config (emitDecoratorMetadata required by NestJS)
tsconfig.build.json    # Extends tsconfig.json, excludes test files from build output
```

## Development

```bash
# Install dependencies (from repo root)
pnpm install

# Start in watch mode (hot reload)
pnpm --filter @albumcito-facilito/api dev

# Start once (no watch)
pnpm --filter @albumcito-facilito/api start

# Build for production
pnpm --filter @albumcito-facilito/api build

# Run unit tests
pnpm --filter @albumcito-facilito/api test

# Run unit tests in watch mode
pnpm --filter @albumcito-facilito/api test:watch

# Run e2e tests
pnpm --filter @albumcito-facilito/api test:e2e

# Lint
pnpm --filter @albumcito-facilito/api lint

# Format
pnpm --filter @albumcito-facilito/api format
```

## Key Configuration

- **Port**: `process.env.PORT` or `3001`
- **Decorators**: `emitDecoratorMetadata` and `experimentalDecorators` are enabled in `tsconfig.json` — required for NestJS DI and decorators to work
- **Module format**: CommonJS (`"module": "commonjs"` in tsconfig) — required by `@nestjs/cli`

## Adding Features

NestJS organizes code into modules. To add a new resource (e.g., `stickers`):

```bash
# From the api workspace directory
npx nest generate module stickers
npx nest generate controller stickers
npx nest generate service stickers
```

This creates `src/stickers/` with the module, controller, and service wired together.

## API Endpoints

> Document routes here as they are built, e.g.:
> - `GET /stickers` — return full catalog
> - `GET /users/:id/collection` — return user's owned stickers
> - `PUT /users/:id/collection/:stickerId` — mark a sticker as owned or missing

## Domain Concepts

See the root `CLAUDE.md` for shared definitions (Album, Sticker, Collection).
