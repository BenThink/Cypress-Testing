/// <reference types="cypress" />
/// <reference types="cypress-iframe"/>
import 'cypress-iframe';


describe('Calendar Test', () => {
    it('Verify date selection', () => {

        const month = "6";
        const day = "15";
        const year = "2027";

        const expectedList = [month, day, year];

        // test steps
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers');

        cy.get('div .react-date-picker__inputGroup').click();
        cy.get('.react-calendar__navigation__label__labelText').click();
        cy.get('.react-calendar__navigation__label__labelText').click();
        cy.contains('button', year).click();
        cy.get('.react-calendar__year-view__months__month').eq(Number(month) - 1).click();
        cy.contains('abbr', day).click();

        // assertion
        cy.get('.react-date-picker__inputGroup__input').each((elem, index) => {
            cy.wrap(elem).invoke('val').should('eq', expectedList[index]);
        });
    });
});