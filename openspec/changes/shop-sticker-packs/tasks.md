## 1. Backend — Sticker packs catalog (worktree `e1-t1-packs-api`, agent `backend-architect`)

- [ ] 1.1 Create `apis/albumcito-facilito-api/src/packs/packs.service.ts` with the `Pack`/`PackDto` types and the in-memory seed from design D3; implement `findAll()` (ordered by `albumId`, `id`), `findOne(id)` (`NotFoundException` when missing) and `findByAlbum(albumId)` (validates the album via `AlbumsService.findOne`), all returning `PackDto` with `albumName`
- [ ] 1.2 Create `src/packs/packs.controller.ts` with public routes `GET /packs`, `GET /packs/:id` and `GET /albums/:id/packs` using `ParseIntPipe` (design D1/D4)
- [ ] 1.3 Create `src/packs/packs.module.ts` (imports `AlbumsModule`, exports `PacksService`) and register it in `src/app.module.ts`
- [ ] 1.4 Add Jest spec `src/packs/packs.service.spec.ts`: ordering, `findOne` 404, `findByAlbum` filter + unknown album 404, every album has 1–2 packs, `priceCents` is a positive integer
- [ ] 1.5 Add Cucumber `features/packs.feature` + `features/step-definitions/packs.steps.ts` covering every scenario in `specs/sticker-packs/spec.md` (reuse `shared.ts` context)
- [ ] 1.6 Document the new endpoints in `apis/albumcito-facilito-api/CLAUDE.md`; run `test`, `test:bdd`, `test:e2e` and `lint` for `@albumcito-facilito/api` green

## 2. Frontend — Shop page (worktree `e1-t2-shop-ui`, agent `frontend-architect`)

- [ ] 2.1 Create `apps/albumcito-facilito-app/lib/packs.ts` with the `Pack` type (contract D4), `getPacks()`, `getAlbumPacks(albumId)` (`revalidate: 60`, throw on `!res.ok`) and `formatPrice(cents, currency)` using `Intl.NumberFormat('es-MX', …)`
- [ ] 2.2 Create `app/_components/PackCard.tsx` showing pack name, album name, "N stickers" and formatted price, styled like existing cards
- [ ] 2.3 Create `app/shop/page.tsx` (Server Component grid of `PackCard`s, empty state "No packs available yet") and `app/shop/error.tsx` (friendly message + retry)
- [ ] 2.4 Add the "Shop" link to the nav in `app/layout.tsx`
- [ ] 2.5 Add the "Packs" section to `app/albums/[id]/page.tsx` (hidden when empty, link to `/shop`)
- [ ] 2.6 Add `features/shop.feature` + `src/__tests__/shop.feature.spec.tsx` (vitest-cucumber, mocked `fetch`) covering `specs/shop-page/spec.md`, plus a plain Vitest spec for `formatPrice`
- [ ] 2.7 Run `test`, `lint` and `build` for `@albumcito-facilito/app` green

## 3. Verification (epic worktree, after merging sections 1 and 2)

- [ ] 3.1 `curl localhost:3001/packs`, `/packs/11`, `/packs/999` (404) and `/albums/1/packs` return the expected payloads
- [ ] 3.2 With `pnpm dev`, check `/shop`, the "Shop" nav link and the "Packs" section on `/albums/1` in the browser (Playwright MCP)
- [ ] 3.3 Mark E1 as done in `sdd-docs/carrito-de-compras/epics.md`
