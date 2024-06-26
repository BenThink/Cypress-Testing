Feature: End to end Ecommerce validation
    Application regression

    @Regression
    Scenario: Ecommerce products delivery
        Given I open Ecommerce page
        When I add items to Cart
        And Validate the total prices
        Then Select the country, submit and verify Thank You message

    @Smoke
    Scenario: Filling the form to shop
        Given I open Ecommerce page
        When I fill the form details
            | name  | gender |
            | lidia | Female |
        And Validate the form behavior
        Then Select the shop page

