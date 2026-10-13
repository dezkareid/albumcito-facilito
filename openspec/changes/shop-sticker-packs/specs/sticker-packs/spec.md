## ADDED Requirements

### Requirement: Sticker pack data model
The API SHALL model a sticker pack as a purchasable product with `id`, `albumId`, `albumName`, `name`, `stickersPerPack`, `priceCents` (positive integer) and `currency` (`MXN`). Every album SHALL have at least one pack and at most two.

#### Scenario: Pack fields are exposed
- **WHEN** a client requests any pack from the API
- **THEN** the JSON body contains `id`, `albumId`, `albumName`, `name`, `stickersPerPack`, `priceCents` and `currency`, with `priceCents` an integer and `currency` equal to `"MXN"`

### Requirement: List all packs
The API SHALL expose a public `GET /packs` endpoint that returns every pack, ordered by `albumId` and then `id`, without requiring authentication.

#### Scenario: Anonymous client lists packs
- **WHEN** an unauthenticated client sends `GET /packs`
- **THEN** the response is HTTP 200 with a non-empty array of packs ordered by `albumId` then `id`

### Requirement: Get a pack by id
The API SHALL expose a public `GET /packs/:id` endpoint that returns a single pack.

#### Scenario: Pack exists
- **WHEN** a client sends `GET /packs/11`
- **THEN** the response is HTTP 200 with the pack whose `id` is 11

#### Scenario: Pack does not exist
- **WHEN** a client sends `GET /packs/999`
- **THEN** the response is HTTP 404

#### Scenario: Invalid pack id
- **WHEN** a client sends `GET /packs/abc`
- **THEN** the response is HTTP 400

### Requirement: List packs of an album
The API SHALL expose a public `GET /albums/:id/packs` endpoint that returns the packs belonging to that album.

#### Scenario: Album exists
- **WHEN** a client sends `GET /albums/1/packs`
- **THEN** the response is HTTP 200 with an array where every pack has `albumId` 1

#### Scenario: Album does not exist
- **WHEN** a client sends `GET /albums/999/packs`
- **THEN** the response is HTTP 404
