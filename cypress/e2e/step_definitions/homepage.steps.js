import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import homePage from '../../pages/HomePage';

// ── Background ──────────────────────────────────────────────────────────────
Given('I am on the homepage', () => {
  homePage.visit();
});

// ── Assertions / Then ────────────────────────────────────────────────────────
Then('the URL should contain {string}', (text) => {
  cy.url().should('include', text);
});

Then('the page title should not be empty', () => {
  cy.title().should('not.be.empty');
});

Then('I should see product cards', () => {
  homePage.shouldHaveProducts();
});

Then('the first product card should have an image', () => {
  homePage.productCards.first().within(() => {
    cy.get('img').should('be.visible');
  });
});

Then('the first product card should have a name', () => {
  homePage.productCards.first().within(() => {
    cy.get('.card-title').should('not.be.empty');
  });
});

Then('the first product card should show a price', () => {
  homePage.productCards.first().within(() => {
    cy.get('.card-footer').should('contain.text', '$');
  });
});

Then('the first card title should be visible', () => {
  homePage.firstCardTitle.should('be.visible');
});

Then('I should see no product cards', () => {
  homePage.productCards.should('have.length', 0);
});

Then('I should see a no-results message', () => {
  cy.contains(/no results|There are no products/i).should('be.visible');
});

// ── When / Actions ───────────────────────────────────────────────────────────
When('I search for {string}', (keyword) => {
  homePage.searchFor(keyword);
});

When('I sort products by {string}', (option) => {
  homePage.sortBy(option);
});

When('I click the first category link', () => {
  homePage.clickCategoryByIndex(0);
});
