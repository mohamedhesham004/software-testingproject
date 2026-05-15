/**
 * Page Object Model — Contact Page
 * Covers: form fill, successful submission, validation errors
 */
class ContactPage {
  // ── Selectors ────────────────────────────────────────────
  get firstNameInput() { return cy.get('[data-test="first-name"]'); }
  get lastNameInput() { return cy.get('[data-test="last-name"]'); }
  get emailInput() { return cy.get('[data-test="email"]'); }
  get subjectSelect() { return cy.get('[data-test="subject"]'); }
  get messageTextarea() { return cy.get('[data-test="message"]'); }
  get submitButton() { return cy.get('[data-test="contact-submit"]'); }
  get successBanner() { return cy.contains('Thanks for your message'); }
  get errorAlert() { return cy.get('.alert-danger'); }

  // ── Actions ──────────────────────────────────────────────
  visit() {
    cy.visit('/contact', { failOnStatusCode: false });
    return this;
  }

  fill(data) {
    this.firstNameInput.type(data.firstName);
    this.lastNameInput.type(data.lastName);
    this.emailInput.type(data.email);
    this.subjectSelect.select(data.subject);
    this.messageTextarea.type(data.message);
    return this;
  }

  fillWithoutMessage(data) {
    this.firstNameInput.type(data.firstName);
    this.lastNameInput.type(data.lastName);
    this.emailInput.type(data.email);
    this.subjectSelect.select(data.subject);
    return this;
  }

  submit() {
    this.submitButton.click();
    return this;
  }

  // ── Assertions ───────────────────────────────────────────
  shouldShowSuccess() {
    this.successBanner.should('be.visible');
    return this;
  }

  shouldShowValidationError() {
    this.errorAlert.should('be.visible');
    this.messageTextarea.should('be.visible');
    return this;
  }
}

export default new ContactPage();
