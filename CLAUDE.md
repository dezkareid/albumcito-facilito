# Albumcito Facilito

A digital sticker album experience for collecting Cody stickers. Users can track which stickers they have, which ones they're missing, and complete their album.

## Project Structure

This is a **Turborepo monorepo** managed with **pnpm workspaces**.

```
apps/
  albumcito-facilito-app/   # Frontend application (@albumcito-facilito/app)
apis/
  albumcito-facilito-api/   # Backend REST API (@albumcito-facilito/api)
```

## Workspaces

Defined in `pnpm-workspace.yaml`:

| Workspace | Path glob | Purpose |
|-----------|-----------|---------|
| `apps`    | `apps/*`  | User-facing frontend applications |
| `apis`    | `apis/*`  | Backend API services |

### Tooling

- **Package manager**: pnpm 10.33.3
- **Build system**: Turborepo 2.9.9 (`turbo.json` at root)
- **Turbo tasks**: `build`, `dev`, `lint`, `test`

### Common commands

```bash
pnpm dev          # run dev in all workspaces (via turbo)
pnpm build        # build all workspaces in dependency order
pnpm lint         # lint all workspaces
pnpm test         # test all workspaces

# Target a single workspace
pnpm --filter @albumcito-facilito/app dev
pnpm --filter @albumcito-facilito/api dev

# Add a dependency to a specific workspace
pnpm --filter @albumcito-facilito/app add <package>
pnpm --filter @albumcito-facilito/api add <package>

# Add a dev dependency to the root
pnpm add -D -w <package>
```

## Parts

### Frontend — `apps/albumcito-facilito-app/`
The user-facing application where collectors view their album, mark stickers as collected, and track their progress. Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, **Vitest**, and **ESLint**. Runs on **port 3000**. See `apps/albumcito-facilito-app/CLAUDE.md` for details.

### Backend — `apis/albumcito-facilito-api/`
The REST API that manages sticker data, user collections, and album state. Built with **NestJS v11**, **TypeScript**, **Jest**, and **ESLint + Prettier**. Runs on Node.js ≥ 18, **port 3001** (`process.env.PORT` or `3001`). See `apis/albumcito-facilito-api/CLAUDE.md` for details.

## Domain Concepts

- **Album**: the full set of Cody stickers to collect
- **Sticker**: an individual collectible item with a number and artwork
- **Collection**: a user's set of owned stickers
- **Missing stickers**: stickers not yet in the user's collection

## Skills

- **`bdd-gherkin`** — Write and maintain BDD/Gherkin feature files and step definitions for both the Next.js frontend and the NestJS API. Use whenever adding acceptance tests, Cucumber scenarios, or `Given/When/Then` steps across either workspace.
