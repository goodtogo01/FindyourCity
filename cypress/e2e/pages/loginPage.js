class LoginPage {
  visit() {
    cy.visit('/login.html');
    //cy.visit('/Users/khosruzzaman/CYPRESS-WORKS/Cypress-yourCity/yourcity/login.html')
  }

  getTitle() {
    return cy.title();
  }

  enterUsername(username) {
    const input = cy.get('#username').clear();
    if (username) {
      input.type(username);
    }
  }
  
  enterPassword(password) {
    const input = cy.get('#password').clear();
    if (password) {
      input.type(password);
    }
  }

  clickLogin() {
    cy.get('.login-btn').click();
  }

  clickLogout() {
    cy.get('.logout-button').click();
  }

  getErrorMessage() {
    return cy.get('#error-message');
  }

  // ✅ Add this method for cleaner test scripts
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }
}

export default new LoginPage();