/// <reference types="cypress" />


let productName;

describe('JWT Session', () => {
    it('Is logged in through local storage', async () => {

        cy.loginAPI().then(() => {
            cy.visit('https://rahulshettyacademy.com/client', {
                onBeforeLoad: function () {
                    window.localStorage.setItem('token', Cypress.env('token'));
                }
            });
        });

        cy.get('.card-body b').eq(1).then((elem) => {
            productName = elem.text();
        });
        cy.get('.card-body button:last-of-type').eq(1).click();
        cy.wait(2000);

        cy.get('[routerlink*="cart"]').click();
        cy.contains('button', 'Checkout').click();

        cy.get('[placeholder*="Country"]').type('ind');
        cy.wait(1000);

        cy.get('.ta-results button').each((elem) => {
            const text = elem.text();
            if (text.trim() === 'India') {
                cy.wrap(elem).click();
            }
        });

        cy.get('.action__submit').click();
        cy.wait(2000);

        cy.get('tr button').eq(1).click(); // click on Excel download button

        // checking position + text
        const filePath = Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_benjaminhozan.xlsx';
        cy.task('excelToJsonConverter', filePath).then((result) => {
            expect(productName).to.be.equal(result.data[1].B);
        });

        // will convert into buffer(binary data store temporary in space memory)
        // checks if 'productName' is included
        cy.readFile(filePath).then((text) => {
            expect(text).to.include(productName);
        });

    });
});