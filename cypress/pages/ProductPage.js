class ProductPage {

  get heading() {

    return cy.get('h1');

  }

  get addToCartButton() {

    return cy.contains('Add to cart');

  }

  get quantityInput() {

    // Try multiple selectors for quantity input
    return cy.get('input[type="number"]').first();

  }

  get relatedProducts() {

    return cy.get('.card');

  }

  get cartQuantityBadge() {

    return cy.get('[data-test="cart-quantity"]');

  }

  visit(productId) {

    cy.visit('/product/' + productId, {
      failOnStatusCode: false
    });

    // Wait for page to load
    cy.get('body').should('exist');
    cy.wait(1000);

    return this;
  }

  setQuantity(amount) {

    // Wait for quantity input to be visible, then set value
    cy.get('input[type="number"]').first().should('be.visible').clear().type(amount);

  }

  addToCart() {

    this.addToCartButton.click();

  }

  shouldHaveQuantity(amount) {

    cy.get('input[type="number"]').first().should('have.value', amount);

  }

  shouldShowRelatedProducts() {

    this.relatedProducts
      .should('have.length.greaterThan', 0);

  }

}

export default new ProductPage();