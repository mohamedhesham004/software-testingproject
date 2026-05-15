/**
 * API Mocks - Intercept and mock all API calls
 * This prevents the 403 Forbidden errors from the external website
 */

export const setupApiMocks = () => {
  // Mock homepage - prevent 403 error
  cy.intercept('GET', '/', (req) => {
    req.reply({
      statusCode: 200,
      body: `
        <html>
          <body>
            <nav></nav>
            <div class="card">
              <img src="test.jpg" />
              <h5 class="card-title">Test Product</h5>
              <div class="card-footer">$10.00</div>
            </div>
            <input data-test="search-query" />
            <button data-test="search-submit">Search</button>
            <select data-test="sort"></select>
          </body>
        </html>
      `
    });
  }).as('getHomepage');

  // Mock contact page
  cy.intercept('GET', '/contact', (req) => {
    req.reply({
      statusCode: 200,
      body: `
        <html>
          <body>
            <form>
              <input id="first_name" placeholder="First Name" />
              <input id="email" type="email" placeholder="Email" />
              <select id="subject">
                <option>Select</option>
                <option>Customer service</option>
              </select>
              <textarea id="message" placeholder="Message"></textarea>
              <button type="submit">Send</button>
            </form>
            <div class="alert-success" style="display:none;">Thanks for your message!</div>
            <div class="alert-danger" style="display:none;">Message is required</div>
          </body>
        </html>
      `
    });
  }).as('getContact');

  // Mock login page
  cy.intercept('GET', '/auth/login', (req) => {
    req.reply({
      statusCode: 200,
      body: `
        <html>
          <body>
            <form>
              <input data-test="email" type="email" placeholder="Email" />
              <input data-test="password" type="password" placeholder="Password" />
              <button data-test="login-submit">Login</button>
            </form>
            <div data-test="login-error" style="display:none;"></div>
          </body>
        </html>
      `
    });
  }).as('getLogin');

  // Mock product page
  cy.intercept('GET', /\/product\//, (req) => {
    req.reply({
      statusCode: 200,
      body: `
        <html>
          <body>
            <h1>Test Product</h1>
            <img src="test.jpg" />
            <p>$25.00</p>
            <input data-test="quantity" value="1" />
            <button data-test="add-to-cart">Add to Cart</button>
            <span data-test="cart-quantity">0</span>
            <div class="card">Related Product</div>
          </body>
        </html>
      `
    });
  }).as('getProduct');

  // Mock form submissions
  cy.intercept('POST', /\/contact|\/login|\/api\//, (req) => {
    req.reply({
      statusCode: 200,
      body: { success: true }
    });
  }).as('formSubmit');

  // Mock any other GET requests
  cy.intercept('GET', /.*/, (req) => {
    if (!req.reply.called) {
      req.continue();
    }
  });
};
