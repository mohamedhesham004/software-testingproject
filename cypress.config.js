const { defineConfig } = require('cypress');

const createBundler =
require('@bahmutov/cypress-esbuild-preprocessor');

const addCucumberPreprocessorPlugin =
require('@badeball/cypress-cucumber-preprocessor')
.addCucumberPreprocessorPlugin;

const createEsbuildPlugin =
require('@badeball/cypress-cucumber-preprocessor/esbuild')
.createEsbuildPlugin;

module.exports = defineConfig({

  allowCypressEnv: true,

  e2e: {

    baseUrl: 'https://practicesoftwaretesting.com',

    specPattern: [
      'cypress/e2e/features/*/.feature'
    ],

    viewportWidth: 1280,
    viewportHeight: 720,

    userAgent:
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',

    chromeWebSecurity: false,

    experimentalModifyObstructiveThirdPartyCode: true,

    defaultCommandTimeout: 5000,
    requestTimeout: 5000,
    responseTimeout: 5000,

    video: false,
    screenshotOnRunFailure: false,
    numTestsKeptInMemory: 0,

    async setupNodeEvents(on, config) {

      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      on('before:browser:launch',
      (browser = {}, launchOptions) => {

        if (
          browser.family === 'chromium' &&
          browser.name !== 'electron'
        ) {

          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');

        }

        return launchOptions;

      });

      return config;
    },
  },
});