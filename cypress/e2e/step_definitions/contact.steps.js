import { Given, When, Then }
from '@badeball/cypress-cucumber-preprocessor';

import contactPage from '../../pages/ContactPage';

Given('I am on the contact page', () => {

  contactPage.visit();

});

When('I fill in the contact form with valid data', () => {

  contactPage.fill();

});

When('I fill in the contact form without a message', () => {

  contactPage.fillWithoutMessage();

});

When('I submit the contact form', () => {

  contactPage.submit();

});

Then('I should see a success message', () => {

  contactPage.shouldShowSuccess();

});

Then('I should see a validation error alert', () => {

  contactPage.shouldShowValidationError();

});

Then('the message field should still be visible', () => {

  contactPage.messageTextarea.should('be.visible');

});