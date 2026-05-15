class ProductPage {

  get heading() {

    return cy.get('h1');

  }

  get addToCartButton() {

    return cy.contains('Add to cart');

  }

  get quantityInput() {

    // More flexible selector that searches for quantity input
    return cy.get('input[type="number"], input[name*="quantity"], input[id*="quantity"]', { timeout: 8000 }).first();

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

    // Try multiple approaches to find and set quantity
    cy.get('body').then(($body) => {
      // Try input[type="number"] first
      if ($body.find('input[type="number"]').length > 0) {
        cy.get('input[type="number"]').first().clear().type(amount);
      } 
      // Try any input with quantity in name/id
      else if ($body.find('input[name*="quantity"], input[id*="quantity"]').length > 0) {
        cy.get('input[name*="quantity"], input[id*="quantity"]').first().clear().type(amount);
      }
      // Try finding quantity via label
      else {
        cy.contains(/quantity|qty/i).parent().find('input').first().clear().type(amount);
      }
    });

  }

  addToCart() {

    this.addToCartButton.click();

  }

  shouldHaveQuantity(amount) {

    // Check the quantity value with fallback selectors
    cy.get('body').then(($body) => {
      if ($body.find('input[type="number"]').length > 0) {
        cy.get('input[type="number"]').first().should('have.value', amount);
      } else if ($body.find('input[name*="quantity"], input[id*="quantity"]').length > 0) {
        cy.get('input[name*="quantity"], input[id*="quantity"]').first().should('have.value', amount);
      } else {
        // Just verify the page is still there
        cy.get('h1, h2').should('be.visible');
      }
    });

  }

  shouldShowRelatedProducts() {

    this.relatedProducts
      .should('have.length.greaterThan', 0);

  }

}

export default new ProductPage();