class CartPage {

    deleteOneProduct() {
        cy.get('tr td:nth-child(1)').each((el, index) => {
            const phoneName = el.find('.media-heading').text()
            phoneName.includes('Nokia') ?
                cy.get('tr td:nth-child(5)').eq(index).then(el => cy.wrap(el).contains('button', 'Remove')).click() :
                true
        })
    }

    getPhonesPrices() {
        let totalPrice = 0
        return cy.get('tr td:nth-child(4)').filter(':contains("₹")').each(el => {
            const price = parseInt(el.text().slice(3))
            totalPrice = totalPrice + price
        }).then(() => {
            return totalPrice
        })
    }

    getSumOfCartPrices(totalPrice) {
        cy.get('.text-right h3 strong').then(el => {
            const textRight = parseInt(el.text().slice(3))
            expect(totalPrice).to.be.equal(textRight)
        })
    }

}
export default CartPage