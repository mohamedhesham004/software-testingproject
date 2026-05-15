class ContactPage {

  get firstNameInput() {

    return cy.get('#first_name');

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

    cy.visit('/contact', {
      failOnStatusCode: false
    });

    return this;
  }

  fill(data) {

    this.firstNameInput.type(data.firstName);

    this.emailInput.type(data.email);

    this.subjectSelect.select(data.subject);

    this.messageTextarea.type(data.message);

    return this;
  }

  fillWithoutMessage(data) {

    this.firstNameInput.type(data.firstName);

    this.emailInput.type(data.email);

    this.subjectSelect.select(data.subject);

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