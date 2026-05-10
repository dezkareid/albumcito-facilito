Feature: Home page top stickers

  Scenario: fetchTopStickers returns stickers with like counts
    Given the top stickers API responds with 3 stickers
    When the fetchTopStickers function is called
    Then it should return an array of stickers
    And each sticker should have a likeCount field

  Scenario: fetchTopStickers returns empty array when no stickers are liked
    Given the top stickers API responds with an empty list
    When the fetchTopStickers function is called
    Then it should return an empty array
