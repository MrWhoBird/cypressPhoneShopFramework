/// <reference types="Cypress" />

import HomePage from '../support/pageObjects/HomePage'
import ProductPage from '../support/pageObjects/ProductPage'
import CartPage from '../support/pageObjects/CartPage'
const homepage = new HomePage()
const productpage = new ProductPage()
const cartpage = new CartPage()

describe('E2E test', function () {

    before(function () {
        cy.fixture('example').then(data => {
            this.inputData = data
        })
    })


    it('Initial e2e flow', function () {

        homepage.goTo(Cypress.env('url')+'/loginpagePractise/#')
        homepage.login(this.inputData.username, this.inputData.password)

        productpage.selectOneProduct()
        productpage.selectFewProducts(this.inputData.productOne, this.inputData.productTwo, this.inputData.productThree)
        productpage.assertCartAmount()
        productpage.checkout()

        cartpage.deleteOneProduct()
        cartpage.getPhonesPrices().then(totalPrice => {
            //movie expectation to this file from page object  
            cartpage.getSumOfCartPrices(totalPrice)
        })


        cy.contains('button', 'Checkout').click()
        cy.get('#country').type('pol')
        cy.wait(2000)
        cy.get('div .suggestions ul a').each(el => el.text() === "Poland" ? cy.wrap(el).click() : true)
        //cy.get('#autocomplete').should('have.value','India')

    })
})