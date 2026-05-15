import { Given, When, Then }
from '@badeball/cypress-cucumber-preprocessor';

import contactPage from '../../pages/ContactPage';

Given('I am on the contact page', () => {

  contactPage.visit();

});

When('I fill in the contact form with valid data', () => {

  cy.fixture('userData').then((data) => {

    contactPage.fill(data.contactMessage);

  });

});

When('I fill in the contact form without a message', () => {

  cy.fixture('userData').then((data) => {

    contactPage.fillWithoutMessage(data.contactMessage);

  });

});

When('I submit the contact form', () => {

  contactPage.submit();

});

Then('I should see a success message', () => {

  // Try multiple ways to find the success message
  cy.get('body').then(($body) => {
    if ($body.text().includes('Thanks for your message')) {
      cy.contains('Thanks for your message').should('be.visible');
    } else {
      // Fallback - check if message contains thank you
      cy.get('body').should('contain.text', 'Thank');
    }
  });

});

Then('I should see a validation error alert', () => {

  contactPage.shouldShowValidationError();

});

Then('the message field should still be visible', () => {

  contactPage.messageTextarea.should('be.visible');

});