// cypress/e2e/tests/homePageTest.cy.js
import loginPage from '../pages/loginPage';
import homePage from '../pages/homePage';

describe('YourCity Dropdown Functionality - Data Driven Test with Login', () => {

  // Test case 1: Login as Admin and select United States -> California -> Los Angeles
  it('Should login as Admin and verify United States -> California -> Los Angeles dropdown functionality', function () {
    // Load login data and dropdown data
    cy.fixture('loginData').then((loginData) => {
      cy.fixture('dropdownData').then((dropdownData) => {
        const user = loginData.validUser; // Admin user credentials
        const data = dropdownData.dropdownData[0]; // United States -> California -> Los Angeles

        // Log in with Admin credentials
        loginPage.visit();
        loginPage.enterUsername(user.username);
        loginPage.enterPassword(user.password);
        loginPage.clickLogin();

        cy.title().should('eq', 'YourCity - City Finder'); // Verify login success

        // Select dropdown values and verify city description
        homePage.selectCountry(data.country);
        homePage.selectState(data.state);
        homePage.selectCity(data.city);

        homePage.verifyCityDescriptionVisible();
        homePage.getSelectedCityDescription().should('contain', data.cityDescription);

        // Logout after the test
        loginPage.clickLogout();
      });
    });
  });

  // Test case 2: Invalid Login with wrong credentials and verify error message
  it('Should show error message for invalid credentials', function () {
    cy.fixture('loginData').then((loginData) => {
      const invalidUser = loginData.invalidUsers[0]; // Invalid user credentials (wrong username)

      // Try to login with invalid credentials
      loginPage.visit();
      loginPage.enterUsername(invalidUser.username);
      loginPage.enterPassword(invalidUser.password);
      loginPage.clickLogin();

      // Verify that error message is displayed
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Invalid username or password!');
    });
  });

  // Test case 3: Invalid Login with wrong password and verify error message
  it('Should show error message for invalid password', function () {
    cy.fixture('loginData').then((loginData) => {
      const invalidUser = loginData.invalidUsers[1]; // Invalid user credentials (wrong password)

      // Try to login with invalid credentials
      loginPage.visit();
      loginPage.enterUsername(invalidUser.username);
      loginPage.enterPassword(invalidUser.password);
      loginPage.clickLogin();

      // Verify that error message is displayed
      loginPage.getErrorMessage().should('be.visible').and('contain', 'Invalid username or password!');
    });
  });

  // Test case 4: Login as Manager and select Canada -> Ontario -> Toronto
  it('Should login as Manager and verify Canada -> Ontario -> Toronto dropdown functionality', function () {
    cy.fixture('loginData').then((loginData) => {
      cy.fixture('dropdownData').then((dropdownData) => {
        const user = loginData.validUser; // Manager user credentials
        const data = dropdownData.dropdownData[1]; // Canada -> Ontario -> Toronto

        // Log in with Manager credentials
        loginPage.visit();
        loginPage.enterUsername(user.username);
        loginPage.enterPassword(user.password);
        loginPage.clickLogin();

        cy.title().should('eq', 'YourCity - City Finder'); // Verify login success

        // Select dropdown values and verify city description
        homePage.selectCountry(data.country);
        homePage.selectState(data.state);
        homePage.selectCity(data.city);

        homePage.verifyCityDescriptionVisible();
        homePage.getSelectedCityDescription().should('contain', data.cityDescription);

        // Logout after the test
        loginPage.clickLogout();
      });
    });
  });

  // Test case 5: Login as Guest and select Australia -> New South Wales -> Sydney
  it('Should login as Guest and verify Australia -> New South Wales -> Sydney dropdown functionality', function () {
    cy.fixture('loginData').then((loginData) => {
      cy.fixture('dropdownData').then((dropdownData) => {
        const user = loginData.validUser; // Guest user credentials
        const data = dropdownData.dropdownData[2]; // Australia -> New South Wales -> Sydney

        // Log in with Guest credentials
        loginPage.visit();
        loginPage.enterUsername(user.username);
        loginPage.enterPassword(user.password);
        loginPage.clickLogin();

        cy.title().should('eq', 'YourCity - City Finder'); // Verify login success

        // Select dropdown values and verify city description
        homePage.selectCountry(data.country);
        homePage.selectState(data.state);
        homePage.selectCity(data.city);

        homePage.verifyCityDescriptionVisible();
        homePage.getSelectedCityDescription().should('contain', data.cityDescription);

        // Logout after the test
        loginPage.clickLogout();
      });
    });
  });

  // Validate Logged user and Displayed User name is matched
  it('Validate Logged user and Displayed User name is matched', () => {
    cy.fixture('loginData').then((loginData) => {
      const user = loginData.validUser;
      const actualUser = loginData.validUser.username; // Actual username

      // Login with valid credentials
      loginPage.visit();
      loginPage.enterUsername(user.username);
      loginPage.enterPassword(user.password);
      loginPage.clickLogin();

      cy.title().should('eq', 'YourCity - City Finder');

      // Validate displayed username
      homePage.getLoggedInUsername().invoke('text').then((text) => {
        expect(text.trim()).to.eq(actualUser);
      });
    });
  });

  // Should match displayed login time with the time saved in localStorage
  it('Should match displayed login time with the time saved in localStorage', () => {
    cy.fixture('loginData').then((loginData) => {
      const user = loginData.validUser;

      // Log in with valid credentials
      loginPage.visit();
      loginPage.enterUsername(user.username);
      loginPage.enterPassword(user.password);
      loginPage.clickLogin();

      cy.title().should('eq', 'YourCity - City Finder');

      // Get login time from localStorage and compare
      cy.window().then((win) => {
        const storedLoginTime = win.localStorage.getItem('loginTime');

        homePage.getLoginTimeElement().invoke('text').then((actualLoginTime) => {
          expect(actualLoginTime.trim()).to.eq(storedLoginTime);
        });
      });
    });
  });

  // New Search Button test
  it('Should not display City details after click on new-search button', () => {
    cy.fixture('loginData').then((loginData) => {
      cy.fixture('dropdownData').then((dropdownData) => {
        const user = loginData.validUser;
        const data = dropdownData.dropdownData[2]; // Australia -> New South Wales -> Sydney

        // Log in with valid credentials
        loginPage.visit();
        loginPage.enterUsername(user.username);
        loginPage.enterPassword(user.password);
        loginPage.clickLogin();

        cy.title().should('eq', 'YourCity - City Finder'); // Verify login success

        // Select dropdown values and verify city description
        homePage.selectCountry(data.country);
        homePage.selectState(data.state);
        homePage.selectCity(data.city);

        homePage.verifyCityDescriptionVisible();
        homePage.getSelectedCityDescription().should('contain', data.cityDescription);

        // Click on new-search button and verify no city details are shown
        cy.wait(5000);
        homePage.verifyNewSearchButton();
        homePage.getSelectedCityDescription().should('not.contain.text');
        cy.wait(5000);

        // Logout after the test
        loginPage.clickLogout();
      });
    });
  });

});