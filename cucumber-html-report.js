import { generate } from "multiple-cucumber-html-reporter";

generate({
    jsonDir: "./cypress/cucumberReports/",
    reportPath: "./cypress/cucumberReports/cucumber-html-report.html",
    metadata: {
        browser: {
            name: "chrome",
            version: "100",
        },
        device: "Local test machine",
        platform: {
            name: "windows",
            version: "11",
        },
    },
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "Hozan Beniamin Cypress Automation" },
            { label: "Release", value: "1.2.3" },
            { label: "Cycle", value: "B11221.34321" },
            { label: "Execution Start Time", value: "Feb 23th 2024, 02:31 PM EST" },
            { label: "Execution End Time", value: "Feb 23th 2024, 02:56 PM EST" },
        ],
    },
});