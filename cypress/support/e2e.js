import './commands'

// Help bypass bot detection by forcing real browser headers on every request
beforeEach(() => {
  cy.intercept('**', (req) => {
    req.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36';
    req.headers['Accept-Language'] = 'en-US,en;q=0.9';
    req.headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8';
  });
});;

// ── Global afterEach hook ────────────────────────────────────────────────────
// Takes a screenshot automatically whenever any test fails
afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'failed') {
    cy.screenshot(this.currentTest.title);
  }
});