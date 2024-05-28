/// <reference types="cypress"/>


describe('Mocking HTTP', function () {

    it('First Mocked HTTP', function () {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo');

        // GET & URL are captured inside 'req' parameter
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (req) => {
            req.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=beni';

            req.continue((res) => {
                // expect(res.statusCode).to.be.equal(403);
            });
        }).as('dummyUrl');

        cy.get('.btn.btn-primary').click();

        cy.wait('@dummyUrl');

    });
});