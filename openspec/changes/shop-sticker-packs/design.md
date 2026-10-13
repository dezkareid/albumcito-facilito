## Context

E1 of the shopping-cart initiative. The API keeps everything in memory: albums are a hardcoded `ALBUMS` array in `src/albums/albums.service.ts` (3 albums, `Sticker { id, albumId, number, name }`, no price anywhere). Modules follow a feature-module pattern (`AlbumsModule` exports `AlbumsService`; `StickersModule` reuses it). Public read endpoints have no guard; mutations use `JwtAuthGuard`.

The app fetches public data from Server Components through `lib/*.ts` modules (`API_URL = process.env.API_URL ?? 'http://localhost:3001'`, `next: { revalidate: 60 }`). Shared presentational components live in `app/_components/`. The nav is in `app/layout.tsx`.

This epic is implemented in two child Orca worktrees: section 1 (Backend) and section 2 (Frontend) of `tasks.md`. The API contract below is what lets them run independently.

## Goals / Non-Goals

**Goals:**
- Introduce `Pack` as the purchasable product with a price, reusable by E2 (cart) and E3 (orders).
- Public, read-only catalog endpoints.
- A `/shop` page and a packs section on album detail pages.

**Non-Goals:**
- Cart, "Add to cart" buttons, checkout, orders, opening packs (E2–E4).
- Stock/inventory, discounts, multiple currencies, admin CRUD for packs.
- Pack artwork/images.

## Decisions

### D1 — Separate `PacksModule`, not part of `AlbumsModule`
`src/packs/{packs.module,packs.service,packs.controller}.ts`. `PacksModule` imports `AlbumsModule` and uses `AlbumsService.findOne` to validate albums and resolve album names. `GET /albums/:id/packs` is served by `PacksController` with `@Controller()` routes (`packs`, `packs/:id`, `albums/:id/packs`) so `AlbumsModule` doesn't depend on packs (avoids a circular import later, when cart/orders depend on packs). `PacksModule` exports `PacksService` for E2/E3.
*Alternative*: add packs to `AlbumsService` — rejected, mixes catalog and commerce concerns.

### D2 — Money as integer cents + currency code
`priceCents: number` (integer) and `currency: 'MXN'`. Avoids float rounding when E2 computes totals. Formatting is a frontend concern (`Intl.NumberFormat('es-MX', { style: 'currency', currency })`).

### D3 — Seed data (in memory)
Pack ids are `albumId * 10 + n`:

| id | albumId | name | stickersPerPack | priceCents |
|----|---------|------|-----------------|-----------|
| 11 | 1 | Basic Pack | 5 | 2500 |
| 12 | 1 | Premium Pack | 10 | 4500 |
| 21 | 2 | Basic Pack | 5 | 2500 |
| 31 | 3 | Basic Pack | 5 | 2500 |

### D4 — API contract
Response item (`PackDto`) is enriched with the album name so the shop renders without extra calls:

```json
{ "id": 11, "albumId": 1, "albumName": "Cody's Adventure 2024", "name": "Basic Pack",
  "stickersPerPack": 5, "priceCents": 2500, "currency": "MXN" }
```

- `GET /packs` → `200 PackDto[]` ordered by `albumId`, then `id`.
- `GET /packs/:id` → `200 PackDto` | `404` (`ParseIntPipe` → `400` for non-numeric ids).
- `GET /albums/:id/packs` → `200 PackDto[]` (may be empty) | `404` when the album doesn't exist.

### D5 — Frontend
- `lib/packs.ts`: `Pack` type (mirrors `PackDto`; types are duplicated per existing convention), `getPacks()`, `getAlbumPacks(albumId)`, `formatPrice(cents, currency)`. Fetch with `revalidate: 60`, throw on `!res.ok`.
- `app/_components/PackCard.tsx`: presentational Server Component (name, album name, "N stickers", formatted price). E2 will add an "Add to cart" client island inside it.
- `app/shop/page.tsx`: Server Component, grid of `PackCard`s; empty state "No packs available yet"; `app/shop/error.tsx` for API failures.
- `app/albums/[id]/page.tsx`: a "Packs" section using `getAlbumPacks`, hidden when the album has no packs, with a link to `/shop`.
- Nav: "Shop" link after "About" in `app/layout.tsx`.
- Styling follows existing cards (`rounded-2xl border border-gray-100 shadow-sm`, indigo accents).

## Risks / Trade-offs

- [In-memory catalog resets and is hardcoded] → acceptable for the course/demo; `PacksService` is the single seam to swap for persistence.
- [Duplicated `Pack` type in app and API can drift] → BDD on both sides asserts the same field names from D4.
- [Frontend worktree may start before backend merges] → it codes against the D4 contract and mocks `fetch` in tests; end-to-end check happens after both merge into the epic branch.
