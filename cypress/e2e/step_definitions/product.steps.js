import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import productPage from '../../pages/ProductPage';

let productId;

// ── Background ───────────────────────────────────────────────────────────────
Given('a valid product ID is available', () => {
  cy.request('https://api.practicesoftwaretesting.com/products?page=1').then((res) => {
    productId = res.body.data[0].id;
    cy.log('Using product ID: ' + productId);
  });
});

Given('I am on the product detail page', () => {
  cy.request('https://api.practicesoftwaretesting.com/products?page=1').then((res) => {
    productId = res.body.data[0].id;
    productPage.visit(productId);
  });
});

Given('I am logged in as a customer', () => {
  cy.fixture('userData').then((data) => {
    cy.loginAsCustomer();
  });
});

// ── When / Actions ───────────────────────────────────────────────────────────
When('I set the quantity to {int}', (amount) => {
  // Wait for page to fully load before setting quantity
  cy.wait(2000);
  productPage.setQuantity(amount);
});

When('I add the product to the cart', () => {
  productPage.addToCart();
});

// ── Then / Assertions ────────────────────────────────────────────────────────
Then('the product heading should be visible', () => {
  productPage.heading.should('be.visible');
});

Then('the add-to-cart button should be visible and enabled', () => {
  productPage.addToCartButton.should('be.visible').should('be.enabled');
});

Then('the add-to-cart button should be enabled', () => {
  productPage.addToCartButton.should('be.enabled');
});

Then('the quantity field should show {int}', (amount) => {
  productPage.shouldHaveQuantity(amount);
});

Then('the cart badge should be visible', () => {
  productPage.cartQuantityBadge.should('be.visible');
});

Then('the cart badge should not show 0', () => {
  productPage.cartQuantityBadge.invoke('text').should('not.eq', '0');
});

Then('related products should be displayed', () => {
  productPage.shouldShowRelatedProducts();
});
