export default class HomePage {
    getName() {
        return cy.get('form input[name="name"]');
    };

    getTwoWayDataBinding() {
        return cy.get(':nth-child(4) > .ng-untouched');
    }

    getGender() {
        return cy.get('select');
    }

    getEntrepreneur() {
        return cy.get('#inlineRadio3');
    }

    getShopTab() {
        return cy.get('.nav-item:nth-child(2) .nav-link');
    }
};


