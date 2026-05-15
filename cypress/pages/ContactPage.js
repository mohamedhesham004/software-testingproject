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

  visit() {

    cy.visit('/contact', {
      failOnStatusCode: false
    });

    return this;
  }

  fill() {

    this.firstNameInput
      .clear()
      .type('Test');

    this.lastNameInput
      .clear()
      .type('User');

    this.emailInput
      .clear()
      .type('test@test.com');

    this.subjectSelect
      .select('Customer service');

    this.messageTextarea
      .clear()
      .type(
        'This is an automated Cypress contact form test message.'
      );

    return this;
  }

  fillWithoutMessage() {

    this.firstNameInput
      .clear()
      .type('Test');

    this.lastNameInput
      .clear()
      .type('User');

    this.emailInput
      .clear()
      .type('test@test.com');

    this.subjectSelect
      .select('Customer service');

    return this;
  }

  submit() {

    this.submitButton
      .click({ force: true });

    cy.wait(1000);

    return this;
  }

  shouldShowSuccess() {

    cy.contains('Thanks')
      .should('be.visible');

  }

  shouldShowValidationError() {

    cy.contains('Message is required')
      .should('be.visible');

  }

}

export default new ContactPage();