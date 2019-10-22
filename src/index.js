const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql')

const password = require('../secrets')

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password,
    database: "employeeTraker_db"
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("Connected to db as id " + connection.threadId);
});

/*********************
******* Logic ********
*********************/

getJob();

/*********************
****** Functions *****
*********************/

function getJob() {
    inquirer
        .prompt({
            name: 'job',
            type: 'list',
            message: 'Which would you like to do?',
            choices: ['add', 'view', 'update'],
        })
}