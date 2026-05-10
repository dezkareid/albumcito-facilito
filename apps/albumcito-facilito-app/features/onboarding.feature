Feature: Onboarding collection helpers

  Scenario: addStickerToCollection succeeds and returns the entry
    Given the collection API accepts the sticker
    When the user calls addStickerToCollection with stickerId 101 and albumId 1
    Then the result should contain stickerId 101

  Scenario: addStickerToCollection throws when the API returns an error
    Given the collection API returns error "Conflict"
    When the user calls addStickerToCollection with stickerId 101 and albumId 1
    Then an error should be thrown with message "Conflict"
