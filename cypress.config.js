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

    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 5000,
    requestTimeout: 5000,
    responseTimeout: 5000,
    video: false,
    screenshotOnRunFailure: false,
    numTestsKeptInMemory: 0,
    allowCypressEnv: true,
    failOnStatusCode: false,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true,

    async setupNodeEvents(on, config) {

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-extensions');
          launchOptions.args.push('--disable-plugins');
        }
        if (browser.name === 'electron') {
          launchOptions.args.push('--disable-gpu');
        }
        return launchOptions;
      });

      return config;
    },
  },
});