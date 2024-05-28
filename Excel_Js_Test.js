import ExcelJs from 'exceljs';




async function writeExcelTest(searchText, replaceText, change, filePath) {
    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);

    const workSheet = workBook.getWorksheet('Sheet1');

    const output = await readExcel(workSheet, searchText);

    if (output.row !== -1 && output.column !== -1) {
        const cell = workSheet.getCell(output.row, output.column + change.colChange);
        cell.value = replaceText;

        await workBook.xlsx.writeFile(filePath);

        console.log('The value was found in Excel and replaced!');
    } else {
        console.log('The value was not found in Excel!')
    }

};


async function readExcel(workSheet, searchText) {
    let output = {
        row: -1,
        column: -1
    }

    workSheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

writeExcelTest("Mango", 350, { rowChange: 0, colChange: 2 }, "C:/Users/Hozan Beniamin/Downloads/excel_download_test.xlsx");
















