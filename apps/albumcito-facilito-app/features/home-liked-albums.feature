Feature: Home page most liked albums

  Scenario: fetchTopAlbums returns albums with like counts
    Given the top albums API responds with 2 albums
    When the fetchTopAlbums function is called
    Then it should return an array of albums
    And each album should have a likeCount field

  Scenario: fetchTopAlbums returns empty array when no albums are liked
    Given the top albums API responds with an empty list
    When the fetchTopAlbums function is called
    Then it should return an empty array
