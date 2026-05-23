## 1. Backend — Random Sticker Endpoint

- [x] 1.1 Add `getRandomSticker()` method to the NestJS stickers service that selects a random sticker from the catalog and returns it, or throws `NotFoundException` when the catalog is empty
- [x] 1.2 Add `GET /stickers/random` route to the stickers controller that calls `getRandomSticker()` and returns the sticker DTO
- [x] 1.3 Write unit tests for `getRandomSticker()` covering non-empty catalog (returns a sticker) and empty catalog (throws 404)

## 2. Frontend — About Page

- [x] 2.1 Create `apps/albumcito-facilito-app/app/about/page.tsx` as a React Server Component with app name, description text, and the `RandomStickerButton` client island
- [x] 2.2 Create `apps/albumcito-facilito-app/app/about/RandomStickerButton.tsx` as a `'use client'` component with button state, fetch call to `GET /stickers/random`, sticker display (image, name, number), and error fallback

## 3. Frontend — Navigation

- [x] 3.1 Add an "About" navigation link pointing to `/about` in the site header or root layout navbar

## 4. Verification

- [x] 4.1 Verify `GET /stickers/random` returns a valid sticker via curl or API client
- [x] 4.2 Verify the About page loads at `/about`, the button fetches and displays a random sticker, and clicking again replaces the previous result
- [x] 4.3 Verify the "About" nav link is visible from the home page and routes correctly
