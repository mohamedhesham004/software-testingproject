/**
 * Page Object Model — Login Page
 * Covers: valid login, invalid login, empty-field validation
 */
class LoginPage {
  // ── Selectors ────────────────────────────────────────────
  get emailInput()    { return cy.get('[data-test="email"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get submitButton()  { return cy.get('[data-test="login-submit"]'); }
  get errorMessage()  { return cy.get('[data-test="login-error"]'); }
  get navBar()        { return cy.get('nav'); }

  // ── Actions ──────────────────────────────────────────────
  visit() {
    cy.visit('/auth/login');
    return this;
  }

  fillEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  submit() {
    this.submitButton.click();
    return this;
  }

  loginWith(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
    return this;
  }

  // ── Assertions ───────────────────────────────────────────
  shouldShowError() {
    this.errorMessage.should('be.visible');
    cy.url().should('include', 'login');
    return this;
  }

  shouldBeLoggedIn() {
    cy.wait(4000);
    this.navBar.should('be.visible');
    this.submitButton.should('not.exist', { timeout: 10000 });
    return this;
  }

  shouldRemainOnLoginPage() {
    cy.url().should('include', 'login');
    this.emailInput.should('be.visible');
    this.passwordInput.should('be.visible');
    return this;
  }
}

export default new LoginPage();
