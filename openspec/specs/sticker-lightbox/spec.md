### Requirement: Clicking a sticker image opens a lightbox modal
The system SHALL open a full-screen overlay modal displaying the sticker's full-size image when the user clicks on the sticker artwork in a `StickerCard`.

#### Scenario: Lightbox opens on sticker click
- **WHEN** a user clicks the sticker image inside a `StickerCard`
- **THEN** a modal overlay SHALL appear showing the sticker image at a large size (up to 80vmin)

#### Scenario: Lightbox shows sticker metadata
- **WHEN** the lightbox is open
- **THEN** the sticker's number and name SHALL be displayed below the image

#### Scenario: Lightbox opens with fade-in animation
- **WHEN** the lightbox opens
- **THEN** the overlay SHALL fade in and the image SHALL scale from 0.9 to 1.0 within 200 ms

#### Scenario: No open animation with reduced-motion preference
- **WHEN** the user's OS has `prefers-reduced-motion: reduce` set AND the lightbox opens
- **THEN** the overlay SHALL appear immediately without a scale or fade transition

### Requirement: Lightbox can be dismissed
The system SHALL provide multiple ways for the user to close the lightbox.

#### Scenario: Dismiss via close button
- **WHEN** a user clicks the close (×) button inside the lightbox
- **THEN** the lightbox SHALL close

#### Scenario: Dismiss via Escape key
- **WHEN** the lightbox is open and the user presses the Escape key
- **THEN** the lightbox SHALL close

#### Scenario: Dismiss via backdrop click
- **WHEN** a user clicks outside the sticker image area (on the dark backdrop)
- **THEN** the lightbox SHALL close

#### Scenario: Lightbox closes with fade-out animation
- **WHEN** the lightbox is dismissed
- **THEN** the overlay SHALL fade out within 150 ms before being removed from the DOM

### Requirement: Lightbox is accessible
The system SHALL meet basic accessibility requirements for the modal.

#### Scenario: Focus is trapped inside lightbox while open
- **WHEN** the lightbox is open
- **THEN** keyboard focus SHALL remain within the modal until it is closed

#### Scenario: Focus returns to trigger element on close
- **WHEN** the lightbox closes
- **THEN** keyboard focus SHALL return to the sticker card that triggered it

#### Scenario: Lightbox has appropriate ARIA role
- **WHEN** the lightbox is open
- **THEN** the modal element SHALL have `role="dialog"` and `aria-modal="true"` with a descriptive `aria-label`
