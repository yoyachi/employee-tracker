// Dependencies
const mysql = require('mysql');
const inquirer = require("inquirer");
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
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees?",
                "View All Roles?",
                "View All Departments?",
                "Update Employee?",
                "Add Employee?",
                "Add Role?",
                "Add Department?"
            ]

        }
    ]).then(function (val) {
        switch (val.choice) {
            case "View All Employees?":
                viewAllEmployees();
                break;

            case "View All Roles?":
                viewAllRoles();
                break;

            case "View All Departments?":
                viewAllDepartments()
                break;

            case "Add Employee?":
                addEmployee();
                break;
            case "Update Employee?":
                updateEmployee();
                break;

            case "Add Role?":
                addRole();
                break;

            case "Add Department?":
                addDepartment();
                break;



        }
    })
}


//-View All Employees-




function viewAllEmployees() {
    connection.query("SELECT * FROM employee;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}



//-View all rolls-


function viewAllRoles() {
    connection.query("SELECT * FROM role ;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}

//view all employees by department
function viewAllDepartments() {
    connection.query("SELECT * FROM department ; ",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startPrompt()
        })
}


//Select Role queries, tittle to add employee prompt

var roleArr = [];
function selectRole() {
    connection.query("SELECT * FROM role",
        function (err, res) {
            if (err) throw err
            for (var i = 0; i < res.length; i++) {
                roleArr.push(res[i].title);
            }

        })
    return roleArr;
}

//Select manager to add employee prompt

var managersArr = [];
function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }

    })
    return managersArr;
}

//Add employee



function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
        },
        {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?",
            {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId

            }, function (err) {
                if (err) throw err
                console.table(val)
                startPrompt()
            })

    })
}


// Update Employee

updateEmployee = () => {
    console.log('Update employee managers...\n');
    const query = connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
            {

            },
            {
                employee
            }
        ],

        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' employee manager updated!\n');
            deleteEmployeeManager();
        }
    );

    console.log(query.sql);
    inquirer.prompt([
        {
            name: "lastName",
            type: "rawlist",
            choices: function () {
                var lastName = [];
                for (var i = 0; i < res.length; i++) {
                    lastName.push(res[i].last_name);
                }
                return lastName;
            },
            message: "What is the Employee last name?",
        },
        {
            name: "role",
            type: "rawlist",
            message: "What is the Employee new title?",
            choices: selectRole()

        },

    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query('UPDATE employee SET WHERE ?',
            {
                last_name: val.lastName
            },

            {
                role_id: roleId
            },
            function (err) {
                if (err) throw err;
                console.table(val)
                startPrompt()
            })
    });

};





// Update Employee Role

updateEmployee = () => {
    console.log('Update employee role...\n');
    const query = connection.query(
        'UPDATE employee SET ? WHERE ?',
        [
            {

            },
            {

            }
        ],

        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + ' employee role updated!\n');
            deleteEmployeeRole();
        });

    console.log(query.sql);
    inquirer.prompt([
        {
            name: "Title",
            type: "input",
            message: "What is the role's Title?"
        },
        {
            name: "Salary",
            type: "input",
            message: "What is the salary?"
        }


    ]).then(function (res) {

        connection.query('INSERT INTO role SET WHERE ?',
            {
                title: res.Title,
                salary: res.Salary,
            },


            function (err) {
                if (err) throw err;
                console.table(res);
                startPrompt();
            })
    });

};




// Add  role
function addRole() {
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function (err, res) {
        inquirer.prompt([
            {
                name: "Title",
                type: "input",
                message: "What is the roles Title?"
            },
            {
                name: "Salary",
                type: "input",
                message: "What is the Salary?"

            }
            ,
            {
                name: "department_id",
                type: "input",
                message: "What is the department id ?"

            }
        ]).then(function (res) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: res.Title,
                    salary: res.Salary,
                    department_id: res.department_id
                },
                function (err) {
                    if (err) throw err
                    console.table(res);
                    startPrompt();
                }
            )

        });
    });
}


//Add Department
addDepartment = () => {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
        }
    ]).then(function (res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
                name: res.name
            },
            function (err) {
                if (err) throw err;
                console.table(res);
                startPrompt();
            }
        )
    })
}





















