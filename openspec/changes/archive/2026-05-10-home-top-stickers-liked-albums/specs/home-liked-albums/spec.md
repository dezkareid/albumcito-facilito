## ADDED Requirements

### Requirement: Home page displays most liked albums section
The home page SHALL display a "Most Liked Albums" section showing the top 5 albums ranked by total like count across all users.

#### Scenario: Liked albums shown to unauthenticated visitor
- **WHEN** a visitor opens the home page without being logged in
- **THEN** a "Most Liked Albums" section SHALL be visible with up to 5 album cards

#### Scenario: Liked albums shown to authenticated user
- **WHEN** an authenticated user opens the home page
- **THEN** a "Most Liked Albums" section SHALL be visible with up to 5 album cards showing like counts

#### Scenario: Empty state when no albums have likes
- **WHEN** no album has been liked yet
- **THEN** the "Most Liked Albums" section SHALL show a placeholder message indicating no albums have been liked yet

### Requirement: Liked albums ordered by like count descending
The system SHALL return albums sorted by total like count from highest to lowest. In case of a tie, album ID (ascending) SHALL be used as a tiebreaker.

#### Scenario: Albums ranked by likes
- **WHEN** album A has 15 likes and album B has 8 likes
- **THEN** album A MUST appear before album B in the most liked albums list

### Requirement: Most liked albums API endpoint
The API SHALL expose `GET /albums/top` returning the top 5 albums with their like counts. This endpoint SHALL be publicly accessible (no authentication required).

#### Scenario: Successful top albums fetch
- **WHEN** a client sends `GET /albums/top`
- **THEN** the response SHALL be HTTP 200 with an array of up to 5 album objects each containing `id`, `name`, `description`, `totalStickers`, and `likeCount`

#### Scenario: Endpoint accessible without token
- **WHEN** a client sends `GET /albums/top` with no Authorization header
- **THEN** the response SHALL be HTTP 200 (not 401)
