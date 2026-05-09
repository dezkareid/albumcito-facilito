Feature: Album browsing

  Scenario: Albums data fetcher returns a list
    Given the albums API responds with a valid list
    When the fetchAlbums function is called
    Then it should return a non-empty array of albums
    And each album should have an id, name, description, and totalStickers

  Scenario: Stickers data fetcher returns a list for a valid album
    Given the stickers API responds with a valid list for album 1
    When the fetchStickers function is called with album id 1
    Then it should return a non-empty array of stickers
    And each sticker should have a number and a name
