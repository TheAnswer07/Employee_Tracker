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
        break
        case 'End':
            console.log('Thank you!');
        break
    }
})
}


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
        inquiry();
    })
}

const addARole = () => {
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
        db.query('INSERT INTO roles SET ?', role, err=> {
            if(err) {console.log(err)};
        })
        console.log('A Role has been added!');
        inquiry();
    })
}

const addAnEmployee = () => {
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
        if(employee.managerYN === 'yes') {
            console.log('You tried to add a Manager');
            delete employee.managerYN;
            db.query('INSERT INTO employees SET ?', employee, err=> {
                if(err) {console.log(err)};
            })
            console.log('An Employee has been added!');
            inquiry();
        
        
        
        } else if (employee.managerYN === 'no') {
            console.log('You tried to add a normal Employee');
        }


        db.query('INSERT INTO employees SET ?', employee, err=> {
            if(err) {console.log(err)};
        })
        console.log('An has been added!');
        inquiry();
    })
}

inquiry();

// const viewAllDepartments = () => {
//     inquirer.prompt([{
//         message: 'What Department would you like to add?',
//         type: 'input',
//         name: 'name'
//     }])
//     .then(department => {
//         db.query('INSERT INTO departments SET ?', department, err=> {
//             if(err) {console.log(err)};
//         })
//         console.log('A department has been added!');
//         inquiry();
//     })
// }

