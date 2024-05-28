/// <reference types="cypress" />
import HomePage from '../pageObjects/HomePage.js';
import ProductPage from '../pageObjects/ProductPage.js';


describe('Framework', () => {
    before(function () {
        cy.fixture('example').then((data) => {
            this.data = data;
        });
    });

    it('Framework steps', function () {
        const homePage = new HomePage();
        const productPage = new ProductPage();

        cy.visit(Cypress.env('url') + '/angularpractice/'); // setting environmental variables & using it

        homePage.getName().type(this.data.name);
        homePage.getGender().select(this.data.gender);

        homePage.getTwoWayDataBinding().should('have.value', this.data.name);
        homePage.getName().should('have.attr', 'minlength', '2');
        homePage.getEntrepreneur().should('be.disabled');
        Cypress.config('defaultCommandTimeout', 8000); // changing wait time for this 'it' test only

        // cy.pause(); // for debugging purpose

        homePage.getShopTab().click();

        this.data.productName.forEach((elem) => {
            cy.selectProduct(elem);
        });

        productPage.getCheckoutButton().click();

        let sumPrice = 0;
        cy.get('tr td:nth-child(4) strong').each((elem) => {
            const priceText = elem.text();

            // split - returns an array with new separated values
            let priceTotal = priceText.split(' '); // using 'space' pattern to separate '$' from '$ 500'
            priceTotal = priceTotal[1].trim(); // [1] = 500 /  trim() - removes any 'spaces'
            sumPrice += Number(priceTotal);

        }).then(() => {
            cy.log(sumPrice);
        });

        cy.get('h3 strong').then((elem) => {
            const totalPriceText = elem.text();

            let totalPrice = totalPriceText.split(' ');
            totalPrice = totalPrice[1].trim();

            expect(Number(totalPrice)).to.be.equal(sumPrice);
        });

        cy.contains("Checkout").click();

        cy.get('#country').type('India');
        cy.get('.suggestions a').click();

        cy.get('#checkbox2').click({ force: true });
        cy.get('[type="submit"]').click();

        // cy.get('div.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).');
        cy.get('div.alert').then((elem) => {
            const text = elem.text();
            expect(text.includes('Success!')).to.be.true;
        });








    });
});
