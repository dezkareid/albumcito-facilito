## Why

The app currently has no informational page explaining its purpose to new users, and there is no way to discover stickers playfully. An About page provides context and a random sticker button creates a fun discovery mechanic that encourages exploration and collection engagement.

## What Changes

- Add a new `/about` page in the Next.js frontend that describes the Albumcito experience and its purpose.
- Add a "Get a Random Sticker" button on the About page that fetches and displays a random sticker from the catalog.
- Add a `GET /stickers/random` endpoint on the NestJS API that returns a single random sticker.

## Capabilities

### New Capabilities

- `about-page`: Static informational page at `/about` with app description and branding.
- `random-sticker`: Button on the About page that calls the API and reveals a random sticker with its details.

### Modified Capabilities

<!-- No existing spec-level requirements are changing. -->

## Impact

- **Frontend**: New page `app/about/page.tsx`, new API call to `/stickers/random`.
- **Backend**: New `GET /stickers/random` route in the stickers module.
- **Navigation**: May need a link to `/about` added to the main nav or header.
