/// <reference types="cypress" />


describe('Handling SQL db', () => {
    it('Retreiving data form db', () => {

        cy.sqlServer('select * from Persons').then((result) => {
            console.log(result[0][1]);
            console.log(result[1][3]);
            console.log(result);
        });
    })
});

