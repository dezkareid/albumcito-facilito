## 1. API — Like Store & Sticker Likes

- [x] 1.1 Add a `LikesStore` singleton (in-memory `Map<userId, Set<entityId>>` per entity type) to `albums.service.ts` or a new `likes.service.ts`
- [x] 1.2 Add `POST /stickers/:id/like` endpoint in a new `stickers.controller.ts` (or extend albums controller) — requires JWT auth guard, returns 201 with `likeCount`, 409 on duplicate, 404 on missing sticker
- [x] 1.3 Add `GET /stickers/top` endpoint returning top 5 stickers by like count (public, no auth required)
- [x] 1.4 Register new sticker endpoints in `albums.module.ts` (or create `stickers.module.ts`)

## 2. API — Album Likes

- [x] 2.1 Add `POST /albums/:id/like` endpoint in `albums.controller.ts` — requires JWT auth guard, returns 201 with `likeCount`, 409 on duplicate, 404 on missing album
- [x] 2.2 Add `GET /albums/top` endpoint returning top 5 albums by like count (public, no auth required) — place route before `/:id` to avoid conflict

## 3. API — Tests

- [x] 3.1 Write unit tests for like logic (first like increments count, duplicate returns 409, unknown id returns 404)
- [x] 3.2 Write unit tests for top stickers and top albums ordering (sorted desc by likeCount, tiebreak by id asc)

## 4. Frontend — API Client

- [x] 4.1 Add `fetchTopStickers(): Promise<StickerWithLikes[]>` to `lib/stickers.ts` (create file) calling `GET /stickers/top`
- [x] 4.2 Add `fetchTopAlbums(): Promise<AlbumWithLikes[]>` to `lib/albums.ts` calling `GET /albums/top`
- [x] 4.3 Add `likeSticker(stickerId: number)` and `likeAlbum(albumId: number)` client actions to respective lib files (include Authorization header from session)

## 5. Frontend — LikeButton Component

- [x] 5.1 Create `app/_components/LikeButton.tsx` as a Client Component with a like button that calls the like action and updates optimistically

## 6. Frontend — Home Page Sections

- [x] 6.1 Add "Top Stickers" section to `app/page.tsx` — fetch via RSC, render using `StickerCard` + `LikeButton`
- [x] 6.2 Add "Most Liked Albums" section to `app/page.tsx` — fetch via RSC, render using `AlbumCard` + `LikeButton`
- [x] 6.3 Add empty state UI for both sections when no likes exist yet

## 7. Frontend — Tests

- [x] 7.1 Add BDD scenarios / unit tests for the home page top stickers section (renders cards, shows empty state)
- [x] 7.2 Add BDD scenarios / unit tests for the home page liked albums section (renders cards, shows empty state)
- [x] 7.3 Add tests for `LikeButton` component (renders, calls action on click)
