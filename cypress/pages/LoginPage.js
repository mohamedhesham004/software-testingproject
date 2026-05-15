class LoginPage {

  get emailInput() {

    return cy.get('#email', { timeout: 10000 });

  }

  get passwordInput() {

    return cy.get('#password', { timeout: 10000 });

  }

  get submitButton() {

    return cy.get('[data-test="login-submit"]', { timeout: 10000 });

  }

  get errorMessage() {

    return cy.get('[data-test="login-error"]', { timeout: 10000 });

  }

  get navBar() {

    return cy.get('nav', { timeout: 10000 });

  }

  visit() {

    cy.visit('/', {
      failOnStatusCode: false
    });

    // Wait for home page to load
    cy.get('body').should('be.visible');

    // Click Sign in button
    cy.contains('Sign in', { timeout: 15000 }).click();

    // Wait for login form to appear
    cy.get('[data-test="login-submit"], #email, input[name="email"]', { timeout: 15000 }).should('exist');

    return this;
  }

  fillEmail(email) {

    this.emailInput
      .clear()
      .type(email);

    return this;
  }

  fillPassword(password) {

    this.passwordInput
      .clear()
      .type(password);

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

  }

  shouldShowError() {

    cy.contains('Invalid email or password')
      .should('be.visible');

  }

  shouldBeLoggedIn() {

    cy.url()
      .should('include', '/account');

  }

}

export default new LoginPage();