class ProductPage {

  get heading() {

    return cy.get('h1', { timeout: 10000 });

  }

  get addToCartButton() {

    return cy.contains('Add to cart', { timeout: 10000 });

  }

  get quantityInput() {

    return cy.get('input[type="number"]', { timeout: 10000 }).first();

  }

  get relatedProducts() {

    return cy.get('.card', { timeout: 10000 });

  }

  get cartQuantityBadge() {

    return cy.get('[data-test="cart-quantity"]', { timeout: 10000 });

  }

  visit(productId) {

    cy.visit('/product/' + productId, {
      failOnStatusCode: false
    });

    // Wait for body to load
    cy.get('body', { timeout: 15000 }).should('be.visible');
    
    // Wait for product heading to appear
    cy.get('h1, h2, .product-title, [data-test*="product"]', { timeout: 15000 }).should('exist');
    
    // Wait for quantity input to be on page
    cy.get('input[type="number"], [data-test*="quantity"], #quantity, #quantity-input', { timeout: 15000 }).should('exist');

    return this;
  }

  setQuantity(amount) {

    // Wait for the input to be visible first, then set the value
    cy.get('input[type="number"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .then($input => {
        // Set the value directly via JavaScript
        $input.val(amount);
        
        // Trigger Angular change detection
        cy.wrap($input)
          .trigger('input')
          .trigger('change')
          .trigger('blur');
      });

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