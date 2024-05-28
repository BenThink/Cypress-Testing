/// <reference types="cypress" />


describe('My First Test Suite', () => {
    it('My First Test Case', () => {

        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');

        cy.get('input.search-keyword').type('ca');
        cy.wait(2000);

        cy.get('.product:visible').should('have.length', 4);
        // parent child chaining
        cy.get('.products').as('productLocator');

        cy.get('@productLocator').find('.product').should('have.length', 4);
        cy.get('@productLocator').find('.product').eq(1).contains('ADD TO CART').click().then(() => {
            console.log('blah');
        });

        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text();
            if (textVeg.includes('Cashews')) {
                cy.wrap($el).find('button').click();
            }
        });

        // assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART');

        // this will print the text in log
        cy.get('.brand').then((logoElement) => {
            cy.log(logoElement.text());

        });

        // will return a chainable object, not the element itself
        const logo = cy.get('.brand');
        cy.log(logo);
    });
});