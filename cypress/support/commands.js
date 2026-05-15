Cypress.Commands.add("login", (email, password) => {
  cy.visit("/auth/login");
  cy.get('[data-test="email"]').clear().type(email);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-submit"]').click();
});

Cypress.Commands.add("addToCart", (index = 0) => {
  cy.visit("/");
  cy.get(".card").eq(index).click();
  cy.url().should("include", "/product");
  cy.get('[data-test="add-to-cart"]').should("be.visible").click();
});

Cypress.Commands.add("fillContactForm", (data) => {
  cy.get('[data-test="first-name"]').type(data.firstName);
  cy.get('[data-test="last-name"]').type(data.lastName);
  cy.get('[data-test="email"]').type(data.email);
  cy.get('[data-test="subject"]').select(data.subject);
  cy.get('[data-test="message"]').type(data.message);
});

Cypress.Commands.add("searchProduct", (keyword) => {
  cy.get('[data-test="search-query"]').clear().type(keyword);
  cy.get('[data-test="search-submit"]').click();
});
Cypress.Commands.add("loginAsCustomer", () => {
  cy.visit("/auth/login");
  cy.get('[data-test="email"]').type("customer@practicesoftwaretesting.com");
  cy.get('[data-test="password"]').type("welcome01");
  cy.get('[data-test="login-submit"]').click();
  cy.wait(3000);
});