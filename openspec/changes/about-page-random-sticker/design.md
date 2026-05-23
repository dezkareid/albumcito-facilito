## Context

Albumcito is a Turborepo monorepo with a Next.js 16 frontend (App Router, Tailwind CSS v4) and a NestJS v11 REST API. The frontend runs on port 3000 and communicates with the API on port 3001. Currently there is no `/about` route and no sticker discovery mechanic beyond browsing the album.

## Goals / Non-Goals

**Goals:**
- Add a `/about` page with app description, branding, and a random sticker CTA.
- Add a `GET /stickers/random` API endpoint that returns one random sticker from the catalog.
- Wire the button to the API and render the returned sticker inline on the page.

**Non-Goals:**
- Persistent state for which random sticker was seen (no user-specific history).
- Adding the random sticker to the user's collection automatically.
- Replacing the existing album/collection browsing UX.

## Decisions

### 1. Random selection at the API layer

**Decision**: The `GET /stickers/random` endpoint performs random selection server-side.

**Rationale**: Sending all stickers to the client and picking randomly leaks catalog size and wastes bandwidth. Server-side selection is O(1) to the client regardless of catalog size.

**Alternative considered**: Client-side random from a cached list — rejected because it requires fetching the full catalog on the About page.

**Implementation**: In the NestJS service, fetch all sticker IDs, pick one at random with `Math.random()`, then return the full sticker record. If the catalog is small (< 500 items) this is acceptable; no SQL `ORDER BY RAND()` is needed at this scale.

### 2. About page as a Server Component with a Client island

**Decision**: `app/about/page.tsx` is a React Server Component. The random sticker button and display area are extracted into a `RandomStickerButton` Client Component (`'use client'`).

**Rationale**: Static content (description, branding) benefits from RSC (no JS hydration). Only the interactive button and its result state require client-side JavaScript.

**Alternative considered**: Full client page — rejected; unnecessary JS for static text.

### 3. Navigation link

**Decision**: Add an "About" link to the existing site header/navbar component. If no global nav exists yet, add a simple `<nav>` to the root layout.

**Rationale**: Users need a discoverable entry point to the page.

## Risks / Trade-offs

- [Risk] Catalog is empty or has no stickers → Mitigation: API returns 404 with a clear message; frontend shows a friendly fallback state.
- [Risk] `Math.random()` distribution is not cryptographically random → Acceptable: this is a fun discovery feature, not security-sensitive.
- [Risk] Navigation change may affect existing layout tests → Mitigation: only add a link element; no structural layout changes.

## Migration Plan

No data migrations required. Deploy order: backend first (new endpoint), then frontend (new page + button). Rollback: remove the route from the NestJS controller; no DB changes needed.
