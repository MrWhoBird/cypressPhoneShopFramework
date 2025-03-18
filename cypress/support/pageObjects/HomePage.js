/// <reference types="Cypress" />

class HomePage {

    //locators
    getUsernameInput() {
        return cy.get('input#username')
    }

    getPasswordInput() {
        return cy.get('input#password')
    }

    getUserTypeCheckbox() {
        return cy.get('input#usertype')
    }

    getAlertCancelButton() {
        return cy.get('button#cancelBtn')
    }

    getFormControl() {
        return cy.get('select.form-control')
    }

    getInputTerms() {
        return cy.get('input#terms')
    }

    getLoginButton() {
        return cy.get('input#signInBtn')
    }
    
    //actions
    goTo(url) {
        cy.visit(url)
    }

    typeUsername(username){
        this.getUsernameInput().type(username)
    }

    typePassword(password){
        this.getPasswordInput().type(password)
    }

    checkUserTypeCheckbox(){
        this.getUserTypeCheckbox().check()
    }
    fullLogin() {
        this.getAlertCancelButton().click()
        this.getFormControl().select('teach')
        this.getInputTerms().check()
        this.getLoginButton().click()
    }

    assertions
    assertUsernameInput(username) {
        this.getUsernameInput().should('have.value', username) 
    }

    assertPasswordInput(password) {
        this.getPasswordInput().should('have.value', password)
    }

    assertUserTypeCheckbox() {
        this.getUserTypeCheckbox().should('be.checked')
    }

    assertFormControl() {
        cy.get('select.form-control').should('have.value', 'teach')
    }

    assertTermsChecked() {
        this.getInputTerms().should('be.checked')
    }

}
export default HomePage