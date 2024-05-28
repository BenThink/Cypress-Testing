import { Before } from "@badeball/cypress-cucumber-preprocessor";

Before(function () {
    cy.fixture('example').then((data) => {
        this.data = data;
    });
});
