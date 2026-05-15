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

    // Wait for page to load with better timeout
    cy.get('body', { timeout: 10000 }).should('exist');
    
    // Wait for heading to appear
    cy.get('h1, h2', { timeout: 8000 }).should('exist');
    
    // Additional wait for dynamic content
    cy.wait(2000);

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