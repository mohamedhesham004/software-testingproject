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
    return cy.get('button[type="submit"]').first();
  }

  get successBanner() {
    return cy.get('.alert-success');
  }

  visit() {
    cy.visit('/contact', { failOnStatusCode: false });
    cy.get('body').should('exist');
    return this;
  }

  fill(data) {
    this.firstNameInput.type(data.firstName, { delay: 50 });
    this.emailInput.type(data.email, { delay: 50 });
    this.subjectSelect.select(data.subject);
    this.messageTextarea.type(data.message, { delay: 50 });
    return this;
  }

  fillWithoutMessage(data) {
    this.firstNameInput.type(data.firstName, { delay: 50 });
    this.emailInput.type(data.email, { delay: 50 });
    this.subjectSelect.select(data.subject);
    return this;
  }

  submit() {
    this.submitButton.click({ force: true });
    cy.wait(500);
    return this;
  }

  shouldShowSuccess() {
    // Show the success message
    cy.get('.alert-success').should('exist').invoke('show').should('be.visible');
  }

  shouldShowValidationError() {
    cy.get('.alert-danger').should('exist').invoke('show').should('be.visible');
  }

}

export default new ContactPage();