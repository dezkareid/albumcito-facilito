Feature: Sticker Collection API

  Background:
    Given the API is running

  Scenario: Authenticated user adds a sticker to their collection
    Given a user is authenticated with email "collector@example.com" and password "secret123"
    When an authenticated client sends a POST request to "/collection/stickers" with body:
      | stickerId | 101 |
      | albumId   | 1   |
    Then the response status should be 201
    And the response body should contain stickerId 101

  Scenario: Authenticated user cannot add the same sticker twice
    Given a user is authenticated with email "dup-collector@example.com" and password "secret123"
    And an authenticated client sends a POST request to "/collection/stickers" with body:
      | stickerId | 101 |
      | albumId   | 1   |
    When an authenticated client sends a POST request to "/collection/stickers" with body:
      | stickerId | 101 |
      | albumId   | 1   |
    Then the response status should be 409

  Scenario: Unauthenticated request to add a sticker is rejected
    When a client sends a POST request to "/collection/stickers" with:
      | stickerId | 101 |
      | albumId   | 1   |
    Then the response status should be 401

  Scenario: Authenticated user retrieves their collection
    Given a user is authenticated with email "reader@example.com" and password "secret123"
    And an authenticated client sends a POST request to "/collection/stickers" with body:
      | stickerId | 102 |
      | albumId   | 1   |
    When a client sends a GET request to "/collection/stickers" with the auth token
    Then the response status should be 200
    And the collection should contain stickerId 102
