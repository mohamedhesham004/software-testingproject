import './commands';
import { setupApiMocks } from './api-mocks';

beforeEach(() => {
  // Setup API mocks to bypass 403 Forbidden errors
  setupApiMocks();
});

// ── Global afterEach hook ────────────────────────────────────────────────────
// Takes a screenshot automatically whenever any test fails
afterEach(function () {
  if (this.currentTest && this.currentTest.state === 'failed') {
    cy.screenshot(this.currentTest.title);
  }
});