class ProductPage {

    //locators
    getProductsCards() {
        return cy.get('app-card')
    }

    getTotalPriceCounter() {
        return cy.get('a.nav-link.btn-primary')
    }

    getCheckoutButton(){
        return cy.contains('a','Checkout')
    }

    //actions
    selectOneProduct(oneProduct) {
        this.getProductsCards().filter(`:contains(${oneProduct})`).then(el => {
            cy.wrap(el).contains('button', 'Add').click()
        })
    }

    selectFewProducts(productArray) {
        this.getProductsCards().each(el => {
            const phoneName = el.find('.card-title').text()
            for(let i=0; i < productArray.length; i++){
                phoneName.includes(productArray[i]) ? cy.wrap(el).contains('button', 'Add').click() : true
            }
        })
    }

    checkout() {
        this.getCheckoutButton().click()
    }

    //assertions
    assertCartAmount() {
        this.getTotalPriceCounter().should('include.text', '4')
    }

}
export default ProductPage