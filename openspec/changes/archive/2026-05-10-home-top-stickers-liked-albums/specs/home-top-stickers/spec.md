## ADDED Requirements

### Requirement: Home page displays top stickers section
The home page SHALL display a "Top Stickers" section showing the top 5 stickers ranked by total like count across all users.

#### Scenario: Top stickers shown to unauthenticated visitor
- **WHEN** a visitor opens the home page without being logged in
- **THEN** a "Top Stickers" section SHALL be visible with up to 5 sticker cards

#### Scenario: Top stickers shown to authenticated user
- **WHEN** an authenticated user opens the home page
- **THEN** a "Top Stickers" section SHALL be visible with up to 5 sticker cards showing like counts

#### Scenario: Empty state when no stickers have likes
- **WHEN** no sticker has been liked yet
- **THEN** the "Top Stickers" section SHALL show a placeholder message indicating no stickers have been liked yet

### Requirement: Top stickers ordered by like count descending
The system SHALL return stickers sorted by total like count from highest to lowest. In case of a tie, sticker ID (ascending) SHALL be used as a tiebreaker.

#### Scenario: Stickers ranked by likes
- **WHEN** sticker A has 10 likes and sticker B has 7 likes
- **THEN** sticker A MUST appear before sticker B in the top stickers list

#### Scenario: Tie-breaking by sticker ID
- **WHEN** sticker 3 and sticker 7 both have 5 likes
- **THEN** sticker 3 MUST appear before sticker 7

### Requirement: Top stickers API endpoint
The API SHALL expose `GET /stickers/top` returning the top 5 stickers with their like counts. This endpoint SHALL be publicly accessible (no authentication required).

#### Scenario: Successful top stickers fetch
- **WHEN** a client sends `GET /stickers/top`
- **THEN** the response SHALL be HTTP 200 with an array of up to 5 sticker objects each containing `id`, `albumId`, `number`, `name`, and `likeCount`

#### Scenario: Endpoint accessible without token
- **WHEN** a client sends `GET /stickers/top` with no Authorization header
- **THEN** the response SHALL be HTTP 200 (not 401)
