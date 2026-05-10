### Requirement: Authenticated user can like an album
The system SHALL allow an authenticated user to like an album. Each user SHALL only be able to like a given album once.

#### Scenario: First-time like on an album
- **WHEN** an authenticated user sends `POST /albums/:id/like` for an album they have not liked before
- **THEN** the response SHALL be HTTP 201 with the updated like count for that album

#### Scenario: Duplicate like is rejected
- **WHEN** an authenticated user sends `POST /albums/:id/like` for an album they have already liked
- **THEN** the response SHALL be HTTP 409 Conflict

#### Scenario: Unauthenticated like is rejected
- **WHEN** a request sends `POST /albums/:id/like` with no valid Authorization header
- **THEN** the response SHALL be HTTP 401 Unauthorized

#### Scenario: Like on non-existent album
- **WHEN** an authenticated user sends `POST /albums/:id/like` for an album ID that does not exist
- **THEN** the response SHALL be HTTP 404 Not Found

### Requirement: Album like count is tracked globally
The system SHALL maintain a global like count per album reflecting the total number of unique users who liked it.

#### Scenario: Like count increments on new like
- **WHEN** a user likes an album that had 2 likes
- **THEN** the album's like count SHALL become 3

#### Scenario: Like count does not change on duplicate like attempt
- **WHEN** a user attempts to like an album they already liked (resulting in 409)
- **THEN** the album's like count SHALL remain unchanged
