/// <reference types="cypress" />


describe('Waitting', () => {
    let result;

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/waiting');

        cy.sqlServer('select * from Persons').then((data) => {
            result = data;

        });
    });

    it('cy.wait() - wait for a specific amount of time', () => {
        cy.get('.wait-input1').type(result[0][1]);
        cy.wait(1000);

        cy.get('.wait-input2').type(result[1][2]);
        cy.wait(1000);

        cy.get('.wait-input3').type('Wait 1000ms after typing');
        cy.wait(1000);
    });

    it('cy.wait() - wait for a specific amount of time', () => {
        cy.intercept('GET', '**/comments/*').as('getComment1');
        cy.intercept('GET', '**/comments/*').as('getComment2');


        // we have code that gets a comment when
        // the button is clicked in scripts.js
        cy.get('.network-btn').click();


        // wait for GET comments/1
        cy.wait('@getComment1').its('response.statusCode').should('be.oneOf', [200, 304]);


        // same thing as above but much more testing
        cy.wait('@getComment2').then((res) => {
            expect(res.response.statusCode).to.be.oneOf([200, 304]);

            // Assert specific properties and values in the response body
            expect(res.response.body).to.have.property('postId', 1);
            expect(res.response.body).to.have.property('id', 1);
            expect(res.response.body).to.have.property('name', 'id labore ex et quam laborum');
            expect(res.response.body).to.have.property('email', 'Eliseo@gardner.biz');
            expect(res.response.body).to.have.property('body', 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium');

            // Assert that the response body contains the expected text 'laudantium'
            expect(res.response.body.body).to.include('laudantium');
        });

    });
});

