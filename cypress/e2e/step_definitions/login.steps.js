import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../pages/LoginPage';

// ── Background ───────────────────────────────────────────────────────────────
Given('I am on the login page', () => {
  loginPage.visit();
});

// ── When / Actions ───────────────────────────────────────────────────────────
When('I enter valid credentials', () => {
  cy.fixture('userData').then((data) => {
    loginPage.fillEmail(data.validUser.email);
    loginPage.fillPassword(data.validUser.password);
  });
});

When('I enter invalid credentials', () => {
  cy.fixture('userData').then((data) => {
    loginPage.fillEmail(data.invalidUser.email);
    loginPage.fillPassword(data.invalidUser.password);
  });
});

When('I submit the login form', () => {
  loginPage.submit();
});

When('I submit the login form without filling any fields', () => {
  loginPage.submit();
});

// ── Then / Assertions ────────────────────────────────────────────────────────
Then('I should be logged in successfully', () => {
  cy.wait(4000);
  loginPage.navBar.should('be.visible');
});

Then('the login button should not be visible', () => {
  loginPage.submitButton.should('not.exist');
});

Then('I should see a login error message', () => {
  loginPage.errorMessage.should('be.visible');
});

Then('the URL should still contain {string}', (path) => {
  cy.url().should('include', path);
});

Then('the email field should be visible', () => {
  loginPage.emailInput.should('be.visible');
});

Then('the password field should be visible', () => {
  loginPage.passwordInput.should('be.visible');
});
