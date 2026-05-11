## 1. ShareModal Component

- [x] 1.1 Create `app/_components/ShareModal.tsx` with `url` and `title` props, `role="dialog"`, `aria-labelledby`, and an overlay backdrop
- [x] 1.2 Add close-on-Escape keydown listener and close-on-backdrop-click handler inside the modal
- [x] 1.3 Implement focus trap: on mount, focus first focusable element; Tab cycles only within modal; restore focus to trigger element on close
- [x] 1.4 Add Facebook share button that opens `https://www.facebook.com/sharer/sharer.php?u=<encoded-url>` in a new tab
- [x] 1.5 Add Twitter/X share button that opens `https://twitter.com/intent/tweet?url=<encoded-url>&text=<encoded-title>` in a new tab
- [x] 1.6 Add WhatsApp share button that opens `https://wa.me/?text=<encoded-text>` in a new tab
- [x] 1.7 Add "Copy link" button: call `navigator.clipboard.writeText(url)`, show "Copied!" confirmation for 2 seconds
- [x] 1.8 Add clipboard-unavailable fallback: render a pre-selected `<input readOnly>` with the URL when clipboard write fails

## 2. ShareButton Trigger Component

- [x] 2.1 Create `app/_components/ShareButton.tsx` — a button that receives `url` and `title` props and toggles `ShareModal` open/closed
- [x] 2.2 Store a ref to the trigger button so `ShareModal` can restore focus on close

## 3. Integration — Album Detail Page

- [x] 3.1 Import and render `ShareButton` in `app/albums/[id]/page.tsx`, passing `url` built from `window.location.origin + /albums/${id}` and `title` as `album.name`
- [x] 3.2 Verify the Share button appears in the album header and the modal opens correctly

## 4. Integration — Sticker Card

- [x] 4.1 Convert `app/_components/StickerCard.tsx` to a Client Component (`"use client"`) to support the interactive ShareButton
- [x] 4.2 Import and render `ShareButton` inside `StickerCard`, passing `url` as `/albums/${sticker.albumId}` and `title` as the sticker name
- [x] 4.3 Verify the Share button appears on each sticker card without breaking the existing grid layout

## 5. Styling & Polish

- [x] 5.1 Style the modal overlay (semi-transparent backdrop), modal panel (white card, rounded, shadow), and close button using Tailwind CSS v4
- [x] 5.2 Style each social share button with a recognizable icon/color (use emoji or inline SVG — no icon library required)
- [x] 5.3 Verify responsive layout: modal looks correct on mobile (full-width) and desktop (centered fixed-width)

## 6. Tests

- [x] 6.1 Write a Vitest unit test for `ShareModal`: assert it renders with correct `role="dialog"`, fires close on Escape, and calls `navigator.clipboard.writeText` on copy-link click
- [x] 6.2 Write a Vitest unit test for `ShareButton`: assert clicking it toggles the modal's visibility
