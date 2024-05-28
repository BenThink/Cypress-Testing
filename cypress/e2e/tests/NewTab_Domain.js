/// <reference types="cypress" />


describe('Handling Child Windows', () => {
    it('Should handle child window', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        cy.get('#opentab').invoke('removeAttr', 'target').click();

        cy.origin('https://qaclickacademy.com', () => {
            cy.get('#navbarSupportedContent a[href="about"]').click();
            cy.get('.mt-50 h2').should('contain', 'QAClick Academy');
        });




    });
});