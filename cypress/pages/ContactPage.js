class ContactPage {

  get firstNameInput() {

    return cy.get('#first_name');

  }

  get lastNameInput() {

    return cy.get('#last_name');

  }

  get emailInput() {

    return cy.get('#email');

  }

  get subjectSelect() {

    return cy.get('#subject');

  }

  get messageTextarea() {

    return cy.get('#message');

  }

  get submitButton() {

    return cy.contains('Send');

  }

  get successBanner() {

    return cy.contains('Thanks for your message!');

  }

  visit() {

    cy.visit('/contact');

    return this;
  }

  fill(data) {

    this.firstNameInput.type(data.contactName);

    this.emailInput.type(data.contactEmail);

    this.subjectSelect.select('Customer service');

    this.messageTextarea.type(data.contactMessage);

    return this;
  }

  fillWithoutMessage(data) {

    this.firstNameInput.type(data.contactName);

    this.emailInput.type(data.contactEmail);

    this.subjectSelect.select('Customer service');

    return this;
  }

  submit() {

    this.submitButton.click();

    return this;
  }

  shouldShowSuccess() {

    this.successBanner.should('be.visible');

  }

  shouldShowValidationError() {

    cy.contains('Message is required')
      .should('be.visible');

  }

}

export default new ContactPage();