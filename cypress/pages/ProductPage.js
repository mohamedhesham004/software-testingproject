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

    // For Angular form controls, we need to select all text first, then type
    cy.get('body').then(($body) => {
      if ($body.find('input[type="number"]').length > 0) {
        // Select all text first with Ctrl+A, then type to replace
        cy.get('input[type="number"]').first()
          .invoke('val', '')  // Clear the value directly
          .trigger('input')   // Trigger Angular change detection
          .type(amount);
      } 
      else if ($body.find('input[name*="quantity"], input[id*="quantity"]').length > 0) {
        cy.get('input[name*="quantity"], input[id*="quantity"]').first()
          .invoke('val', '')
          .trigger('input')
          .type(amount);
      }
      else {
        cy.contains(/quantity|qty/i).parent().find('input').first()
          .invoke('val', '')
          .trigger('input')
          .type(amount);
      }
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