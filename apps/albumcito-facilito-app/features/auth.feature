Feature: Authentication helpers

  Scenario: signupRequest returns username on success
    Given the signup API returns username "test-user"
    When the user calls signupRequest with name "Test User", email "test@example.com" and password "secret123"
    Then the result username should be "test-user"

  Scenario: signupRequest throws on duplicate email
    Given the signup API returns error "Email already registered"
    When the user calls signupRequest with name "Test User", email "dup@example.com" and password "secret123"
    Then an error should be thrown with message "Email already registered"

  Scenario: loginRequest returns username on success
    Given the login API returns username "test-user"
    When the user calls loginRequest with email "test@example.com" and password "secret123"
    Then the result username should be "test-user"

  Scenario: loginRequest throws on invalid credentials
    Given the login API returns error "Invalid credentials"
    When the user calls loginRequest with email "test@example.com" and password "badpassword"
    Then an error should be thrown with message "Invalid credentials"
