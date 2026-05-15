class ProductPage {

  get heading() {

    return cy.get('h1');

  }

  get addToCartButton() {

    return cy.contains('Add to cart');

  }

  get quantityInput() {

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

    // Wait for page to load with better timeout
    cy.get('body', { timeout: 10000 }).should('exist');
    
    // Wait for heading to appear
    cy.get('h1, h2', { timeout: 8000 }).should('exist');
    
    // Additional wait for dynamic content
    cy.wait(2000);

    return this;
  }

  setQuantity(amount) {

    // For Angular number inputs, manually clear by selecting all with keyboard and deleting
    cy.get('input[type="number"]').first()
      .focus()
      .type('{ctrl+a}')  // Select all with Ctrl+A
      .type('{backspace}')  // Delete selected text
      .type(amount);

  }

  addToCart() {

    this.addToCartButton.click();

  }

  shouldHaveQuantity(amount) {

    // Check the quantity value - use the same selector as setQuantity
    cy.get('input[type="number"]').first().should('have.value', amount);

  }

  shouldShowRelatedProducts() {

    this.relatedProducts
      .should('have.length.greaterThan', 0);

  }

}

export default new ProductPage();