# Feature: Contact Form
# Covers TC13, TC14

Feature: Practice Software Testing - Contact Form

  Background:
    Given I am on the contact page

  Scenario: TC13 - Contact form submits successfully with all fields
    When I fill in the contact form with valid data
    And I submit the contact form
    Then I should see a success message

  Scenario: TC14 - Contact form shows error when message field is missing
    When I fill in the contact form without a message
    And I submit the contact form
    Then I should see a validation error alert
    And the message field should still be visible
