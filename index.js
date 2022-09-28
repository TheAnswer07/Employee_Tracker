// const express = require('express');

const mysql = require('mysql2');

// const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employee_tracker_db');

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

//   const app = express();

inquirer.prompt([{
    message: 'What would you like to do?',
    type: 'list',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role'],
    name: 'start'
}]).then(start => {
    console.log(start);
})

// app.get('/employee_tracker_db', (req, res) => {
//     let sql = 'CREATE DATABASE employee_tracker_db'
//     db.query(sql, (err) => {
//         if(err) {
//             throw err
//         }
//         res.send('Database created')
//     });
// });

// app.listen('3000', () => {
//     console.log('Server started on port 3000');
// })