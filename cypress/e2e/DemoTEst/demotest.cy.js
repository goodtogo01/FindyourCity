// ///<reference types="cypress"/>
describe('load website', ()=>{
    it('Login', ()=>{
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('#username').type('admin')
        cy.get('#password').type('adm123');
        cy.get('.login-btn').click();
    })
    it('Logout', ()=>{
        cy.visit('http://127.0.0.1:5500/login.html')
        cy.get('#username').type('admin')
        cy.get('#password').type('adm123');
        cy.get('.login-btn').click();
        cy.get('.logout-button').click();
        cy.title().should('eq','Login | YourCity');
    })
    
})

