

describe('Upload-download test', () => {
    it('Verify excel upload-download', () => {

        cy.visit('https://rahulshettyacademy.com/upload-download-test/index.html');
        cy.get('#downloadButton').click();

        const replaceNum = 1001;
        const searchTextFruit = 'Kivi';
        const filePath = Cypress.config('fileServerFolder') + '/cypress/downloads/download.xlsx';

        cy.task('writeExcelTest',
            {
                searchText: searchTextFruit,
                replaceText: replaceNum,
                change: {
                    rowChange: 0,
                    colChange: 2
                },
                filePath: filePath
            });

        // upload the downloaded & modified excel back to website
        cy.get('#fileinput').selectFile(filePath);


        // check if it was updated
        cy.contains(searchTextFruit).parent().parent().find('#cell-4-undefined').should('have.text', replaceNum);
    });
});