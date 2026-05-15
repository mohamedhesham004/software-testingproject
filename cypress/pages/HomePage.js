class HomePage {

  get searchInput() {

    return cy.get('[data-test="search-query"]', { timeout: 10000 });

  }

  get sortDropdown() {

    return cy.get('[data-test="sort"]', { timeout: 10000 });

  }

  get productCards() {

    return cy.get('.card', { timeout: 10000 });

  }

  get firstCardTitle() {

    return cy.get('.card-title', { timeout: 10000 }).first();

  }

  visit() {

    cy.visit('/', {
      failOnStatusCode: false
    });

    // Wait for page content to fully render
    cy.get('body').should('be.visible');
    // Wait for at least one product card to be visible
    cy.get('[data-test="product-item"], .card, .product', { timeout: 15000 }).should('exist');

    return this;
  }

  searchFor(keyword) {

    this.searchInput
      .clear()
      .type(keyword + '{enter}');

    return this;
  }

  sortBy(optionText) {

    this.sortDropdown
      .select(optionText);

    cy.wait(2000);

    return this;
  }

  clickFirstCard() {

    this.productCards
      .first()
      .click();

    return this;
  }

  clickCategoryByIndex(index = 0) {

    cy.get('a')
      .contains(/Hammer|Hand Tools|Power Tools/i)
      .first()
      .click({ force: true });

    return this;
  }

  shouldHaveProducts() {

    this.productCards
      .should('have.length.greaterThan', 0);

  }

  shouldShowNoResults() {

    cy.contains('There are no products found.')
      .should('be.visible');

  }

  shouldBeOnHomepage() {

    cy.url()
      .should('include', 'practicesoftwaretesting');

  }

}

export default new HomePage();