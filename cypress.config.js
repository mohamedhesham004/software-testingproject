const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const {
  addCucumberPreprocessorPlugin,
} = require('@badeball/cypress-cucumber-preprocessor');
const {
  createEsbuildPlugin,
} = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practicesoftwaretesting.com',
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/features/**/*.feature',
    ],
    viewportWidth: 1280,
    viewportHeight: 720,
    async setupNodeEvents(on, config) {
      // Required for Cucumber preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // IMPORTANT: return config so cucumber can write its own config
      return config;
    },
  },
});