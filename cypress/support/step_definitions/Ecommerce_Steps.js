/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from '../../support/pageObjects/HomePage_PO.js';
import ProductPage from '../../support/pageObjects/ProductPage_PO.js';


const homePage = new HomePage();
const productPage = new ProductPage();

let name; // variable for dataTable
let gender; // variable for dataTable


Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env('url') + '/angularpractice/'); // setting environmental variables & using it
});


When('I add items to Cart', function () {
    homePage.getShopTab().click();

    this.data.productName.forEach((elem) => {
        cy.selectProduct(elem);
    });

    productPage.getCheckoutButton().click();
});


When('Validate the total prices', () => {
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
});


Then('Select the country, submit and verify Thank You message', () => {
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

// ------------------- // ------------------- //

When('I fill the form details', function (dataTable) { // we don't take data from hook, but from param. data inside '.feature'
    name = dataTable.rawTable[1][0];
    gender = dataTable.rawTable[1][1];

    homePage.getName().type(name);
    homePage.getGender().select(gender);
});


When('Validate the form behavior', function () {
    homePage.getTwoWayDataBinding().should('have.value', name);
    homePage.getName().should('have.attr', 'minlength', '2');
    homePage.getEntrepreneur().should('be.disabled');
    Cypress.config('defaultCommandTimeout', 8000); // changing wait time for this 'it' test only
});


Then('Select the shop page', () => {
    homePage.getShopTab().click();
});
