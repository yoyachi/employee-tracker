// Dependencies
const mysql = require('mysql2');
const inquirer = require ("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});

//Connection ID
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
    startPrompt();
  });

  //Initial Prompt
  function startPrompt() {
      inquirer.prompt([
        {
            type: "list"
            message: "What would you like to do?"
            name: "choice",
            choices: [
                "View All Employees?", 
                "View All Employee's By Roles?",
                "View all Employees By Departments", 
                "Update Employee",
                "Add Employee?",
                "Add Role?",
                "Add Department?"  
            ]

        }  
      ]).then(function(val) {
          switch (val.choice) {
              
          }
      })
  }







