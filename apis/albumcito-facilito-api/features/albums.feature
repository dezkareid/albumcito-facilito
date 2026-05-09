Feature: Albums API

  Background:
    Given the API is running

  Scenario: List all albums
    When a client sends a GET request to "/albums"
    Then the response status should be 200
    And the response should be a non-empty list

  Scenario: Get stickers for an album
    When a client sends a GET request to "/albums/1/stickers"
    Then the response status should be 200
    And the response should be a non-empty list
    And each item in the response should have a "number" field

  Scenario: Get stickers for a non-existent album
    When a client sends a GET request to "/albums/999/stickers"
    Then the response status should be 404
