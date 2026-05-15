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

    // Wait for form to be visible
    cy.get('body').should('be.visible');
    
    // Wait for first name input to be ready
    this.firstNameInput.should('exist');

    return this;
  }

  fill(data) {

    // Clear and fill first name
    this.firstNameInput.clear().type(data.firstName, { delay: 50 });

    // Clear and fill email
    this.emailInput.clear().type(data.email, { delay: 50 });

    // Select subject
    this.subjectSelect.select(data.subject);

    // Clear and fill message
    this.messageTextarea.clear().type(data.message, { delay: 50 });

    return this;
  }

  fillWithoutMessage(data) {

    // Clear and fill first name
    this.firstNameInput.clear().type(data.firstName, { delay: 50 });

    // Clear and fill email
    this.emailInput.clear().type(data.email, { delay: 50 });

    // Select subject
    this.subjectSelect.select(data.subject);

    return this;
  }

  submit() {

    // Ensure submit button is visible before clicking
    this.submitButton.should('be.visible').click({ force: true });

    // Wait a bit for form submission to complete
    cy.wait(1000);

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