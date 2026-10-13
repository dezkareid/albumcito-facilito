# Carrito de compras — Épicas

Tienda de **sobres de stickers** para Albumcito Facilito: el usuario agrega sobres a un carrito (persistido en la API por usuario), hace un checkout simulado y abre los sobres para sumar stickers a su colección.

**Decisiones**
- Producto: sobres de stickers (N stickers aleatorios de un álbum).
- Pago: checkout simulado (sin pasarela real).
- Carrito: API NestJS por usuario (JWT, in-memory).
- Flujo: un change de OpenSpec por épica; cada tarea se ejecuta en un worktree hijo de Orca de `epic-carrito-de-compras`.

| # | Épica | Change OpenSpec | Estado |
|---|-------|-----------------|--------|
| E1 | Catálogo de sobres | `shop-sticker-packs` | En progreso |
| E2 | Carrito | `shopping-cart` | Pendiente |
| E3 | Checkout simulado y órdenes | `checkout-orders` | Pendiente |
| E4 | Abrir sobres y repetidas | `open-sticker-packs` | Pendiente |

## E1 — Catálogo de sobres (`shop-sticker-packs`)
- **API**: `PacksModule` con `Pack { id, albumId, name, stickersPerPack, priceCents, currency: 'MXN' }` (in-memory, 1–2 por álbum). `GET /packs`, `GET /packs/:id`, `GET /albums/:id/packs`.
- **App**: página `/shop` (Server Component) con `PackCard`, `lib/packs.ts`, link "Tienda" en el nav; sección "Sobres" en `/albums/[id]`.
- **Tareas**: T1 backend packs module + BDD · T2 frontend `/shop` + nav + BDD.

## E2 — Carrito (`shopping-cart`)
- **API**: `CartModule` (JWT, keyed por `req.user.sub`). `GET /cart` (items + totales calculados en server), `POST /cart/items {packId, quantity}`, `PATCH /cart/items/:packId {quantity}`, `DELETE /cart/items/:packId`, `DELETE /cart`. Valida pack existente y quantity 1–10.
- **App**: BFF `app/api/cart/*`, `lib/cart.ts`, botón "Agregar al carrito" en `PackCard`, página `/cart`, badge con conteo en el header. Sin login → `/login`.
- **Tareas**: T1 backend cart · T2 BFF + lib + add-to-cart · T3 página `/cart` + badge.

## E3 — Checkout simulado y órdenes (`checkout-orders`)
- **API**: `OrdersModule`. `POST /orders` crea la orden desde el carrito (400 si vacío), estado `paid` inmediato, vacía el carrito y emite `PurchaseCompletedEvent`. `GET /orders`, `GET /orders/:id` (solo dueño, 404 si no).
- **App**: `/checkout` (resumen + "Confirmar compra"), `/orders/[id]` confirmación, historial `/orders`.
- **Tareas**: T1 backend orders + evento · T2 frontend checkout + confirmación · T3 historial de órdenes.

## E4 — Abrir sobres y repetidas (`open-sticker-packs`)
- **API**: listener de `PurchaseCompletedEvent` crea `UnopenedPack`s. `GET /me/packs`, `POST /me/packs/:id/open` → stickers aleatorios del álbum (RNG inyectable). `CollectionEntry` gana `quantity` para repetidas; abrir sobre suma en vez de 409.
- **App**: "Mis sobres" en dashboard, pantalla de apertura (nuevos vs repetidos), contador de repetidas en `MyStickers`.
- **Tareas**: T1 backend unopened packs + open + quantity · T2 frontend mis sobres + apertura.

## Flujo por épica
1. `/opsx:propose <change>` en la rama épica → revisar → commit.
2. Un worktree hijo de Orca por grupo de tareas de `tasks.md`:
   `orca worktree create --name <eN-tM-slug> --parent-worktree active --base-branch dezkareid/epic-carrito-de-compras --agent claude --prompt "/opsx:apply <change> — sección M"`
3. Tests verdes → merge a la rama épica → `orca worktree rm`.
4. `/opsx:archive <change>`, actualizar `apis/albumcito-facilito-api/CLAUDE.md`, siguiente épica.
