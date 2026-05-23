## ADDED Requirements

### Requirement: Random sticker API endpoint
The API SHALL expose a `GET /stickers/random` endpoint that returns a single randomly selected sticker from the full catalog.

#### Scenario: Catalog has stickers
- **WHEN** `GET /stickers/random` is called and the catalog is non-empty
- **THEN** the response is HTTP 200 with a JSON body containing the sticker's id, number, name, and image URL

#### Scenario: Catalog is empty
- **WHEN** `GET /stickers/random` is called and no stickers exist
- **THEN** the response is HTTP 404 with a message indicating no stickers are available

### Requirement: Random sticker button on the About page
The About page SHALL include a button that, when clicked, fetches a random sticker from the API and displays it on the page.

#### Scenario: User clicks the button and a sticker is returned
- **WHEN** the user clicks "Get a Random Sticker"
- **THEN** the page displays the sticker's image, name, and number without navigating away

#### Scenario: User clicks the button again
- **WHEN** the user clicks "Get a Random Sticker" a second time
- **THEN** the previously shown sticker is replaced with the newly fetched random sticker

#### Scenario: API returns an error
- **WHEN** the user clicks "Get a Random Sticker" and the API request fails
- **THEN** a user-friendly error message is displayed and the button remains active for retry
