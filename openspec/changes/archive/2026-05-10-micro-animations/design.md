## Context

The frontend is a Next.js 16 App Router app using Tailwind CSS v4. Key interactive components are:
- `app/_components/StickerCard.tsx` — renders individual sticker cards
- `app/_components/AlbumCard.tsx` — renders album cards on the home page
- `app/_components/LikeButton.tsx` — heart icon toggle for sticker and album likes
- `app/albums/[id]/page.tsx` — album detail page that renders sticker grids

Currently none of these components have hover or interaction animations. There is no lightbox/modal system.

## Goals / Non-Goals

**Goals:**
- Smooth scale + shadow lift on card hover (StickerCard, AlbumCard)
- Animated heart pulse/bounce on LikeButton click (like and unlike)
- Sticker lightbox: clicking a sticker image opens a full-screen modal with the large sticker art and its metadata
- All animations respect `prefers-reduced-motion`

**Non-Goals:**
- Animated page transitions
- Drag-and-drop reordering
- Backend changes
- Animation of non-card UI elements (nav, buttons other than like)

## Decisions

### 1. CSS-only animations via Tailwind v4 keyframes vs. Framer Motion

**Decision**: CSS keyframes defined in `globals.css`, applied via Tailwind utility classes.

**Rationale**: The animations are simple (scale, opacity, translate). Adding Framer Motion (~50 kB) is unjustified. Tailwind v4 supports `@keyframes` and `animation-*` utilities natively. This keeps the bundle lean and avoids a new dependency.

**Alternatives considered**: Framer Motion for declarative springs — rejected due to bundle cost for these simple effects.

### 2. Sticker lightbox: custom modal vs. Radix UI Dialog

**Decision**: A custom `<StickerLightbox>` component using a `<dialog>` HTML element with CSS transitions.

**Rationale**: No dialog library is currently in use. The lightbox is a single, straightforward pattern. Native `<dialog>` provides accessible focus trapping and keyboard dismissal out of the box without a new dependency.

**Alternatives considered**: Radix UI Dialog — rejected to avoid adding a new dependency for a single use case.

### 3. Placement of animation utilities

**Decision**: Keyframe definitions go in `app/globals.css` under a `@layer utilities` block. Component classes use `animate-*` Tailwind utilities where possible and raw class strings only when custom keyframes are needed.

**Rationale**: Centralises animation tokens, easy to disable globally for reduced-motion, consistent with existing Tailwind v4 usage.

## Risks / Trade-offs

- [Risk] `prefers-reduced-motion` not respected → Mitigation: wrap all `@keyframes` in a `@media (prefers-reduced-motion: no-preference)` block in globals.css so motion is opt-in.
- [Risk] Lightbox focus trap on older browsers → Mitigation: native `<dialog>` `showModal()` is supported in all modern browsers (Chrome 37+, Safari 15.4+, Firefox 98+); no polyfill needed.
- [Risk] Card scale animation causing layout shift → Mitigation: use `transform: scale()` which composites on the GPU and does not trigger reflow.

## Migration Plan

No database or API changes. Deploy is a standard frontend build. Rollback is a revert commit.
