Feature: Sticker packs API

  Background:
    Given the API is running

  Scenario: Pack fields are exposed
    When a client sends a GET request to "/packs/11"
    Then the response status should be 200
    And the response body should expose all pack fields

  Scenario: Anonymous client lists packs
    When a client sends a GET request to "/packs"
    Then the response status should be 200
    And the response should be a non-empty list
    And the packs should be ordered by albumId then id

  Scenario: Pack exists
    When a client sends a GET request to "/packs/11"
    Then the response status should be 200
    And the response body should contain pack id 11

  Scenario: Pack does not exist
    When a client sends a GET request to "/packs/999"
    Then the response status should be 404

  Scenario: Invalid pack id
    When a client sends a GET request to "/packs/abc"
    Then the response status should be 400

  Scenario: List packs of an existing album
    When a client sends a GET request to "/albums/1/packs"
    Then the response status should be 200
    And every pack in the response should have albumId 1

  Scenario: List packs of a non-existent album
    When a client sends a GET request to "/albums/999/packs"
    Then the response status should be 404
