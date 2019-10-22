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

    // console.log("Connected to db as id " + connection.threadId);
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
        .prompt(
            {
                name: 'job',
                type: 'list',
                message: 'Which would you like to do?',
                choices: ['add', 'view', 'update', 'exit'],
            }
        ).then(function ({ job }) {
            switch (job) {
                case 'add':
                    add();
                    break;
                case 'view':
                    view();
                    break;
                case 'update':
                    update();
                    break;
                case 'exit':
                    connection.end()
                    return;
            }

        })
}

function add() {
    inquirer
        .prompt(
            {
                name: "db",
                message: 'Which would you like to add?',
                type: 'list',
                choices: ['department', 'role', 'employee'],
            }
        ).then(function ({ db }) {
            switch (db) {
                case "department":
                    add_department()
                    break;
                case "role":
                    add_role()
                    break;
                case 'employee':
                    add_employee();
                    break;
            }
        })

}

function add_department() {
    inquirer
        .prompt(
            {
                name: 'name',
                message: "What is the department's name?",
                type: 'input'
            }
        ).then(function ({ name }) {
            connection.query(`INSERT INTO department (name) VALUES ('${name}')`, function (err, data) {
                if (err) throw err;
                console.log(`Added`)
                getJob();
            })
        })
}

function add_role() {
    let departments = []

    connection.query(`SELECT * FROM department`, function (err, data) {
        if (err) throw err;

        for (let i = 0; i < data.length; i++) { // Loops through and finds the name of all the departments
            departments.push(data[i].name)

        }


        inquirer
            .prompt([
                {
                    name: 'title',
                    message: "What is the role?",
                    type: 'input'
                },
                {
                    name: 'salary',
                    message: 'How much do they make?',
                    type: 'input'
                },
                {
                    name: 'department_id',
                    message: 'What department does it belong to?',
                    type: 'list',
                    choices: departments
                }
            ]).then(function ({ title, salary, department_id }) {
                let index = departments.indexOf(department_id)

                connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${title}', '${salary}', ${index})`, function (err, data) {
                    if (err) throw err;
                    console.log(`Added`)
                    getJob();
                })
            })
    })
}

function view() {
    inquirer
        .prompt(
            {
                name: "db",
                message: 'Which would you like to view?',
                type: 'list',
                choices: ['department', 'role', 'employee'],
            }
        ).then(function ({ db }) {
            connection.query(`SELECT * FROM ${db}`, function (err, data) {
                if (err) throw err;

                console.table(data)
                getJob();
            })
        })
}

function update() {

}