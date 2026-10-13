## Why

Collectors can only add stickers to their collection by hand; there is no way to *acquire* stickers. This change is the first epic (E1) of the shopping-cart initiative (`sdd-docs/carrito-de-compras/epics.md`): it introduces sticker packs as purchasable products with a price, and a shop where users can browse them. The cart (E2), simulated checkout (E3) and pack opening (E4) build on this catalog.

## What Changes

- Add a sticker pack catalog to the NestJS API: `Pack { id, albumId, name, stickersPerPack, priceCents, currency: 'MXN' }`, stored in memory, 1–2 packs per album.
- Add public endpoints `GET /packs`, `GET /packs/:id` (404 when unknown) and `GET /albums/:id/packs` (404 when the album does not exist).
- Add a public `/shop` page in the Next.js app that lists all packs as `PackCard`s (pack name, album name, stickers per pack, price formatted as MXN).
- Add a "Shop" link to the site-wide navigation.
- Add a "Packs" section to the album detail page `/albums/[id]` showing that album's packs.
- No cart, checkout or purchase behavior yet (out of scope, covered by E2–E4).

## Capabilities

### New Capabilities

- `sticker-packs`: API catalog of purchasable sticker packs (data model, pricing, read endpoints).
- `shop-page`: Frontend shop at `/shop`, the "Shop" nav link and the packs section on the album detail page.

### Modified Capabilities

<!-- No existing spec-level requirements are changing. -->

## Impact

- **Backend**: new `src/packs/` feature module (service, controller, module) registered in `src/app.module.ts`; depends on `AlbumsService` to validate albums and resolve album names. New Cucumber feature `features/packs.feature` + Jest spec for `PacksService`.
- **Frontend**: new `lib/packs.ts`, `app/shop/page.tsx`, `app/_components/PackCard.tsx`; edits to `app/layout.tsx` (nav) and `app/albums/[id]/page.tsx`. New `features/shop.feature` + vitest-cucumber spec.
- **Dependencies**: none new.
