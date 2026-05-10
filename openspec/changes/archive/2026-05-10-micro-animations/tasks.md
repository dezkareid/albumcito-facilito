## 1. Animation foundations (globals.css)

- [x] 1.1 Add `@keyframes heart-pulse` (scale up then back) and `@keyframes heart-shrink` to `app/globals.css` wrapped in `@media (prefers-reduced-motion: no-preference)`
- [x] 1.2 Add `@keyframes lightbox-in` (opacity 0→1, scale 0.9→1) and `@keyframes lightbox-out` (opacity 1→0) to `app/globals.css` wrapped in `@media (prefers-reduced-motion: no-preference)`
- [x] 1.3 Expose the keyframes as Tailwind utility classes (`animate-heart-pulse`, `animate-heart-shrink`, `animate-lightbox-in`) using `@layer utilities` or `theme()` extensions in `app/globals.css`

## 2. Card hover animations

- [x] 2.1 Add `transition-transform duration-150 hover:scale-105 hover:shadow-xl` (or equivalent Tailwind v4 classes) to the root element of `app/_components/StickerCard.tsx`
- [x] 2.2 Add the same hover scale + shadow classes to the root element of `app/_components/AlbumCard.tsx`

## 3. Like button animation

- [x] 3.1 Add a local `animating` state (boolean) to `app/_components/LikeButton.tsx`
- [x] 3.2 On click, set `animating = true` and clear it after 400 ms via `setTimeout`
- [x] 3.3 Conditionally apply `animate-heart-pulse` (liking) or `animate-heart-shrink` (unliking) to the heart icon when `animating` is true

## 4. Sticker lightbox component

- [x] 4.1 Create `app/_components/StickerLightbox.tsx` as a client component wrapping a native `<dialog>` element
- [x] 4.2 Implement `showModal()` / `close()` via a `useEffect` that responds to an `open` prop
- [x] 4.3 Render the sticker image at up to `80vmin`, sticker number, and sticker name inside the dialog
- [x] 4.4 Add a close (×) button that calls `onClose`
- [x] 4.5 Add backdrop click handler (`dialog.addEventListener('click', backdropClose)`) to close on outside click
- [x] 4.6 Apply `animate-lightbox-in` on open; handle close fade-out by waiting for `animationend` before calling `dialog.close()`
- [x] 4.7 Set `role="dialog"`, `aria-modal="true"`, and `aria-label` with the sticker name on the dialog element

## 5. Wire lightbox into StickerCard

- [x] 5.1 Add `useState<boolean>` for `lightboxOpen` in `app/_components/StickerCard.tsx`
- [x] 5.2 Wrap the sticker image in a `<button>` that sets `lightboxOpen = true` on click
- [x] 5.3 Render `<StickerLightbox>` at the bottom of `StickerCard` passing sticker data, `open`, and `onClose`

## 6. Accessibility & reduced-motion verification

- [x] 6.1 Verify focus is trapped inside the lightbox dialog while open (native `<dialog>` provides this)
- [x] 6.2 Verify focus returns to the trigger button when the lightbox closes (pass ref or use `document.activeElement` on open)
- [x] 6.3 Manually test with `prefers-reduced-motion: reduce` DevTools emulation — confirm no animations play

## 7. Tests

- [x] 7.1 Update `src/__tests__/like-button.spec.tsx` to assert `animate-heart-pulse` class is applied on like click
- [x] 7.2 Add a unit test for `StickerLightbox` verifying it renders with `aria-modal="true"` and closes on Escape
