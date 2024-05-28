/// <reference types="cypress" />
/// <reference types="cypress-iframe"/>
import 'cypress-iframe';


describe('Handling iFrames', () => {
    it('Should handle iFrames', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        // loaded the iframe
        cy.frameLoaded('#courses-iframe');
        cy.wait(2000);

        // working within iframe
        cy.iframe().find('a[href*="mentorship"]').eq(0).click();
        cy.wait(2000);
        cy.iframe().find('h1[class*="pricing-title"]').should('have.length', 2);


    });
});