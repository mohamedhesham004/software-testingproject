# Feature: Homepage
# Covers TC01, TC02, TC03, TC04, TC11, TC15

Feature: Practice Software Testing - Homepage

  Background:
    Given I am on the homepage

  Scenario: TC01 - Homepage loads and displays products
    Then the URL should contain "practicesoftwaretesting"
    And the page title should not be empty
    And I should see product cards

  Scenario: TC02 - Each product card has an image, name and price
    Then the first product card should have an image
    And the first product card should have a name
    And the first product card should show a price

  Scenario: TC03 - Search returns relevant results for a valid keyword
    When I search for "Pliers"
    Then I should see product cards
    And the first card title should be visible

  Scenario: TC04 - Search with no results shows empty message
    When I search for "xyznotaproduct999"
    Then I should see no product cards
    And I should see a no-results message

  Scenario: TC11 - Products can be sorted by price low to high
    When I sort products by "Price (Low - High)"
    Then I should see product cards

  Scenario: TC15 - Clicking a category filter shows products
    When I click the first category link
    Then I should see product cards
    And the first card title should be visible
