# Feature: Login
# Covers TC05, TC06, TC07

Feature: Practice Software Testing - Login

  Background:
    Given I am on the login page

  Scenario: TC05 - Valid credentials log the user in
    When I enter valid credentials
    And I submit the login form
    Then I should be logged in successfully
    And the login button should not be visible

  Scenario: TC06 - Invalid credentials show an error message
    When I enter invalid credentials
    And I submit the login form
    Then I should see a login error message
    And the URL should still contain "login"

  Scenario: TC07 - Empty form submission keeps user on login page
    When I submit the login form without filling any fields
    Then the email field should be visible
    And the password field should be visible
    And the URL should still contain "login"
