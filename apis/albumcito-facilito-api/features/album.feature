Feature: Album API

  Scenario: API returns a healthy status
    Given the API is running
    When a client sends a GET request to "/"
    Then the response status should be 200
    And the response body should contain a greeting
