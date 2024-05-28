/// <reference types="cypress" />
import neatCSV from 'neat-csv';


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

        cy.contains('button', 'CSV').click(); // click on CSV download button

        // will convert into buffer(binary data stored temporary in space memory)
        cy.readFile(Cypress.config('fileServerFolder') + '/cypress/downloads/order-invoice_benjaminhozan.csv').then(async (text) => {
            const csv = await neatCSV(text); // converts into array of objects
            const actualProductCSV = csv[0]['Product Name'];

            expect(actualProductCSV).to.be.equal(productName);
        });
    });
});