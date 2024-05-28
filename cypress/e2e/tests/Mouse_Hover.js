/// <reference types="cypress" />


describe('Handling Child Windows', () => {
    it('Should handle child window', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        // force click when are hidden elements
        cy.contains('Top').click({ force: true });
        cy.url().should('include', 'top');

        // with mouse-hover fct
        cy.get('.mouse-hover-content').invoke('show');
        cy.contains('Top').click();
        cy.url().should('include', 'top');


    });
});