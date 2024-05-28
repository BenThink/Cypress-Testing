/// <reference types="cypress" />


describe('Testing API', () => {
    it('Request API', () => {

        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php',
            {
                "name": "Learn Appium Automation with Java",
                "isbn": "bcdsss",
                "aisle": "22s7",
                "author": "John foe"
            }).then((res) => {
                expect(res.body).to.have.property('Msg', 'successfully added');
                // expect(res.body).to.have.length(500);
                expect(res.status).to.be.eq(200);
                expect(res).to.have.property('headers');
                expect(res).to.have.property('duration');
            });
    })
});