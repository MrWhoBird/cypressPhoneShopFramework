/// <reference types="Cypress" />

import HomePage from '../support/pageObjects/HomePage'
import ProductPage from '../support/pageObjects/ProductPage'
import CartPage from '../support/pageObjects/CartPage'

const homepage = new HomePage()
const productpage = new ProductPage()
const cartpage = new CartPage()

describe('Full flow shopping', function () {

    before(function () {
        cy.fixture('data').then(datajson => {
            this.inputData = datajson
        })
    })

    it('Add products to cart and validate', function () {

        homepage.goTo(Cypress.env('url')+'/loginpagePractise/#')
        // homepage.typeUsername(this.inputData.username).should('have.value', this.inputData.username)
        homepage.typeUsername(this.inputData.username)
        homepage.typePassword(this.inputData.password)
        homepage.checkUserTypeCheckbox()
        cy.wait(500)
        homepage.fullLogin(this.inputData.username, this.inputData.password)
        //homepage.assertUsernameInput(this.inputData.username)
        homepage.getUsernameInput().should('have.value', this.inputData.username) 
        homepage.assertPasswordInput(this.inputData.password)
        homepage.assertUserTypeCheckbox()
        homepage.assertFormControl()
        homepage.assertTermsChecked()

        productpage.selectOneProduct(this.inputData.oneProduct)
        productpage.selectFewProducts(this.inputData.productArray)
        productpage.assertCartAmount()
        productpage.checkout()

        cartpage.deleteOneProduct()
        cartpage.getPhonesPrices().then(totalPrice => {
            //movie assertion to this file from page object  
            cartpage.getSumOfCartPrices(totalPrice)
        })

        cy.contains('button', 'Checkout').click()
        cy.get('#country').type('pol')
        cy.wait(2000)
        cy.get('div .suggestions ul a').each(el => el.text() === "Poland" ? cy.wrap(el).click() : true)
        //cy.get('#autocomplete').should('have.value','India')

    })
})