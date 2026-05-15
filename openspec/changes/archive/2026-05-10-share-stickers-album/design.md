## Context

The app currently has no way for users to share albums or stickers externally. Social sharing is a key organic growth mechanism for collection-based apps. The frontend is a Next.js 16 App Router project; the backend has no role in this feature since sharing only requires generating a URL to an existing public page.

## Goals / Non-Goals

**Goals:**
- A reusable `ShareModal` component that renders sharing options: Facebook, Twitter/X, WhatsApp, and copy-link
- A `ShareButton` trigger component placed on the album detail page and sticker cards
- Client-side URL construction — no backend changes
- Copy-link uses `navigator.clipboard`; social targets open in a new tab via well-known share URL patterns
- Accessible modal (focus trap, ESC to close, ARIA labels)

**Non-Goals:**
- Native share sheet via Web Share API (fragmented browser support; modal is the consistent baseline)
- Share analytics / event tracking (future iteration)
- Authenticated/private sharing (all shared links are public routes)
- Custom OG image generation per sticker (future iteration)

## Decisions

### 1. Modal-based UI over inline buttons
**Decision**: Show all share options inside a modal triggered by a single "Share" button.  
**Rationale**: Keeps sticker cards and album headers uncluttered. A modal groups all targets in one place without requiring a dropdown library.  
**Alternative considered**: Inline icon row per card — rejected because it adds visual noise to every card and doesn't scale if targets grow.

### 2. No new npm dependency
**Decision**: Implement share links manually using documented social share URL patterns.  
**Rationale**: Facebook (`https://www.facebook.com/sharer/sharer.php?u=<url>`), Twitter (`https://twitter.com/intent/tweet?url=<url>&text=<text>`), WhatsApp (`https://wa.me/?text=<text>`) are stable, well-known patterns. A sharing library would add bundle weight for trivial string interpolation.

### 3. URL construction on the client
**Decision**: Build the shareable URL from `window.location.origin` + the Next.js route path.  
**Rationale**: The app uses public routes (`/albums/[id]`) that are already shareable. No backend permalink generation needed.

### 4. Component placement
**Decision**: `ShareButton` added to album detail page header and to `StickerCard`.  
**Rationale**: These are the two contexts users naturally want to share. The modal accepts a `url` and `title` prop so one component covers both use cases.

## Risks / Trade-offs

- [Clipboard API] `navigator.clipboard.writeText` requires a secure context (HTTPS/localhost). In non-secure contexts the copy action will silently fail → Mitigation: show a fallback text input with the URL pre-selected so users can copy manually.
- [Popup blockers] Social share links open via `window.open`. Some aggressive blockers may intercept this → Mitigation: fall back to a regular `<a target="_blank">` link rendered inside the modal.
- [Modal accessibility] Focus must be trapped inside the modal while open → Mitigation: implement focus trap with `useEffect` + `tabIndex` management; close on `Escape` key.
