// cypress/support/pageObjects/homePage.js
class HomePage {
    selectCountry(countryName) {
        cy.get('#country').select(countryName);
    }

    selectState(stateName) {
        cy.get('#state').select(stateName);
    }

    selectCity(cityName) {
        cy.get('#city').select(cityName);
    }

    getSelectedCityDescription() {
        return cy.get('#selected-city-description');
    }

    getLoginTimeElement() {
        return cy.get('#login-time'); // Make sure this ID is added in your HTML
    }

    getLoggedInUsername() {
        return cy.get('#username'); // Optional - if you want to validate user
    }

    verifyCityDescriptionVisible() {
        this.getSelectedCityDescription().should('be.visible');
    }
    verifyNewSearchButton(){
        cy.get('#new-search-btn').click()
    }
}

export default new HomePage();