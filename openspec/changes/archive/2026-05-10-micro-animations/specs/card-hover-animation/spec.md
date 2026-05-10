## ADDED Requirements

### Requirement: Sticker card scales up on hover
The system SHALL apply a scale and shadow lift transition to `StickerCard` when the user hovers over it with a pointer device.

#### Scenario: Card lifts on hover
- **WHEN** a user moves their pointer over a sticker card
- **THEN** the card SHALL scale to 1.05× its original size and display an elevated box shadow within 150 ms

#### Scenario: Card returns to rest on pointer leave
- **WHEN** a user moves their pointer away from a sticker card
- **THEN** the card SHALL smoothly return to its original scale and shadow within 150 ms

#### Scenario: No animation with reduced-motion preference
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the card SHALL display no scale or shadow transition on hover

### Requirement: Album card scales up on hover
The system SHALL apply the same scale and shadow lift transition to `AlbumCard` on hover.

#### Scenario: Album card lifts on hover
- **WHEN** a user moves their pointer over an album card
- **THEN** the card SHALL scale to 1.05× and show an elevated box shadow within 150 ms

#### Scenario: Album card returns to rest on pointer leave
- **WHEN** a user moves their pointer away from an album card
- **THEN** the card SHALL smoothly return to its original size and shadow within 150 ms

#### Scenario: No animation with reduced-motion preference
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set
- **THEN** the album card SHALL display no transition on hover
