describe("Practice Software Testing - Full Test Suite", () => {
  let productId;
  let contact;

  before(() => {
    cy.request("https://api.practicesoftwaretesting.com/products?page=1")
      .then((response) => {
        productId = response.body.data[0].id;
        cy.log("Using product ID: " + productId);
      });

    cy.fixture("userData").then((data) => {
      contact = data.contactMessage;
    });
  });

  // ── HOME PAGE ──────────────────────────────────────
  it("[TC01] Homepage loads and shows products", () => {
    cy.visit("/");
    cy.url().should("include", "practicesoftwaretesting");
    cy.get(".card").should("have.length.greaterThan", 0);
    cy.title().should("not.be.empty");
  });

  it("[TC02] Product card has image, name and price", () => {
    cy.visit("/");
    cy.get(".card").first().within(() => {
      cy.get("img").should("be.visible");
      cy.get(".card-title").should("not.be.empty");
      cy.get(".card-footer").should("contain.text", "$");
    });
  });

  // ── SEARCH ────────────────────────────────────────
  it("[TC03] Search returns relevant results", () => {
    cy.visit("/");
    cy.get('[data-test="search-query"]').clear().type("Pliers");
    cy.get('[data-test="search-submit"]').click();
    cy.get(".card").should("have.length.greaterThan", 0);
    cy.get(".card-title").first().should("be.visible");
  });

  it("[TC04] Search with no results shows message", () => {
    cy.visit("/");
    cy.get('[data-test="search-query"]').clear().type("xyznotaproduct999");
    cy.get('[data-test="search-submit"]').click();
    cy.get(".card").should("have.length", 0);
    cy.contains(/no results|There are no products/i).should("be.visible");
  });

  // ── LOGIN ─────────────────────────────────────────
  it("[TC05] Valid login redirects to home", () => {
    cy.visit("/auth/login");
    cy.get('[data-test="email"]').type("customer@practicesoftwaretesting.com");
    cy.get('[data-test="password"]').type("welcome01");
    cy.get('[data-test="login-submit"]').click();
    cy.wait(4000);
    cy.get("nav").should("be.visible");
    cy.get('[data-test="login-submit"]').should("not.exist", { timeout: 10000 });
  });

  it("[TC06] Invalid login shows error message", () => {
    cy.visit("/auth/login");
    cy.get('[data-test="email"]').type("wrong@email.com");
    cy.get('[data-test="password"]').type("wrongpass");
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="login-error"]').should("be.visible");
    cy.url().should("include", "login");
  });

  it("[TC07] Login with empty fields shows validation", () => {
    cy.visit("/auth/login");
    cy.get('[data-test="login-submit"]').click();
    cy.get('[data-test="email"]').should("be.visible");
    cy.get('[data-test="password"]').should("be.visible");
    cy.url().should("include", "login");
  });

  // ── PRODUCT DETAIL ────────────────────────────────
  it("[TC08] Product detail page loads correctly", () => {
    cy.visit("/product/" + productId);
    cy.get("h1, h2").should("be.visible");
    cy.get('[data-test="add-to-cart"]').should("be.visible");
    cy.get('[data-test="add-to-cart"]').should("be.enabled");
  });

  it("[TC09] Quantity can be changed before adding to cart", () => {
    cy.visit("/product/" + productId);
    cy.get('[data-test="quantity"]').should("be.visible").type("{selectall}2");
    cy.get('[data-test="quantity"]').should("have.value", "2");
    cy.get('[data-test="add-to-cart"]').should("be.enabled");
  });

  // ── CART ──────────────────────────────────────────
  it("[TC10] Adding product increases cart count", () => {
    cy.loginAsCustomer();
    cy.visit("/product/" + productId);
    cy.intercept("POST", "**/carts").as("addToCart");
    cy.get('[data-test="add-to-cart"]').should("be.visible").should("be.enabled").click();
    cy.wait("@addToCart", { timeout: 10000 });
    cy.get('[data-test="cart-quantity"]').should("be.visible");
    cy.get('[data-test="cart-quantity"]').invoke("text").should("not.eq", "0");
  });

  // ── TC11: Sort by price via API ───────────────────
  it("[TC11] Products can be sorted by lowest price", () => {
    cy.request(
      "https://api.practicesoftwaretesting.com/products?page=1&sort=price,asc&between=price,1,100&is_rental=false"
    ).then((res) => {
      const prices = res.body.data.map((p) => p.price);
      expect(prices.length).to.be.greaterThan(0);
      expect(prices[0]).to.be.lte(prices[prices.length - 1]);
      cy.log("First price: " + prices[0] + " Last price: " + prices[prices.length - 1]);
    });
    // also verify UI shows sort dropdown and cards
    cy.visit("/");
    cy.get('[data-test="sort"]').should("be.visible");
    cy.get('[data-test="sort"]').select("Price (Low - High)");
    cy.get(".card").should("have.length.greaterThan", 0);
  });

  // ── TC12: Related products on product page ────────
  it("[TC12] Product detail page shows related products", () => {
    cy.visit("/product/" + productId);
    cy.get("h1, h2").should("be.visible");
    cy.get('[data-test="add-to-cart"]').should("be.visible");
    cy.request(
      "https://api.practicesoftwaretesting.com/products/" + productId + "/related"
    ).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.length.greaterThan(0);
      cy.log("Related products count: " + res.body.length);
    });
    cy.get(".card").should("have.length.greaterThan", 0);
  });

  // ── CONTACT PAGE ──────────────────────────────────
  it("[TC13] Contact form submits successfully", () => {
    cy.visit("/contact");
    cy.fillContactForm(contact);
    cy.get('[data-test="contact-submit"]').click();
    cy.contains("Thanks for your message").should("be.visible");
  });

  it("[TC14] Contact form fails with missing message field", () => {
    cy.visit("/contact");
    cy.get('[data-test="first-name"]').type("John");
    cy.get('[data-test="last-name"]').type("Doe");
    cy.get('[data-test="email"]').type("john@test.com");
    cy.get('[data-test="subject"]').select("Customer service");
    cy.get('[data-test="contact-submit"]').click();
    cy.get(".alert-danger").should("be.visible");
    cy.get('[data-test="message"]').should("be.visible");
  });

  // ── CATEGORY FILTER ───────────────────────────────
  it("[TC15] Category filter shows only relevant products", () => {
    cy.visit("/");
    cy.get("a.nav-link, .category-link, [data-test*='category']")
      .first()
      .click({ force: true });
    cy.get(".card").should("have.length.greaterThan", 0);
    cy.get(".card-title").first().should("be.visible");
  });
});

