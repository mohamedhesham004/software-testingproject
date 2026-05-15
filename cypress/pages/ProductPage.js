/**
 * Page Object Model — Product Detail Page
 * Covers: product info, quantity, add-to-cart, related products
 */
class ProductPage {
  // ── Selectors ────────────────────────────────────────────
  get heading() { return cy.get('h1, h2'); }
  get addToCartButton() { return cy.get('[data-test="add-to-cart"]'); }
  get quantityInput() { return cy.get('[data-test="quantity"]'); }
  get relatedProducts() { return cy.get('.card'); }
  get cartQuantityBadge() { return cy.get('[data-test="cart-quantity"]'); }

  // ── Actions ──────────────────────────────────────────────
  visit(productId) {
    cy.visit('/product/' + productId);
    return this;
  }

  setQuantity(amount) {
    this.quantityInput.should('be.visible').clear().type(`{selectall}${amount}`);
    return this;
  }

  addToCart() {
    cy.intercept('POST', '**/carts').as('addToCart');
    this.addToCartButton.should('be.visible').should('be.enabled').click();
    cy.wait('@addToCart', { timeout: 10000 });
    return this;
  }

  // ── Assertions ───────────────────────────────────────────
  shouldBeVisible() {
    this.heading.should('be.visible');
    this.addToCartButton.should('be.visible').should('be.enabled');
    return this;
  }

  shouldHaveQuantity(amount) {
    this.quantityInput.should('have.value', String(amount));
    return this;
  }

  shouldUpdateCartBadge() {
    this.cartQuantityBadge.should('be.visible');
    this.cartQuantityBadge.invoke('text').should('not.eq', '0');
    return this;
  }

  shouldShowRelatedProducts() {
    this.relatedProducts.should('have.length.greaterThan', 0);
    return this;
  }
}

export default new ProductPage();
