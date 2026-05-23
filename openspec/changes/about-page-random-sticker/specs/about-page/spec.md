## ADDED Requirements

### Requirement: About page is accessible at /about
The system SHALL expose a page at the `/about` route that is publicly accessible without authentication.

#### Scenario: User navigates to /about
- **WHEN** a user visits `/about`
- **THEN** the page renders with the app name, a short description of Albumcito, and a "Get a Random Sticker" button

### Requirement: Navigation link to About page
The system SHALL include a link to `/about` in the site-wide navigation so users can discover the page from any route.

#### Scenario: About link is visible in nav
- **WHEN** a user views any page in the application
- **THEN** a navigation link labelled "About" pointing to `/about` is present in the header or navbar
