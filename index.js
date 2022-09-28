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
    console.log(`Connected to the employee_tracker_d database.`),

  db.connect(err => {
    if(err) {
        throw err
    }
    console.log('MySql successfully connected!')
  });


inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
    name: 'start'
}])
.then(start => {
    console.log(start);
    console.log(start.start);
    switch(start.start) {
        case 'View All Departments':
            viewAllDepartments();
        break
        case 'View All Roles':
            viewAllRoles();
        break
        case 'View All Employees':
            viewAllEmployees();
        break
        case 'Add A Department':
            addADepartment();
        break
        case 'Add A Role':
            addARole();
        break
        case 'Add An Employee':
            addAEmployee();
        break
        case 'Update An Employee Role':
            updateAnEmployeeRole();
        
    }
})

const addADepartment = () => {
    inquirer.prompt([{
        message: 'What Department would you like to add?',
        type: 'input',
        name: 'name'
    }])
    .then(department => {
        db.query('INSERT INTO departments SET ?', department, err=> {
            if(err) {console.log(err)};
        })
        console.log('A department has been added!');
    })
}

