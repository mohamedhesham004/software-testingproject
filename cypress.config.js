const { defineConfig } = require("cypress");

const createBundler =
require("@bahmutov/cypress-esbuild-preprocessor");

const addCucumberPreprocessorPlugin =
require("@badeball/cypress-cucumber-preprocessor")
.addCucumberPreprocessorPlugin;

const createEsbuildPlugin =
require("@badeball/cypress-cucumber-preprocessor/esbuild")
.createEsbuildPlugin;

module.exports = defineConfig({

  e2e: {

    baseUrl: "https://practicesoftwaretesting.com",

    specPattern:
    "cypress/e2e/features/**/*.feature",

    // Global timeout settings for CI/CD environments
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Allow page loads with 403 errors (website sometimes returns this)
    failOnStatusCode: false,

    async setupNodeEvents(on, config) {

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },
});