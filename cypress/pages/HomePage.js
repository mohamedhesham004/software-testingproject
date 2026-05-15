/**
 * Page Object Model — Home Page
 * Covers: product listing, search, sort, category filter
 */
class HomePage {
  // ── Selectors ────────────────────────────────────────────
  get searchInput()    { return cy.get('[data-test="search-query"]'); }
  get searchButton()   { return cy.get('[data-test="search-submit"]'); }
  get sortDropdown()   { return cy.get('[data-test="sort"]'); }
  get productCards()   { return cy.get('.card'); }
  get firstCardTitle() { return cy.get('.card-title').first(); }
  get navBar()         { return cy.get('nav'); }

  // ── Actions ──────────────────────────────────────────────
  visit() {
    cy.visit('/');
    return this;
  }

  searchFor(keyword) {
    this.searchInput.clear().type(keyword);
    this.searchButton.click();
    return this;
  }

  sortBy(optionText) {
    this.sortDropdown.should('be.visible').select(optionText);
    return this;
  }

  clickFirstCard() {
    this.productCards.first().click();
    return this;
  }

  clickCategoryByIndex(index = 0) {
    cy.get("a.nav-link, .category-link, [data-test*='category']")
      .eq(index)
      .click({ force: true });
    return this;
  }

  // ── Assertions ───────────────────────────────────────────
  shouldHaveProducts() {
    this.productCards.should('have.length.greaterThan', 0);
    return this;
  }

  shouldShowNoResults() {
    this.productCards.should('have.length', 0);
    cy.contains(/no results|There are no products/i).should('be.visible');
    return this;
  }

  shouldBeOnHomepage() {
    cy.url().should('include', 'practicesoftwaretesting');
    cy.title().should('not.be.empty');
    return this;
  }
}

export default new HomePage();
