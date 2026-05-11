## Why

Users want to share their sticker collections and albums with friends on social networks to drive engagement and organic growth. Adding social sharing buttons makes it easy to spread the word and invite new collectors.

## What Changes

- Add a **Share** button to album and sticker detail views
- Implement a modal with sharing options: Facebook, Twitter/X, WhatsApp, copy link
- Generate shareable URLs for albums and individual stickers
- Track share events for analytics (optional/future)

## Capabilities

### New Capabilities

- `social-share`: Modal-based sharing UI with pre-configured targets (Facebook, Twitter/X, WhatsApp, copy-link) for albums and stickers

### Modified Capabilities

<!-- No existing spec-level behavior is changing -->

## Impact

- **Frontend**: New `ShareModal` component + share trigger buttons added to album and sticker views (`apps/albumcito-facilito-app/`)
- **No backend changes required**: Sharing uses client-side URL construction with existing public routes
- **Dependencies**: No new packages needed — Web Share API and `navigator.clipboard` are used natively; fallback links use well-known social share URL patterns
