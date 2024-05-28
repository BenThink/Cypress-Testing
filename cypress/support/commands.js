// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// ----------------------------------------------------------------------- //

Cypress.Commands.add('getByClass', (selector) => {
    return cy.get(`.${selector}`)
})

Cypress.Commands.add('getById', (selector) => {
    return cy.get(`#${selector}`)
})

Cypress.Commands.add('getByTagName', (tagName, attribute) => {
    return cy.get(`${tagName}[${attribute}]`)
})

// ----------------------------------------------------------------------- //

// Select prduct command
Cypress.Commands.add('selectProduct', (productName) => {
    cy.get('h4.card-title').each((elem, index) => {
        const text = elem.text();
        if (text.includes(productName)) {
            cy.get('button.btn.btn-info').eq(index).click();
        }
    });
});

// ----------------------------------------------------------------------- //

// login using API + saving Token
Cypress.Commands.add('loginAPI', () => {
    cy.request('POST', 'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            "userEmail": "benjaminhozan@gmail.com",
            "userPassword": "Qwaszxqw?1"
        }).then((res) => {
            expect(res.status).to.be.eq(200);
            Cypress.env('token', res.body.token);
        });
});



