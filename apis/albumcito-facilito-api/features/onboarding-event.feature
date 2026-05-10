Feature: Onboarding Completion State

  Background:
    Given the API is running

  Scenario: User onboarding is marked complete after adding first sticker
    Given a user is authenticated with email "new-user@example.com" and password "secret123"
    When an authenticated client sends a POST request to "/collection/stickers" with body:
      | stickerId | 101 |
      | albumId   | 1   |
    And a client sends a GET request to "/auth/me" with the auth token
    Then the response body should contain onboardingCompleted true

  Scenario: New user has onboardingCompleted false before adding any sticker
    Given a user is authenticated with email "pending-user@example.com" and password "secret123"
    When a client sends a GET request to "/auth/me" with the auth token
    Then the response body should contain onboardingCompleted false
