/// <reference types="cypress"/>


describe('Mocking HTTP', function () {

    it('First Mocked HTTP', function () {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo');

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "BSG",
                "aisle": "2302"
            }]
        }).as('bookretrievals');

        cy.get('.btn.btn-primary').click();

        cy.wait('@bookretrievals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1);
        });

        cy.get('p').should('have.text', 'Oops only 1 Book available');

    });
});