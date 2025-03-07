/// <reference types="Cypress" />

class HomePage{
    
    goTo(url){
        cy.visit(url)
    }

    login(username, password){
        cy.get('input#username').type(username).should('have.value', 'rahulshettyacademy')
        cy.get('input#password').type(password).should('have.value', 'learning')
        cy.get('input#usertype').check().should('be.checked')
        cy.wait(500)
        cy.get('button#cancelBtn').click()
        cy.get('select.form-control').select('teach').should('have.value','teach')
        cy.get('input#terms').check().should('be.checked')
        cy.get('input#signInBtn').click()
    }

}
export default HomePage