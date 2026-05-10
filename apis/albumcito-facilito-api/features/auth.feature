Feature: Authentication API

  Background:
    Given the API is running

  Scenario: User signs up with valid data
    When a client sends a POST request to "/auth/signup" with:
      | name     | Test User        |
      | email    | test@example.com |
      | password | secret123        |
    Then the response status should be 201
    And the response body should contain an access_token
    And the response body should contain username "test-user"

  Scenario: Signup fails when email is already registered
    Given a user exists with email "dup@example.com" and password "secret123"
    When a client sends a POST request to "/auth/signup" with:
      | name     | Another User    |
      | email    | dup@example.com |
      | password | secret123       |
    Then the response status should be 400

  Scenario: User logs in with valid credentials
    Given a user exists with email "login@example.com" and password "secret123"
    When a client sends a POST request to "/auth/login" with:
      | email    | login@example.com |
      | password | secret123         |
    Then the response status should be 201
    And the response body should contain an access_token

  Scenario: Login fails with wrong password
    Given a user exists with email "wrong@example.com" and password "secret123"
    When a client sends a POST request to "/auth/login" with:
      | email    | wrong@example.com |
      | password | badpassword       |
    Then the response status should be 401

  Scenario: Authenticated user can access /auth/me
    Given a user is authenticated with email "me@example.com" and password "secret123"
    When a client sends a GET request to "/auth/me" with the auth token
    Then the response status should be 200
    And the response body should contain email "me@example.com"

  Scenario: Unauthenticated request to /auth/me is rejected
    When a client sends a GET request to "/auth/me"
    Then the response status should be 401
