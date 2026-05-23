Feature: About page — Random Sticker button

  Scenario: User sees the About page content
    Given the user is on the About page
    Then the page should display the app name heading
    And the page should display a description of the experience
    And the page should display a "Get a Random Sticker" button

  Scenario: User gets a random sticker successfully
    Given the user is on the About page
    And the random sticker API will return a sticker
    When the user clicks the "Get a Random Sticker" button
    Then the sticker name and number should be displayed
    And the sticker id should be displayed

  Scenario: User sees a loading state while fetching
    Given the user is on the About page
    And the random sticker API will respond after a delay
    When the user clicks the "Get a Random Sticker" button
    Then the button should show a loading indicator

  Scenario: User gets a new sticker replacing the previous result
    Given the user is on the About page
    And the random sticker API will return a sticker
    When the user clicks the "Get a Random Sticker" button
    Then the sticker name and number should be displayed
    When the user clicks the "Get a Random Sticker" button again
    Then only one sticker result should be visible

  Scenario: API returns 404 — friendly error is shown
    Given the user is on the About page
    And the random sticker API will respond with a 404
    When the user clicks the "Get a Random Sticker" button
    Then a friendly error message should be shown
    And the "Get a Random Sticker" button should still be active

  Scenario: Network failure — friendly error is shown
    Given the user is on the About page
    And the random sticker API will fail with a network error
    When the user clicks the "Get a Random Sticker" button
    Then a friendly error message should be shown
    And the "Get a Random Sticker" button should still be active
