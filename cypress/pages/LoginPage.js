class LoginPage {

  get emailInput() {

    return cy.get('#email');

  }

  get passwordInput() {

    return cy.get('#password');

  }

  get submitButton() {

    return cy.get('[data-test="login-submit"]');

  }

  visit() {

    cy.visit('/', {
      failOnStatusCode: false
    });

    cy.contains('Sign in').click();

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