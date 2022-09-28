const mysql = require('mysql2');

const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'password',
        database: 'employee_tracker_db'
    })
console.log(`Connected to the employee_tracker_db database.`),

    db.connect(err => {
        if (err) {
            throw err
        }
        console.log('MySql successfully connected!')
    });

const inquiry = () => {
    inquirer.prompt([{
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'End'],
        name: 'start'
    }])
        .then(start => {
            console.log(start);
            console.log(start.start);
            switch (start.start) {
                case 'Add A Department':
                    addDepartment();
                    break
                case 'Add A Role':
                    addRole();
                    break
                case 'Add An Employee':
                    addEmployee();
                    break
                case 'Update An Employee Role':
                    updateEmployeeRole();
                    break
                case 'View All Departments':
                    viewAllDepartments();
                    break
                case 'View All Roles':
                    viewAllRoles();
                    break
                case 'View All Employees':
                    viewAllEmployees();
                    break
                case 'End':
                    console.log('Thank you!');
                    break
            }
        })
}

const viewAllDepartments = () => {
    db.query('SELECT * FROM departments', (err, departments) => {
        if (err) {
            console.log(err);
        }
        console.table(departments);
    })
    inquiry();
}

const viewAllRoles = () => {
    db.query('SELECT * FROM roles', (err, roles) => {
        if (err) {
            console.log(err);
        }
        console.table(roles);
    })
    inquiry();
}

const viewAllEmployees = () => {
    db.query('SELECT * FROM employees', (err, employees) => {
        if (err) {
            console.log(err);
        }
        console.table(employees);
    })
    inquiry();
}



const addDepartment = () => {
    inquirer.prompt([{
        message: 'What Department would you like to add?',
        type: 'input',
        name: 'name'
    }])
        .then(department => {
            db.query('INSERT INTO departments SET ?', department, err => {
                if (err) { console.log(err) };
            })
            console.log('A department has been added!');
            inquiry();
        })
}

const addRole = () => {
    inquirer.prompt([{
        message: 'What Role would you like to add?',
        type: 'input',
        name: 'title'
    },
    {
        message: 'What is the salary for this Role?',
        type: 'input',
        name: 'salary'
    },
    {
        message: 'What is the ID of the department of this Role?',
        type: 'input',
        name: 'department_id'
    }
    ])
        .then(role => {
            db.query('INSERT INTO roles SET ?', role, err => {
                if (err) { console.log(err) };
            })
            console.log('A Role has been added!');
            inquiry();
        })
}

const addEmployee = () => {
    inquirer.prompt([{
        message: 'What is the firstname of the Employee you would like to add?',
        type: 'input',
        name: 'first_name'
    },
    {
        message: 'What is the lastname of the Employee you would like to add?',
        type: 'input',
        name: 'last_name'
    },
    {
        message: 'What is the Role ID of the Employee you would like to add?',
        type: 'input',
        name: 'role_id'
    },
    {
        message: 'Is the Employee a Manager?',
        type: 'list',
        choices: ['yes', 'no'],
        name: 'managerYN'
    }
    ])
        .then(employee => {
            console.log(employee);
            if (employee.managerYN === 'yes') {
                console.log('You tried to add a Manager');
                delete employee.managerYN;
                db.query('INSERT INTO employees SET ?', employee, err => {
                    if (err) { console.log(err) };
                })
                console.log('A Manager has been added!');
                inquiry();
            } else if (employee.managerYN === 'no') {
                console.log('You tried to add an Employee, not a Manager');
                inquirer.prompt([{
                    message: 'What is the ID of the Manager of the Employee?',
                    type: 'input',
                    name: 'manager_id'
            }
    ])
                    .then(employeeNotMgr => {
                        console.log(employee);
                        console.log(employeeNotMgr);
                        delete employee.managerYN;
                        let newEmployee = {
                            ...employee,
                            ...employeeNotMgr
                        }
                        db.query('INSERT INTO employees SET ?', newEmployee, err => {
                            if (err) { console.log(err) };
                        })
                        console.log('An Employee has been added!');
                        inquiry();
                    });
            }
        })
}

const updateEmployeeRole = () => {
    inquirer.prompt([{
        message: 'What is the name of the Employee you would like to update?',
        type: 'input',
        name: 'id'
    },
    {
        message: 'What would be the ID of the new Role of the Employee you would like to update?',
        type: 'input',
        name: 'role_id'
    }])
        .then(employee => {

            let newRole = {
                role_id: employee.role_id
            }
            db.query(`UPDATE employees SET ? WHERE id = ${employee.id}`, newRole, err => {
                if (err) { console.log(err) };
            })
            console.log('The Employee Role has been updated!');
            inquiry();
        })
}



inquiry();
