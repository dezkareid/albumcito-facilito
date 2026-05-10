## ADDED Requirements

### Requirement: Share button triggers sharing modal
The system SHALL display a "Share" button on the album detail page and on each sticker card. Clicking the button SHALL open a modal with sharing options.

#### Scenario: Share button visible on album page
- **WHEN** a user views an album detail page
- **THEN** a "Share" button SHALL be visible in the album header area

#### Scenario: Share button visible on sticker card
- **WHEN** a user views a sticker card
- **THEN** a "Share" button or icon SHALL be visible on the card

#### Scenario: Modal opens on click
- **WHEN** the user clicks the "Share" button
- **THEN** a modal SHALL appear containing the sharing options

### Requirement: Share modal displays social network options
The sharing modal SHALL provide options for Facebook, Twitter/X, and WhatsApp, each opening a pre-filled share intent in a new browser tab.

#### Scenario: Facebook share
- **WHEN** the user clicks the Facebook option in the modal
- **THEN** a new tab SHALL open with the Facebook sharer URL pre-filled with the current page URL

#### Scenario: Twitter/X share
- **WHEN** the user clicks the Twitter/X option in the modal
- **THEN** a new tab SHALL open with the Twitter intent URL pre-filled with the current page URL and a default share text

#### Scenario: WhatsApp share
- **WHEN** the user clicks the WhatsApp option in the modal
- **THEN** a new tab SHALL open with the WhatsApp share URL pre-filled with the current page URL and default text

### Requirement: Copy link to clipboard
The sharing modal SHALL include a "Copy link" option that copies the current page URL to the user's clipboard.

#### Scenario: Successful copy
- **WHEN** the user clicks "Copy link" and the Clipboard API is available
- **THEN** the URL SHALL be copied to the clipboard and the button SHALL display a confirmation ("Copied!") briefly

#### Scenario: Clipboard unavailable fallback
- **WHEN** the user clicks "Copy link" and the Clipboard API is unavailable
- **THEN** the modal SHALL display a text input with the URL pre-selected so the user can copy it manually

### Requirement: Modal can be dismissed
The sharing modal SHALL be closable by the user at any time without performing a share action.

#### Scenario: Close via button
- **WHEN** the user clicks the close button (×) in the modal
- **THEN** the modal SHALL close and focus SHALL return to the triggering element

#### Scenario: Close via Escape key
- **WHEN** the sharing modal is open and the user presses the Escape key
- **THEN** the modal SHALL close

#### Scenario: Close via backdrop click
- **WHEN** the user clicks outside the modal content area
- **THEN** the modal SHALL close

### Requirement: Share modal is accessible
The sharing modal SHALL meet baseline accessibility requirements so keyboard and screen-reader users can operate it.

#### Scenario: Focus is trapped inside modal
- **WHEN** the modal is open
- **THEN** pressing Tab SHALL cycle focus only through interactive elements inside the modal

#### Scenario: Modal has ARIA role and label
- **WHEN** the modal is rendered
- **THEN** it SHALL have `role="dialog"` and an `aria-label` or `aria-labelledby` describing the sharing action
