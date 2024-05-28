/// <reference types="cypress" />


describe('My Second Test Suite', () => {
    it('My Second Test Case', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        // ---------- Alert / Confirm ----------

        cy.get('#alertbtn').click();
        cy.get('[value="Confirm"]').click();

        // windows:alert
        cy.on('window:alert', (str) => {
            // Chai
            expect(str).to.be.equal('Hello , share this practice page and share your knowledge');
        });

        // windows confirm
        cy.on('window:confirm', (str) => {
            // Chai
            expect(str).to.be.equal('Hello , Are you sure you want to confirm?');
        });


    });
});