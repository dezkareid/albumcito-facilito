# Albumcito Facilito — Backend API

> **For all backend development tasks — scaffolding modules, controllers, services, DTOs, guards, interceptors, pipes, or tests — use the `backend-architect` agent.**

The REST API for the Albumcito Facilito sticker album experience. Built with **NestJS v11**, **TypeScript**, **Jest**, and **ESLint + Prettier**. Runs on Node.js ≥ 18, **port 3001**.

## Quick Reference

```bash
pnpm --filter @albumcito-facilito/api dev        # watch mode
pnpm --filter @albumcito-facilito/api test       # unit tests
pnpm --filter @albumcito-facilito/api test:e2e   # e2e tests
pnpm --filter @albumcito-facilito/api lint
pnpm --filter @albumcito-facilito/api build
```

## API Endpoints

> Document routes here as they are built:
> - `GET /stickers` — return full catalog
> - `GET /users/:id/collection` — return user's owned stickers
> - `PUT /users/:id/collection/:stickerId` — mark a sticker as owned or missing
>
> Sticker packs (public, no auth; `PackDto` = `{ id, albumId, albumName, name, stickersPerPack, priceCents, currency }`, `currency` is `"MXN"`, price in integer cents):
> - `GET /packs` — all packs ordered by `albumId`, then `id`
> - `GET /packs/:id` — one pack; `404` if unknown, `400` if id is not numeric
> - `GET /albums/:id/packs` — packs of an album; `404` if the album does not exist

## Domain Concepts

See the root `CLAUDE.md` for shared definitions (Album, Sticker, Collection).
