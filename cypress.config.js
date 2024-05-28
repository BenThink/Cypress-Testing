import { defineConfig } from "cypress";
import mochaWesomeReporter from 'cypress-mochawesome-reporter/plugin.js';
import preprocessor from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import sqlServer from 'cypress-sql-server';
import excelToJson from 'convert-excel-to-json';
import fs from 'fs'
import ExcelJs from 'exceljs';





async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after running
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));


  // mochawesome -- this needs to be off when we run 'multiple-cucumber-html-reporter'
  // cus it overrides 'the before:run' hook and won't work
  // mochaWesomeReporter(on);


  // SQL Server
  config.db = {
    userName: "bh",
    password: "qwaszx?1",
    server: "bhdbdemo.database.windows.net",
    options: {
      database: "benjaminhozan",
      encrypt: true,
      rowCollectionOnRequestCompletion: true
    }
  }

  // SQL Server
  let tasks = sqlServer.loadDBPlugin(config.db);
  on('task', tasks);


  // we create excelToJsonConverter command
  on('task',
    {
      excelToJsonConverter(filePath) {
        const result = excelToJson(
          {
            source: fs.readFileSync(filePath)  // fs.readFileSync returns a Buffer
          });
        return result;
      }
    });


  // for Js Excel
  on('task',
    {
      async writeExcelTest({ searchText, replaceText, change, filePath }) {
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

        return null;
      }
    });


  // Make sure to return the config object as it might have been modified by the plugin
  return config;
}

// for Js Excel
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


export default defineConfig({
  projectId: 't73cid',
  defaultCommandTimeout: 6000,

  // mochawesome
  // reporter: 'cypress-mochawesome-reporter',

  env: {
    url: "https://rahulshettyacademy.com"
  },
  retries: {
    runMode: 1
  },
  e2e: {
    // baseUrl:'',
    setupNodeEvents,
    specPattern: "cypress/e2e/tests/*.js"
  }
});


