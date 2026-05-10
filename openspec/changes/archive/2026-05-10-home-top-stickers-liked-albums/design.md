## Context

The app currently stores albums and stickers as static in-memory arrays in the NestJS API (`albums.service.ts`). There is no database or persistence layer yet. The frontend home page (`app/page.tsx`) is a minimal landing page — authenticated users are routed to their dashboard. There are existing `AlbumCard` and `StickerCard` components available for reuse.

Likes must be tracked server-side to aggregate across users. Since there is no database yet, likes will be stored in-memory (same pattern as albums/stickers) with a clear path to swap in a persistence layer later.

## Goals / Non-Goals

**Goals:**
- Surface a "Top Stickers" ranked list and a "Most Liked Albums" ranked list on the home page
- Allow authenticated users to like stickers and albums
- Expose aggregation endpoints the frontend can call
- Reuse existing `AlbumCard` and `StickerCard` components where possible

**Non-Goals:**
- Persistent storage (in-memory is acceptable for this iteration)
- Unlike / toggle functionality (like is one-time per this change)
- Real-time updates (polling or WebSocket)
- Pagination or infinite scroll for the home sections
- Recommendation algorithms (ranking by raw count only)

## Decisions

### 1. In-memory like store (over adding a database)
The existing API has no DB. Introducing one now would be a large orthogonal change. An in-memory `Map<userId, Set<entityId>>` per entity type provides the needed semantics (no duplicate likes per user) while matching the existing pattern. **Trade-off**: likes reset on server restart, but that is acceptable until a DB is introduced.

### 2. Like endpoints under existing resource routes
`POST /albums/:id/like` and `POST /stickers/:id/like` — REST-idiomatic, avoids a separate `likes` module. The aggregation endpoints `GET /albums/top` and `GET /stickers/top` live in the same controllers.

**Alternative considered**: a dedicated `/likes` module. Rejected because the domain is thin and would add unnecessary indirection at this scale.

### 3. Top N = 5 items per section, hardcoded
Keeps the home page scannable without pagination complexity. Can be made configurable via query param later.

### 4. Frontend fetches top data as Server Components (Next.js RSC)
The home page is a public-facing page — top stickers/albums can be fetched at request time as RSC data fetches (no client-side JS needed, good for SEO). Like actions require a client interaction → small `LikeButton` Client Component.

### 5. Like requires authentication; viewing top lists does not
Top stickers/albums are public (good for engagement from unauthenticated visitors). Liking requires a JWT (existing auth guard pattern).

## Risks / Trade-offs

- **In-memory likes lost on restart** → Acceptable for MVP; document in API README that persistence is a follow-up
- **Race conditions on concurrent likes** → In-memory JS is single-threaded; not a concern until the service scales horizontally
- **`GET /albums/top` route conflict with `GET /albums/:id`** → NestJS resolves literal routes before parameterized ones, so `/albums/top` is safe. Same for `/stickers/top`

## Migration Plan

1. Deploy API changes (new like endpoints + top endpoints) — fully additive, no breaking changes
2. Deploy frontend changes (home page sections + LikeButton)
3. No rollback complexity — removing the sections is a one-line revert

## Open Questions

- Should the home page sections be visible only to authenticated users, or to everyone? (Current assumption: visible to everyone, like requires auth)
- Should we cap the maximum like count display (e.g., "999+")? (Deferred — low traffic for now)
