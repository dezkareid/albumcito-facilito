## ADDED Requirements

### Requirement: Authenticated user can like a sticker
The system SHALL allow an authenticated user to like a sticker. Each user SHALL only be able to like a given sticker once.

#### Scenario: First-time like on a sticker
- **WHEN** an authenticated user sends `POST /stickers/:id/like` for a sticker they have not liked before
- **THEN** the response SHALL be HTTP 201 with the updated like count for that sticker

#### Scenario: Duplicate like is rejected
- **WHEN** an authenticated user sends `POST /stickers/:id/like` for a sticker they have already liked
- **THEN** the response SHALL be HTTP 409 Conflict

#### Scenario: Unauthenticated like is rejected
- **WHEN** a request sends `POST /stickers/:id/like` with no valid Authorization header
- **THEN** the response SHALL be HTTP 401 Unauthorized

#### Scenario: Like on non-existent sticker
- **WHEN** an authenticated user sends `POST /stickers/:id/like` for a sticker ID that does not exist
- **THEN** the response SHALL be HTTP 404 Not Found

### Requirement: Sticker like count is tracked globally
The system SHALL maintain a global like count per sticker reflecting the total number of unique users who liked it.

#### Scenario: Like count increments on new like
- **WHEN** a user likes a sticker that had 3 likes
- **THEN** the sticker's like count SHALL become 4

#### Scenario: Like count does not change on duplicate like attempt
- **WHEN** a user attempts to like a sticker they already liked (resulting in 409)
- **THEN** the sticker's like count SHALL remain unchanged
