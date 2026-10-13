## ADDED Requirements

### Requirement: Shop page lists sticker packs
The app SHALL expose a public page at `/shop` that lists every sticker pack returned by the API, each shown as a card with the pack name, album name, number of stickers per pack and price formatted as Mexican pesos.

#### Scenario: Visitor opens the shop
- **WHEN** a visitor (logged in or not) navigates to `/shop`
- **THEN** the page shows one card per pack with its name, album name, "N stickers" and the price formatted as MXN (e.g. `$25.00`)

#### Scenario: No packs available
- **WHEN** the API returns an empty pack list
- **THEN** the page shows the message "No packs available yet"

#### Scenario: API failure
- **WHEN** the packs request fails
- **THEN** the page shows a friendly error message with a way to retry instead of crashing

### Requirement: Shop link in navigation
The site-wide navigation SHALL include a "Shop" link pointing to `/shop`.

#### Scenario: Shop link is visible
- **WHEN** a user views any page
- **THEN** the header shows a "Shop" link that navigates to `/shop`

### Requirement: Packs section on album detail
The album detail page `/albums/[id]` SHALL show a "Packs" section listing that album's packs, with a link to `/shop`.

#### Scenario: Album has packs
- **WHEN** a user opens `/albums/1`
- **THEN** a "Packs" section shows a card for each pack of album 1 and a link to `/shop`

#### Scenario: Album has no packs
- **WHEN** a user opens an album whose packs list is empty
- **THEN** the "Packs" section is not rendered
