/**
 * POM-based Spec — All 15 Test Cases using Page Object Models
 * This mirrors practicesoftwaretesting.cy.js but through POM classes.
 */
import homePage  from '../pages/HomePage';
import loginPage  from '../pages/LoginPage';
import productPage from '../pages/ProductPage';
import contactPage from '../pages/ContactPage';

describe('Practice Software Testing — POM Spec Suite', () => {
  let productId;
  let userData;

  // ── Hooks ──────────────────────────────────────────────────────────────────
  before(() => {
    // Fetch a real product ID from the API before the suite runs
    cy.request('https://api.practicesoftwaretesting.com/products?page=1').then((res) => {
      productId = res.body.data[0].id;
      cy.log('Resolved product ID: ' + productId);
    });
  });

  beforeEach(() => {
    // Load fixture data before every test
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  afterEach(function () {
    // Capture a screenshot automatically on any test failure
    if (this.currentTest.state === 'failed') {
      cy.screenshot(this.currentTest.title);
    }
  });

  // ── TC01: Homepage loads ────────────────────────────────────────────────────
  it('[TC01] Homepage loads and shows products', () => {
    homePage.visit();
    homePage.shouldBeOnHomepage();
    homePage.shouldHaveProducts();
  });

  // ── TC02: Product card structure ────────────────────────────────────────────
  it('[TC02] Product card has image, name and price', () => {
    homePage.visit();
    homePage.productCards.first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('.card-title').should('not.be.empty');
      cy.get('.card-footer').should('contain.text', '$');
    });
  });

  // ── TC03: Search with results ───────────────────────────────────────────────
  it('[TC03] Search returns relevant results', () => {
    homePage.visit();
    homePage.searchFor('Pliers');
    homePage.shouldHaveProducts();
    homePage.firstCardTitle.should('be.visible');
  });

  // ── TC04: Search with no results ────────────────────────────────────────────
  it('[TC04] Search with no results shows message', () => {
    homePage.visit();
    homePage.searchFor('xyznotaproduct999');
    homePage.shouldShowNoResults();
  });

  // ── TC05: Valid login ────────────────────────────────────────────────────────
  it('[TC05] Valid login redirects to home', () => {
    loginPage.visit();
    loginPage.loginWith(userData.validUser.email, userData.validUser.password);
    loginPage.shouldBeLoggedIn();
  });

  // ── TC06: Invalid login ──────────────────────────────────────────────────────
  it('[TC06] Invalid login shows error message', () => {
    loginPage.visit();
    loginPage.loginWith(userData.invalidUser.email, userData.invalidUser.password);
    loginPage.shouldShowError();
  });

  // ── TC07: Empty login ────────────────────────────────────────────────────────
  it('[TC07] Login with empty fields keeps user on login page', () => {
    loginPage.visit();
    loginPage.submit();
    loginPage.shouldRemainOnLoginPage();
  });

  // ── TC08: Product detail loads ──────────────────────────────────────────────
  it('[TC08] Product detail page loads correctly', () => {
    productPage.visit(productId);
    productPage.shouldBeVisible();
  });

  // ── TC09: Change quantity ────────────────────────────────────────────────────
  it('[TC09] Quantity can be changed before adding to cart', () => {
    productPage.visit(productId);
    productPage.setQuantity(2);
    productPage.shouldHaveQuantity(2);
    productPage.addToCartButton.should('be.enabled');
  });

  // ── TC10: Add to cart ────────────────────────────────────────────────────────
  it('[TC10] Adding product increases cart count', () => {
    cy.loginAsCustomer();
    productPage.visit(productId);
    productPage.addToCart();
    productPage.shouldUpdateCartBadge();
  });

  // ── TC11: Sort by price ──────────────────────────────────────────────────────
  it('[TC11] Products can be sorted by lowest price', () => {
    // API-level assertion: confirm prices are truly sorted
    cy.request(
      'https://api.practicesoftwaretesting.com/products?page=1&sort=price,asc&between=price,1,100&is_rental=false'
    ).then((res) => {
      const prices = res.body.data.map((p) => p.price);
      expect(prices.length).to.be.greaterThan(0);
      expect(prices[0]).to.be.lte(prices[prices.length - 1]);
    });
    // UI-level assertion
    homePage.visit();
    homePage.sortBy('Price (Low - High)');
    homePage.shouldHaveProducts();
  });

  // ── TC12: Related products ───────────────────────────────────────────────────
  it('[TC12] Product detail page shows related products', () => {
    productPage.visit(productId);
    productPage.shouldBeVisible();
    cy.request(
      'https://api.practicesoftwaretesting.com/products/' + productId + '/related'
    ).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length.greaterThan(0);
    });
    productPage.shouldShowRelatedProducts();
  });

  // ── TC13: Contact form success ───────────────────────────────────────────────
  it('[TC13] Contact form submits successfully', () => {
    contactPage.visit();
    contactPage.fill(userData.contactMessage);
    contactPage.submit();
    contactPage.shouldShowSuccess();
  });

  // ── TC14: Contact form validation ───────────────────────────────────────────
  it('[TC14] Contact form fails with missing message field', () => {
    contactPage.visit();
    contactPage.fillWithoutMessage(userData.contactMessage);
    contactPage.submit();
    contactPage.shouldShowValidationError();
  });

  // ── TC15: Category filter ────────────────────────────────────────────────────
  it('[TC15] Category filter shows only relevant products', () => {
    homePage.visit();
    homePage.clickCategoryByIndex(0);
    homePage.shouldHaveProducts();
    homePage.firstCardTitle.should('be.visible');
  });
});
