## MODIFIED Requirements

### Requirement: Authenticated user can like a sticker
The system SHALL allow an authenticated user to like a sticker. Each user SHALL only be able to like a given sticker once. The like button SHALL play a pulse animation when the like is registered.

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

#### Scenario: Like button animates on successful like
- **WHEN** a user clicks the like button and the like is successfully registered
- **THEN** the heart icon SHALL play a pulse animation as defined in the `like-button-animation` capability
