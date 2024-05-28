/// <reference types="cypress" />


describe('Handling Child Windows', () => {
    it('Should handle child window', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        cy.get('.table-display tr td:nth-child(2)').each((elem, index, list) => {
            const text = elem.text();

            if (text.includes('Python')) {
                // ----- Different ways to check -----


                // with .then() for resolving the promis cus .text() isn't a Cypress method
                cy.get('.table-display tr td:nth-child(2)').eq(index).next().then((price) => {
                    // cypress method / exact match
                    cy.wrap(price).should('have.text', '25');

                    const priceText = price.text(); // jQuery
                    expect(priceText).to.be.equal('25'); // Chai method
                });


                // ----- New Cypress way of handling promises / cy.wrap() -----

                // checks if 'text' is equal to '25' / exact matching text
                cy.wrap(elem).next().should('have.text', '25');
                expect(elem.next().text()).to.be.equal('25'); // Chai

                // the rest checks if 'text' also contains '25'
                cy.wrap(elem).next().should('contain.text', '25');
                cy.wrap(elem).next().should('contain', '25');
                cy.wrap(elem).next().should('include.text', '25');
            }
        });




    });
});