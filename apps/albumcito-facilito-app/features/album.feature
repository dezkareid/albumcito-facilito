Feature: Album sticker collection

  Scenario: User starts with an empty collection
    Given the user has no stickers
    Then the collection should be empty
    And the completion percentage should be 0

  Scenario: User marks a sticker as collected
    Given the user has no stickers
    When the user collects sticker number 1
    Then the collection should contain sticker 1
