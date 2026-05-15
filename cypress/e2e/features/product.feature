# Feature: Product Detail & Cart
# Covers TC08, TC09, TC10, TC12

Feature: Practice Software Testing - Product Detail and Cart

  Background:
    Given a valid product ID is available

  Scenario: TC08 - Product detail page loads correctly
    Given I am on the product detail page
    Then the product heading should be visible
    And the add-to-cart button should be visible and enabled

  Scenario: TC09 - Quantity can be changed before adding to cart
    Given I am on the product detail page
    When I set the quantity to 2
    Then the quantity field should show 2
    And the add-to-cart button should be enabled

  Scenario: TC10 - Adding a product to cart updates the cart badge
    Given I am logged in as a customer
    And I am on the product detail page
    When I add the product to the cart
    Then the cart badge should be visible
    And the cart badge should not show 0

  Scenario: TC12 - Product detail page shows related products
    Given I am on the product detail page
    Then the product heading should be visible
    And related products should be displayed
