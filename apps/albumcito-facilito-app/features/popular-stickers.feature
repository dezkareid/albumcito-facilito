Feature: Popular stickers page — filter chips

  Scenario: User sees all filter chips on load
    Given the user is on the popular stickers page
    Then the filter chips "All", "Rare", "Common", and "Legendary" should be visible
    And the "All" chip should be active

  Scenario: User selects the "Rare" filter chip
    Given the user is on the popular stickers page
    When the user clicks the "Rare" chip
    Then the "Rare" chip should be active
    And the "All" chip should not be active

  Scenario: User selects "Legendary" and then switches back to "All"
    Given the user is on the popular stickers page
    When the user clicks the "Legendary" chip
    Then the "Legendary" chip should be active
    When the user clicks the "All" chip
    Then the "All" chip should be active
    And the "Legendary" chip should not be active
