const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
   baseUrl: 'http://localhost:5500/yourcity/',
    setupNodeEvents(on, config) {
    require("cypress-mochawesome-reporter/plugin")(on);
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"
  },
  env: {
    login_username: "admin",
    login_password: "adm123",
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/html",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
});

//'http://127.0.0.1:5500/yourcity/',