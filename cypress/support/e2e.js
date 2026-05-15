import './commands';

beforeEach(() => {
  cy.intercept('**', (req) => {
    req.headers['User-Agent'] = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
    req.headers['Accept-Language'] = 'en-US,en;q=0.9';
    req.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8';
    req.headers['Referer'] = 'https://www.google.com/';
  });
});

// ── Global afterEach hook ────────────────────────────────────────────────────
// Takes a screenshot automatically whenever any test fails
afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'failed') {
    cy.screenshot(this.currentTest.title);
  }
});