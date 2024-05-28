/// <reference types="cypress" />


describe('My Second Test Suite', () => {
    it('My Second Test Case', () => {
        // test steps
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');

        // ---------- Check Boxes ----------

        // single check-box to check & verify if checked and if selected correctly
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1');
        // uncheck & verify
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked').and('have.value', 'option1');

        // multiple check-boxes to check & verify if checked
        cy.get('input[type="checkbox"]').check(['option2', 'option3']).should('be.checked');


        // ---------- Static Drop-down ----------

        // select an option & check if selected correctly
        cy.get('select').select('option2').should('have.value', 'option2');


        // ---------- Dynamic Drop-down ----------

        cy.get('#autocomplete').type('ind');
        cy.get('.ui-menu-item div').each((elem) => {
            if (elem.text() === 'India') {
                cy.wrap(elem).click();
            }
        });
        cy.get('#autocomplete').should('have.value', 'India');


        // ---------- Show / Hide ---------- 

        cy.get('#displayed-text').should('be.visible');
        cy.get('#hide-textbox').click();
        cy.get('#displayed-text').should('not.be.visible');

        cy.get('#show-textbox').click();
        cy.get('#displayed-text').should('be.visible');


        // ---------- Radio Buttons ----------

        cy.get('input[value="radio2"]').check().should('be.checked');


    });
});