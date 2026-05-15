import './commands';

// ── Global afterEach hook ────────────────────────────────────────────────────
// Takes a screenshot automatically whenever any test fails
afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'failed') {
    cy.screenshot(this.currentTest.title);
  }
});