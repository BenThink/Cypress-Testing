/// <reference types="cypress" />


describe('My Second Test Suite', () => {
    it('My Second Test Case', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

        cy.get('input.search-keyword').type('ca');
        cy.wait(2000);
        // parent child chaining
        cy.get('.products').as('productLocator');

        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text();
            if (textVeg.includes('Cashews')) {
                cy.wrap($el).find('button').click();
            }
        });

        cy.get('.cart-icon > img').click();
        cy.contains('PROCEED TO CHECKOUT').click();
        cy.contains('Place Order').click();
    });
});