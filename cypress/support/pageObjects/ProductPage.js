class ProductPage{

    selectOneProduct(){
        cy.get('app-card').filter(`:contains("Blackberry")`).then( el => cy.wrap(el).contains('button', 'Add').click())
    }

    selectFewProducts(productOne, productTwo, productThree){
        cy.get('app-card').each( el => {
            const phoneName = el.find('.card-title').text()
            phoneName.includes(productOne) || 
            phoneName.includes(productTwo) || 
            phoneName.includes(productThree) ? 
            cy.wrap(el).contains('button', 'Add').click() : 
            true
        })
    }

    assertCartAmount(){
        cy.get('a.nav-link.btn-primary').should('include.text', '4')
    }

    checkout(){
        cy.contains('a','Checkout').click()
    }

}
export default ProductPage