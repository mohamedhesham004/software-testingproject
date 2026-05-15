class ProductPage {

  get heading() {

    return cy.get('h1');

  }

  get addToCartButton() {

    return cy.contains('Add to cart');

  }

  get quantityInput() {

    return cy.get('#quantity');

  }

  get relatedProducts() {

    return cy.get('.card');

  }

  get cartQuantityBadge() {

    return cy.get('[data-test="cart-quantity"]');

  }

  visit(productId) {

    cy.visit('/product/' + productId);

    return this;
  }

  setQuantity(amount) {

    this.quantityInput
      .clear()
      .type(amount);

  }

  addToCart() {

    this.addToCartButton.click();

  }

  shouldHaveQuantity(amount) {

    this.quantityInput
      .should('have.value', amount);

  }

  shouldShowRelatedProducts() {

    this.relatedProducts
      .should('have.length.greaterThan', 0);

  }

}

export default new ProductPage();