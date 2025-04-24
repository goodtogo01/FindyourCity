import loginPage from '../pages/loginPage';
import homePage from '../pages/homePage';

describe('Login Page Scenarios - YourCity App', () => {

  beforeEach(() => {
    loginPage.visit();
  });

  it('SUCCESS LOGIN - should log in with valid credentials', () => {
    cy.fixture('loginData').then((data) => {
      const user = data.validUser;
      loginPage.getTitle().should('eq', 'Login | YourCity');
      loginPage.login(user.username, user.password);
      cy.title().should('eq', 'YourCity - City Finder');
 
    });
  });

  it('SUCCESS LOGOUT - should log out successfully', function() {
    cy.fixture('loginData').then((data) => {
      const user = data.validUser;
      loginPage.login(user.username, user.password);
      cy.title().should('eq', 'YourCity - City Finder');
      loginPage.clickLogout();
      cy.title().should('eq', 'Login | YourCity');
    });
  });

  it('FAILED LOGIN - should show error for all invalid credentials', () => {
    cy.fixture('loginData').then((data) => {
      const invalidUsers = data.invalidUsers;

      invalidUsers.forEach((user) => {
        loginPage.visit();
        loginPage.login(user.username, user.password);
        loginPage.getErrorMessage().should('contain', 'Invalid username or password!');
      });
    });
  });

  it('Validate Logged user and Displayed User name is matched', () => {
    cy.fixture('loginData').then((data) => {
      const user = data.validUser;
      const expectedUsername = user.username;

      loginPage.login(user.username, user.password);
      cy.title().should('eq', 'YourCity - City Finder');

      homePage.getLoggedInUsername().invoke('text').then((displayedUsername) => {
        expect(displayedUsername.trim()).to.eq(expectedUsername);
      });
    });
  });

});